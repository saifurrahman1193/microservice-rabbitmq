module.exports = app => {
    const telegrambot = require("../app/http/controllers/telegrambot.controller.js");

    prefix = "/api/v1/telegram-bot"

    app.post(prefix + "/sendTestMessage",   telegrambot.sendTestMessage);

};