const User = require("../../models/user.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');

exports.userStatusUpdate = (req, res) => {

    let formData = {...req.query, ...req.body}

    User.userStatusUpdate(formData, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', err.message)
        }
        else {
            return set_response(res, data, 200, 'success', ['Successfully user status updated'])
        }
    });
};


exports.getUser = (req, res) => {
    let formData = {...req.query, ...req.body}

    User.getUser(formData, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any user with id ${req.body.id}.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['User data.'])
        }
    });
};


exports.getAllUsers_p = (req, res) => {
    let formData = {...req.query, ...req.body}

    User.getAllUsers_p(formData, req, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found") {
                return set_response(res, data, 204, 'failed', [`Not found any user.`])
            }
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['User data.'])
        }
    });
};




exports.createUser = (req, res) => {
    let formData = {...req.query, ...req.body}

    User.createUser(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['User successfully created.'])
        }
    });
};

exports.updateUser = (req, res) => {
    let formData = {...req.query, ...req.body}

    User.updateUser(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['User successfully updated.'])
        }
    });
};



exports.getAllUsers_csv_custom_instant = (req, res) => {
    let formData = {...req.query, ...req.body}

    User.getAllUsers_csv_custom_instant(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['User data.'])
        }
    });
};


exports.getAllUsers_exceljs_excel_instant = (req, res) => {
    let formData = {...req.query, ...req.body}

    User.getAllUsers_exceljs_excel_instant(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['User data.'])
        }
    });
};