const Role = require("../../models/role.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');




exports.getRole = (req, res) => {
    let formData = {...req.query, ...req.body}

    Role.getRole(formData, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any role with id ${req.body.id}.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Role data.'])
        }
    });
};

exports.getAllRoles = (req, res) => {
    let formData = {...req.query, ...req.body}

    Role.getAllRoles(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else 
        {
            return set_response(res, data, 200, 'success', ['Role data.'])
        }
    });
};


exports.getAllRoles_p = (req, res) => {
    let formData = {...req.query, ...req.body}

    Role.getAllRoles_p(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else 
        {
            return set_response(res, data, 200, 'success', ['Role data.'])
        }
    });
};


exports.createRole = (req, res) => {
    let formData = {...req.query, ...req.body}

    Role.createRole(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Role successfully created.'])
        }
    });
};

exports.updateRole = (req, res) => {
    let formData = {...req.query, ...req.body}

    Role.updateRole(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Role successfully updated.'])
        }
    });
};

exports.deleteRole = (req, res) => {
    let formData = {...req.query, ...req.body}

    Role.deleteRole(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Role successfully deleted.'])
        }
    });
};