const { header, body, validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');
const jwt = require('jsonwebtoken');
const { sqlResult } = require('../../helpers/sqlhelpers');
const moment = require('moment');

exports.checkpermissionMiddlware = (permission)=>{
    return  [
            header('authorization', 'Authorization is required').notEmpty().trim(),
            async (req, res, next) => {
        
                formData = {
                    "authorization": req.headers.authorization || ('Bearer ' + req.body.access_token),
                };
        
                const access_token = formData.authorization.split(' ')[1];
                try {
                    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        
                    if (decoded.id) {
                        var userrolespermissions = await sqlResult(`
                            SELECT users.id user_id, roles.id role_id, roles.role role, permissions.id permission_id, permissions.permission permission 
                            FROM users 
                            LEFT JOIN  userroles ON (users.id = userroles.user_id)
                            LEFT JOIN  roles ON (userroles.role_id = roles.id)
                            LEFT JOIN  rolepermissions ON (roles.id = rolepermissions.role_id)
                            LEFT JOIN  permissions ON (rolepermissions.permission_id = permissions.id)
                            WHERE userroles.deleted_at IS NULL AND roles.deleted_at IS NULL AND rolepermissions.deleted_at IS NULL
                        `) || []
                        var permissions = userrolespermissions.filter(item => (item.user_id == decoded.id && item.permission)).map(item => item.permission)
                        if (permissions.includes(permission)) {
                            next()
                        }
                        else{
                            return set_response(res, null, 401, 'failed', [`Unauthorized user for this permission(${permission})`])
                        }
                    } else {
                        return set_response(res, null, 401, 'failed', ['Unauthenticated'])
                    }
                } catch (error) {
                    return set_response(res, null, 401, 'failed', [error.message])
                }
        
            },
        ];
}

