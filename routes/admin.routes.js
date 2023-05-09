const { authJwt } = require("../middleware");
const controllerRole = require("../controllers/role.controller");
const controllerKategori = require("../controllers/kategori.controller");
const middleware = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // role
    app.post(
        "/api/admin/insert/role",
        [authJwt.verifyToken, middleware.verifyAdd.verifyRole],
        controllerRole.addRole
    )

    app.post(
        "/api/admin/delete/role",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataeRole],
        controllerRole.deleteRole
    )

    app.post(
        "/api/admin/update/role",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataeRole],
        controllerRole.updateRole
    )

    // end role

    // kategori
    app.post(
        "/api/admin/insert/kategori",
        [authJwt.verifyToken, middleware.verifyAdd.verifyKategori],
        controllerKategori.addKategori
    )

    app.post(
        "/api/admin/delete/kategori",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataKategori],
        controllerKategori.deleteKategori
    )

    app.post(
        "/api/admin/update/kategori",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataKategori],
        controllerKategori.updateKategori
    )

    // end kategori

};