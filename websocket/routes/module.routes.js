module.exports = app => {
    const module = require("../app/http/controllers/module.controller.js");
    const modulevalidation = require("../app/http/validations/module.validation");
    const { authMiddlware } = require("../app/http/middlewares/auth.middleware");
    const { checkpermissionMiddlware } = require("../app/http/middlewares/checkpermission.middleware");

    prefix = "/api/v1/module"

    app.post(prefix + "/getModule", authMiddlware, checkpermissionMiddlware('module list'), modulevalidation.getModuleValidation, module.getModule);
    app.post(prefix + "/getAllModules", authMiddlware, checkpermissionMiddlware('module list'), module.getAllModules);
    app.post(prefix + "/getAllModules_p", authMiddlware, checkpermissionMiddlware('module list'), module.getAllModules_p);
    app.post(prefix + "/createModule", authMiddlware, checkpermissionMiddlware('module create'), modulevalidation.createModuleValidation, module.createModule);
    app.post(prefix + "/updateModule", authMiddlware, checkpermissionMiddlware('module update'), modulevalidation.updateModuleValidation, module.updateModule);

};