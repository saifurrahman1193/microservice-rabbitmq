const { sqlResultDynamicDB, paginate } = require('../helpers/sqlhelpers');
const { now } = require('../helpers/datehelpers');
const authhelper = require('../helpers/authhelper');
const loghelper = require('../helpers/loghelper');



// constructor
const DBProcess = function(formData) {
    for (const property in formData) {
        this[property] = formData[property]
    }
};



DBProcess.getAllDBProcess = async (formData, request, result) => {
    try {

        // console.log('formData ++++++++++++++++', formData);
        // console.log('request ++++++++++++++++', request);
        // where condition
        let where_clause = `WHERE COMMAND='Execute' `
        formData?.database ? where_clause=where_clause+`AND DB='${formData?.database}'` : null
        formData?.dbusername ? where_clause=where_clause+`AND USER='${formData?.dbusername}'` : null

        let query = `SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST ${where_clause} `

        var data = await sqlResultDynamicDB(query, {...request, ...formData})
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


DBProcess.killDBProcess = async (formData, request, result) => {
    try {
        let process = `${formData?.process_id}`
        let query = `kill  ${process} `

        var data = await sqlResultDynamicDB(query, {...request, ...formData})
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



module.exports = DBProcess;