const { sqlResult, paginate } = require('../helpers/sqlhelpers');
const { now } = require('../helpers/datehelpers');
const authhelper = require('../helpers/authhelper');
const loghelper = require('../helpers/loghelper');



// constructor
const Permission = function(formData) {
    for (const property in formData) {
        this[property] = formData[property]
    }
};


Permission.getPermission = async (formData, result) => {
    try {
        var permission_data = await sqlResult(`
                        SELECT * FROM permissions WHERE id = ${formData.id}
                    `)
        if (permission_data.length) {
            delete permission_data[0].password;
            result(null, {"permission" : permission_data[0]});
            return;
        }
        result({ kind: "not_found" }, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': ['Something went wrong!'] }, null);
        return;
    }
};


Permission.getAllPermissions = async (formData, request, result) => {
    try {
        // where condition
        let where_clause = `WHERE 1=1 `
        formData?.permission ? where_clause=where_clause+`AND permission like '%${formData?.permission}%'` : null

        let query = `SELECT permissions.*, permission_modules.name as module FROM permissions 
                        left join permission_modules on ( permissions.module_id= permission_modules.id)
                        ${where_clause}`

        var data = await sqlResult(query)

        if (data?.length) {
            result(null, {
                "data" : data,
            });
            return;
        }
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};

Permission.getAllPermissions_p = async (formData, request, result) => {
    try {
        // formData = {...formData, perPage:2, page:2 }
        let paginator = await paginate(request, formData, 'permissions')

        // where condition
        let where_clause = `WHERE 1=1 `
        formData?.permission ? where_clause=where_clause+`AND permission like '%${formData?.permission}%'` : null

        let query = `SELECT permissions.*, permission_modules.name as module FROM permissions 
                        left join permission_modules on ( permissions.module_id= permission_modules.id)
                        ${where_clause} LIMIT ${paginator?.record_per_page} OFFSET ${paginator?.offset}`

        var data = await sqlResult(query)
        // offset
        if (data?.length) {
            result(null, {
                "data" : data,
                "paginator" : paginator
            });
            return;
        }
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};


Permission.createPermission = async (formData, request, result) => {
    var creator = await authhelper.Auth(request);

    formData.created_by = creator?.id

    try {
        var permission_module_data = (await sqlResult(`
                        SELECT * FROM permission_modules WHERE name='${formData.module}'
                    `))[0] || {}

        formData.module_id = permission_module_data?.id
        delete formData?.module

        var data = await sqlResult(`INSERT INTO permissions SET ?`, [formData])

        if (data) {
            result(null, { "data": {"id": data.insertId, ...formData} });
            return;
        }
        result(null, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};


Permission.updatePermission = async (formData, request, result) => {

    var updater = await authhelper.Auth(request);

    formData.updated_by = updater?.id
    formData.updated_at = now
    try {
        var permission_module_data = (await sqlResult(`
                        SELECT * FROM permission_modules WHERE name='${formData.module}'
                    `))[0] || {}

        formData.module_id = permission_module_data?.id
        delete formData?.module

        var data = await sqlResult(`UPDATE permissions SET ? WHERE id = ${formData.id} `, [formData])

        if (data) {
            result(null, { "data": formData });
            return;
        }
        result(null, null);
    } catch (error) {
        await loghelper.log(error?.message, 'error')
        result({ 'message': error?.message }, null);
        return;
    }
};

module.exports = Permission;