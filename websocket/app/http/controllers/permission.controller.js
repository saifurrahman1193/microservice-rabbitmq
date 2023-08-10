const Permission = require("../../models/permission.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');



exports.getPermission = (req, res) => {
    let formData = {...req.query, ...req.body}

    Permission.getPermission(formData, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any permission with id ${req.body.id}.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Permission data.'])
        }
    });
};

exports.getAllPermissions = (req, res) => {
    let formData = {...req.query, ...req.body}

    Permission.getAllPermissions(formData, req, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any permission.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Permission data.'])
        }
    });
};

exports.getAllPermissions_p = (req, res) => {
    let formData = {...req.query, ...req.body}

    Permission.getAllPermissions_p(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Permission data.'])
        }
    });
};


exports.createPermission = (req, res) => {
    let formData = {...req.query, ...req.body}

    Permission.createPermission(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Permission successfully created.'])
        }
    });
};

exports.updatePermission = (req, res) => {
    let formData = {...req.query, ...req.body}

    Permission.updatePermission(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Permission successfully updated.'])
        }
    });
};