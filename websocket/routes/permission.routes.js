module.exports = app => {
    const permission = require("../app/http/controllers/permission.controller.js");
    const permissionvalidation = require("../app/http/validations/permission.validation");
    const { authMiddlware } = require("../app/http/middlewares/auth.middleware");
    const { checkpermissionMiddlware } = require("../app/http/middlewares/checkpermission.middleware");

    prefix = "/api/v1/permission"

    app.post(prefix + "/getPermission", authMiddlware, checkpermissionMiddlware('permission list'), permissionvalidation.getPermissionValidation, permission.getPermission);
    app.post(prefix + "/getAllPermissions", authMiddlware, checkpermissionMiddlware('permission list'), permission.getAllPermissions);
    app.post(prefix + "/getAllPermissions_p", authMiddlware, checkpermissionMiddlware('permission list'), permission.getAllPermissions_p);
    app.post(prefix + "/createPermission", authMiddlware, checkpermissionMiddlware('permission create'), permissionvalidation.createPermissionValidation, permission.createPermission);
    app.post(prefix + "/updatePermission", authMiddlware, checkpermissionMiddlware('permission update'), permissionvalidation.updatePermissionValidation, permission.updatePermission);

};