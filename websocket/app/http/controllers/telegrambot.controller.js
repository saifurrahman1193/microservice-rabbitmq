const TelegramBot = require("../../models/telegrambot.model.js");
const { set_response } = require('../../helpers/apiresponser');


exports.sendTestMessage = (req, res) => {
    let formData = {...req.query, ...req.body}

    TelegramBot.sendTestMessage(formData, req, (err, data) => {
        if (err)
        {
            return set_response(res, data, 400, 'failed', [err.message])
        }
        else 
        {
            return set_response(res, data, 200, 'success', ['Send test message.'])
        }
    });

};

