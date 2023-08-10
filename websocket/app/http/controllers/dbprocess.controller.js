const DBProcess = require("../../models/dbprocess.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');


exports.getAllDBProcess = (req, res) => {
    let formData = {...req.query, ...req.body}

    DBProcess.getAllDBProcess(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else 
        {
            return set_response(res, data, 200, 'success', ['DB Process data.'])
        }
    });

};

exports.killDBProcess = (req, res) => {
    let formData = {...req.query, ...req.body}

    DBProcess.killDBProcess(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else 
        {
            return set_response(res, data, 200, 'success', ['Successfully killed the process.'])
        }
    });

};




