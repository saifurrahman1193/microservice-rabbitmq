const { sqlResult, paginate } = require('../helpers/sqlhelpers');
const { now } = require('../helpers/datehelpers');
const authhelper = require('../helpers/authhelper');
const loghelper = require('../helpers/loghelper');



// constructor
const Role = function(formData) {
    for (const property in formData) {
        this[property] = formData[property]
    }
};


Role.getRole = async (formData, result) => {
    try {
        var role_data = await sqlResult(`
                        SELECT * FROM roles WHERE id = ${formData.id}
                    `)
        if (role_data.length) {
            delete role_data[0].password;
            result(null, {"role" : role_data[0]});
            return;
        }
        result({ kind: "not_found" }, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': ['Something went wrong!'] }, null);
        return;
    }
};

Role.getAllRoles = async (formData, request, result) => {
    try {

        // where condition
        let where_clause = `WHERE 1=1 `
        formData?.role ? where_clause=where_clause+`AND role like '%${formData?.role}%'` : null

        let query = `SELECT * FROM roles ${where_clause} `

        var data = await sqlResult(query)
        // offset
        result(null, {
            "data" : data,
        });
        return;
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};


Role.getAllRoles_p = async (formData, request, result) => {
    try {
        // formData = {...formData, perPage:2, page:2 }
        let paginator = await paginate(request, formData, 'roles')

        // where condition
        let where_clause = `WHERE 1=1 `
        formData?.role ? where_clause=where_clause+`AND role like '%${formData?.role}%'` : null

        let query = `SELECT * FROM roles ${where_clause} LIMIT ${paginator?.record_per_page} OFFSET ${paginator?.offset}`

        var data = await sqlResult(query)
        // offset
        result(null, {
            "data" : data,
            "paginator" : paginator
        });
        return;
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};


Role.createRole = async (formData, request, result) => {

    var creator = await authhelper.Auth(request);
    const permissions = formData.permissions || []
    
    delete formData.permissions
    formData.created_by = creator?.id

    const newRole = new Role(formData);

    try {
        var data = await sqlResult(`INSERT INTO roles SET ?`, [newRole])
        var roleId = data.insertId
        var permissions_data = await sqlResult(`SELECT *  FROM permissions WHERE permission in (?) `, [permissions])
        var permissionsData_f = []
        permissions_data.forEach((element, i) => {
            permissionsData_f[i] = {
                "role_id" : roleId,
                "permission_id" : element.id
            }
        });
        var data2 = await sqlResult(`UPDATE rolepermissions SET deleted_at='${now}' WHERE role_id = ${roleId}`)

        permissionsData_f.forEach(async (element, i) => {
            await sqlResult(`INSERT INTO rolepermissions SET ?`, [permissionsData_f[i]])
        });

        if (data) {
            result(null, { "data": {"id": roleId, ...newRole} });
            return;
        }
        result(null, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};


Role.updateRole = async (formData, request, result) => {

    var updater = await authhelper.Auth(request);

    const permissions = formData.permissions || []
    
    delete formData.permissions
    formData.updated_by = updater?.id
    formData.updated_at = now
    try {
        var data = await sqlResult(`UPDATE roles SET ? WHERE id = ${formData.id} `, [formData])
        var roleId = formData.id
        var permissions_data = await sqlResult(`SELECT *  FROM permissions WHERE permission in (?) `, [permissions])
        var permissionsData_f = []
        permissions_data.forEach((element, i) => {
            permissionsData_f[i] = {
                "role_id" :  roleId,
                "permission_id" : element.id,
            }
        });
        var data2 = await sqlResult(`UPDATE rolepermissions SET deleted_at='${now}', deleted_by='${updater?.id}' WHERE role_id = ${roleId} AND deleted_at IS NULL`)

        permissionsData_f.forEach(async (element, i) => {
            await sqlResult(`INSERT INTO rolepermissions SET ?`, [permissionsData_f[i]])
        });

        if (data) {
            result(null, { "role": {"id": roleId, ...formData} });
            return;
        }
        result(null, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};


Role.deleteRole = async (formData, request, result) => {
    var remover = await authhelper.Auth(request);

    try {
        await sqlResult(`UPDATE roles SET deleted_at='${now}', deleted_by='${remover?.id}' WHERE id = ${formData.id} `)
        var roleId = formData.id
        
        await sqlResult(`UPDATE rolepermissions SET deleted_at='${now}', deleted_by='${remover?.id}' WHERE role_id = ${roleId} AND deleted_at IS NULL`)

        result(null, { "data": {"id": roleId, ...formData} });
        return;
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};

module.exports = Role;