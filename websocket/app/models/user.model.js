const bcrypt = require('bcryptjs');
const { sqlResult, paginate } = require('../helpers/sqlhelpers');
const { now, todayYMD } = require('../helpers/datehelpers');
const authhelper = require('../helpers/authhelper');
const loghelper = require('../helpers/loghelper');
const csvcustomhelper = require('../helpers/csvcustomhelper');
const exceljshelper = require('../helpers/exceljshelper');



// constructor
const User = function(formData) {
    for (const property in formData) {
        this[property] = formData[property]
    }
};


User.userStatusUpdate = async (formData, result) => {
    try {
        var logout_q = await sqlResult(`
                        UPDATE users SET status=${formData.status}, updated_at='${now}'  WHERE id='${formData.user_id}' 
                    `)
        result(null, null);
        return;
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': ['Something went wrong!'] }, null);
        return;
    }
};


User.getUser = async (formData, result) => {
    try {
        var user_data = await sqlResult(`
                        SELECT * FROM users WHERE id = ${formData.id}
                    `)
        if (user_data.length) {
            delete user_data[0].password;
            result(null, {"user" : user_data[0]});
            return;
        }
        result({ kind: "not_found" }, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': ['Something went wrong!'] }, null);
        return;
    }
};


User.getAllUsers_p = async (formData, request, result) => {
    try {
        // formData = {...formData, perPage:2, page:2 }
        let paginator = await paginate(request, formData, 'users')

        // where condition
        let where_clause = `WHERE 1=1 `
        formData?.name ? where_clause=where_clause+`AND name like '%${formData?.name}%'` : null
        formData?.email ? where_clause=where_clause+`AND email like '%${formData?.email}%'` : null

        let query = `SELECT * FROM users ${where_clause} LIMIT ${paginator?.record_per_page} OFFSET ${paginator?.offset}`

        var data = await sqlResult(query)
        // offset
        if (data?.length) {
            data?.forEach(data => {
                delete data.password
            });
            result(null, {
                "data" : data,
                "paginator" : paginator
            });
            return;
        }
        result({ kind: "not_found" }, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};





User.createUser = async (formData, request, result) => {
    var creator = await authhelper.Auth(request);
    formData.password = bcrypt.hashSync(formData.password, 10)

    const roles = formData.roles || []
    
    delete formData.roles
    formData.created_by = creator?.id

    const newUser = new User(formData);
    try {
        var data = await sqlResult(`INSERT INTO users SET ?`, [newUser])
        var userId = data.insertId
        var roles_data = await sqlResult(`SELECT *  FROM roles WHERE role in (?) `, [roles])
        var rolesData_f = []
        roles_data.forEach((element, i) => {
            rolesData_f[i] = {
                "user_id" : userId,
                "role_id" : element.id
            }
        });
        var data2 = await sqlResult(`UPDATE userroles SET deleted_at='${now}', deleted_by='${creator?.id}' WHERE user_id = ${userId} AND deleted_at IS NULL`)

        rolesData_f.forEach(async (element, i) => {
            await sqlResult(`INSERT INTO userroles SET ?`, [rolesData_f[i]])
        });

        if (data) {
            result(null, { "data": {"id": userId, ...newUser} });
            return;
        }
        result(null, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};


User.updateUser = async (formData, request, result) => {

    var updater = await authhelper.Auth(request);
    formData.password ? (formData.password = bcrypt.hashSync(formData.password, 10)) : null

    const roles = formData.roles || []
    
    delete formData.roles
    formData.updated_by = updater?.id
    formData.updated_at = now
    try {
        var data = await sqlResult(`UPDATE users SET ? WHERE id = ${formData.id} `, [formData])
        var userId = formData.id
        var roles_data = await sqlResult(`SELECT *  FROM roles WHERE role in (?) `, [roles])
        var rolesData_f = []
        roles_data.forEach((element, i) => {
            rolesData_f[i] = {
                "user_id" : userId,
                "role_id" : element.id
            }
        });
        console.log(userId);
        var data2 = await sqlResult(`UPDATE userroles SET deleted_at='${now}', deleted_by='${updater?.id}' WHERE user_id = ${userId} AND deleted_at IS NULL`)

        rolesData_f.forEach(async (element, i) => {
            await sqlResult(`INSERT INTO userroles SET ?`, [rolesData_f[i]])
        });

        if (data) {
            result(null, { "data": {"id": userId, ...formData} });
            return;
        }
        result(null, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};



User.getAllUsers_csv_custom_instant = async (formData, request, result) => {
    try {
        let query = `SELECT name as Name, email as Email, 
                    if(status=1, 'Active', 'Inactive') Status  
                    FROM users`
        var data = await sqlResult(query)

        const filePath_main = '/uploads/exports/user/csv/users-data-'+todayYMD+'.csv'
        const filePath = './public'+filePath_main
        
        csvcustomhelper.csvInstant_save(data, filePath)

        result(null, { "data": {"path": process.env.BASE_URL+filePath_main} });
        return;
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};



User.getAllUsers_exceljs_excel_instant = async (formData, request, result) => {
    try {
        let query = `SELECT name as Name, email as Email, 
                    if(status=1, 'Active', 'Inactive') Status  
                    FROM users`
        var data = await sqlResult(query)
        
        const filePath_main = '/uploads/exports/user/excel/users-data-'+todayYMD+'.xlsx'
        const filePath = './public'+filePath_main
        exceljshelper.excelInstant_save(data, filePath)


        result(null, { "data": {"path": process.env.BASE_URL+filePath_main} });

        return;
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};

module.exports = User;