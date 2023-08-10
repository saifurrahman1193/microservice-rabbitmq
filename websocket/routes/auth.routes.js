module.exports = app => {
    const auth = require("../app/http/controllers/auth.controller.js");
    const { body, validationResult } = require('express-validator');
    const { registerValidation, loginValidation, changePasswordValidation } = require("../app/http/validations/auth.validation");
    const { authMiddlware } = require("../app/http/middlewares/auth.middleware");

    prefix = "/api/v1/auth"

    app.post(prefix + "/register", registerValidation, auth.register);
    app.post(prefix + "/login", loginValidation, auth.login);
    app.post(prefix + "/me", authMiddlware, auth.me);
    app.post(prefix + "/logout", authMiddlware, auth.logout);
    app.post(prefix + "/change-password", authMiddlware, changePasswordValidation, auth.changePassword);

};