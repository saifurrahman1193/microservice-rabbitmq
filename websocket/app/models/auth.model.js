const sql = require("./db.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { sqlResult } = require('../helpers/sqlhelpers');
const { now } = require('../helpers/datehelpers');
const { unique } = require('../helpers/datahelpers');
const loghelper = require('../helpers/loghelper');
const authhelper = require('../helpers/authhelper');



// constructor
const Auth = function(formData) {
    this.name = formData.name;
    this.email = formData.email;
    this.password = formData.password;
    this.status = formData.status;
};

Auth.register = (formData, result) => {


    formData.password = bcrypt.hashSync(formData.password, 10)
    formData.status = 1
    delete formData.password

    sql.query("INSERT INTO users SET ?", formData, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...formData });
        return;
    });
};

Auth.login = async (formData, result) => {

    var login_q = await sqlResult(`SELECT * FROM users WHERE email = ${sql.escape(formData.email)};`)

    if (!login_q.length) {
        result( { 'message': ['Invalid email!'] }, null)
        return;
    }

    userData = login_q[0]

    if (userData.status!=1) {
        result( { 'message': ['User is blocked!'] }, null)
        return;
    }

    plain_password = formData.password
    hash = userData.password
    password_validity = await bcrypt.compare(plain_password, hash)

    if (!password_validity) {
        result( { 'message': ['Invalid password!'] }, null)
        return;
    }
        
    delete userData.password

    var token = jwt.sign({...userData }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_EXPIRES_IN) });

    expires_at = moment().add(process.env.JWT_EXPIRES_IN, 'seconds').format('yy-MM-DD HH:mm:ss')

    var userrolespermissions = await sqlResult(`
                SELECT users.id user_id, roles.id role_id, roles.role role, permissions.id permission_id, permissions.permission permission 
                FROM users 
                LEFT JOIN  userroles ON (users.id = userroles.user_id)
                LEFT JOIN  roles ON (userroles.role_id = roles.id)
                LEFT JOIN  rolepermissions ON (roles.id = rolepermissions.role_id)
                LEFT JOIN  permissions ON (rolepermissions.permission_id = permissions.id)
                WHERE  userroles.deleted_at IS NULL AND roles.deleted_at IS NULL AND rolepermissions.deleted_at IS NULL
                `) || []

    var roles = userrolespermissions.filter(item => (item.user_id == userData.id && item.role)).map(item => item.role)
    roles = roles.filter(unique)
    var permissions = userrolespermissions.filter(item => (item.user_id == userData.id && item.permission)).map(item => item.permission)

    


    var user_existing_valid_access_token_q = await sqlResult(`SELECT * FROM access_tokens WHERE user_id = ${sql.escape(userData.id)} 
                                                                AND status=1 
                                                                AND expires_at>'${now}';`)

    if (!user_existing_valid_access_token_q.length) {
        access_token_row = {
            'user_id': userData.id,
            'token': token,
            'status': 1,
            'expires_at': expires_at,
        }

        sql.query(`INSERT INTO access_tokens SET ?`, access_token_row);

        data = {
            'user': {
                ...userData,
                'access_token': token,
                'token_type': 'Bearer',
                'expires_at': expires_at,
            },
            'roles': roles || [],
            'permissions': permissions || [],
        }

        result(null, data);
        return;
    }
    else if (user_existing_valid_access_token_q.length) {
        expires_at = moment(user_existing_valid_access_token_q[0].expires_at).format('yy-MM-DD HH:mm:ss')
        data = {
            'user': {
                ...userData,
                'access_token': user_existing_valid_access_token_q[0].token,
                'token_type': 'Bearer',
                'expires_at': expires_at,
            },
            'roles': roles || [],
            'permissions': permissions || [],
        }
        result(null, data);
        return;
    }
    result({ 'message': ['Something went wrong'] }, null);
    return;

};


Auth.me = async(formData, result) => {
    const access_token = formData.authorization.split(' ')[1];
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    

    var access_token_row_db = []
    var user_data_db = {}
    if (decoded) {
        access_token_row_db = await sqlResult(`
                                SELECT * 
                                FROM access_tokens 
                                WHERE  token="${access_token}" AND user_id=${decoded.id} AND status=1
                                AND expires_at>'${now}'
                            `)
        user_data_db = await sqlResult(`
            SELECT * 
            FROM users 
            WHERE  id=${decoded.id} 
            LIMIT 1
        `) || {}

        prev_access_tokens_expiring = await sqlResult(`
                                UPDATE access_tokens 
                                SET status=0
                                WHERE user_id=${decoded.id} AND status=1
                                AND expires_at<='${now}'
                            `)
    }

    if (decoded && access_token_row_db.length && user_data_db.length) {

        delete user_data_db[0].password
        
        var userrolespermissions = await sqlResult(`
                                SELECT users.id user_id, roles.id role_id, roles.role role, permissions.id permission_id, permissions.permission permission 
                                FROM users 
                                LEFT JOIN  userroles ON (users.id = userroles.user_id)
                                LEFT JOIN  roles ON (userroles.role_id = roles.id)
                                LEFT JOIN  rolepermissions ON (roles.id = rolepermissions.role_id)
                                LEFT JOIN  permissions ON (rolepermissions.permission_id = permissions.id)
                                WHERE  userroles.deleted_at IS NULL AND roles.deleted_at IS NULL AND rolepermissions.deleted_at IS NULL
                            `) || []

        var roles = userrolespermissions.filter(item => (item.user_id == decoded.id && item.role)).map(item => item.role)
        roles = roles.filter(unique)
        var permissions = userrolespermissions.filter(item => (item.user_id == decoded.id && item.permission)).map(item => item.permission)

        data = {
            'user': {
                ...(user_data_db[0]),
                'access_token': access_token,
                'token_type': 'Bearer',
                'expires_at': moment(decoded.exp * 1000).format('yy-MM-DD HH:mm:ss'), // exp = seconds not milliseconds
            },
            'roles': roles || [],
            'permissions': permissions || [],
        }
        result(null, data);
        return;
    } else {
        result({ 'message': ['Token invalid or expired!'] }, null);
        return;
    }

};

Auth.logout = async(formData, result) => {
    const access_token = formData.authorization.split(' ')[1];
    
    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        if (decoded) {
            var logout_q = await sqlResult(`
                                    UPDATE access_tokens SET status=0 WHERE token="${access_token}" AND user_id=${decoded.id}
                                `)
            result(null, null);
            return;
        }
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': ['Token invalid or expired!'] }, null);
        return;
    }
};


Auth.changePassword = async(formData, request, result) => {

    const access_token = formData.authorization.split(' ')[1];

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    
    try{
        if (decoded) {
            var userData = await authhelper.Auth(request);

            plain_password = formData.currentPassword
            hash = userData.password
            password_validity = await bcrypt.compare(plain_password, hash)

            if (!password_validity) {
                result( { 'message': ['Invalid password!'] }, null)
                return;
            }


            formData.password = bcrypt.hashSync(formData.password, 10)
        
            await sqlResult(`
                                UPDATE users SET password='${formData.password}' WHERE id=${decoded.id}
                            `)

            result(null, null);
            return;
        }
        else{
            result({ 'message': ['Invalid user!'] }, null);
            return;
        }

    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': ['Something went wrong!'] }, null);
        return;
    }

};


module.exports = Auth;