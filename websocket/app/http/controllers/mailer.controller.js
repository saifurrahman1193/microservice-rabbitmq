const Mailer = require("../../models/mailer.model.js");
const { validationResult } = require('express-validator');
const { set_response } = require('../../helpers/apiresponser');



exports.sendMail = (req, res) => {

    let formData = {...req.query, ...req.body}

    Mailer.sendMail(formData, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else {
            return set_response(res, data, 200, 'success', ['Mailer data.'])
        }
    });
};

