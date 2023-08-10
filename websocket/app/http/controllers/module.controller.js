const Module = require("../../models/module.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');



exports.getModule = (req, res) => {
    let formData = {...req.query, ...req.body}

    Module.getModule(formData, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any module with id ${req.body.id}.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Module data.'])
        }
    });
};

exports.getAllModules = (req, res) => {
    let formData = {...req.query, ...req.body}

    Module.getAllModules(formData, req, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any module.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Module data.'])
        }
    });
};

exports.getAllModules_p = (req, res) => {
    let formData = {...req.query, ...req.body}

    Module.getAllModules_p(formData, req, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any module.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Module data.'])
        }
    });
};


exports.createModule = (req, res) => {
    let formData = {...req.query, ...req.body}

    Module.createModule(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Module successfully created.'])
        }
    });
};

exports.updateModule = (req, res) => {
    let formData = {...req.query, ...req.body}

    Module.updateModule(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Module successfully updated.'])
        }
    });
};