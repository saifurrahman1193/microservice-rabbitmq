module.exports = app => {
    const dbprocess = require("../app/http/controllers/dbprocess.controller.js");

    prefix = "/api/v1/db-process"

    app.post(prefix + "/getAllDBProcess",   dbprocess.getAllDBProcess);
    app.post(prefix + "/killDBProcess",   dbprocess.killDBProcess);

};