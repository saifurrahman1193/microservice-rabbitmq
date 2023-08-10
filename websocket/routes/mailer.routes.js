module.exports = app => {
    const mailer = require("../app/http/controllers/mailer.controller.js");
    const { authMiddlware } = require("../app/http/middlewares/auth.middleware");
    const { checkpermissionMiddlware } = require("../app/http/middlewares/checkpermission.middleware");
    const mailer_validations = require("../app/http/validations/mailer.validation");

    prefix = "/api/v1/mailer"

    app.post(prefix + "/sendMail", mailer_validations.sendMailValidation, mailer.sendMail);

};