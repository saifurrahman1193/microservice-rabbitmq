module.exports = app => {
    // require("./auth.routes.js")(app);
    require("./web.routes.js")(app);
    require("./chat.routes.js")(app);
    require("./user.routes.js")(app);
    require("./role.routes.js")(app);
    require("./permission.routes.js")(app);
    require("./module.routes.js")(app);
    require("./mailer.routes.js")(app);
    require("./dbprocess.routes.js")(app);
    require("./telegrambot.routes.js")(app);

};