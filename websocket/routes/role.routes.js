module.exports = app => {
    const role = require("../app/http/controllers/role.controller.js");
    const { createRoleValidation, updateRoleValidation, getRoleValidation, deleteRoleValidation } = require("../app/http/validations/role.validation");
    const { authMiddlware } = require("../app/http/middlewares/auth.middleware");
    const { checkpermissionMiddlware } = require("../app/http/middlewares/checkpermission.middleware");

    prefix = "/api/v1/role"

    app.post(prefix + "/getAllRoles", authMiddlware, checkpermissionMiddlware('role list'),  role.getAllRoles);
    app.post(prefix + "/getRole", authMiddlware, checkpermissionMiddlware('role list'), getRoleValidation, role.getRole);
    app.post(prefix + "/getAllRoles_p", authMiddlware, checkpermissionMiddlware('role list'), role.getAllRoles_p);
    app.post(prefix + "/createRole", authMiddlware, checkpermissionMiddlware('role create'), createRoleValidation, role.createRole);
    app.post(prefix + "/updateRole", authMiddlware, checkpermissionMiddlware('role update'), updateRoleValidation, role.updateRole);
    app.post(prefix + "/deleteRole", authMiddlware, checkpermissionMiddlware('role delete'), deleteRoleValidation, role.deleteRole);

};