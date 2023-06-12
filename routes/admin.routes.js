const { authJwt } = require("../middleware");
const controllerRole = require("../controllers/role.controller");
const controllerKategori = require("../controllers/kategori.controller");
const controllerPengeluaran = require("../controllers/pengeluaran.controller");
const controllerKaryawan = require("../controllers/karyawan.controller");
const controllerWarga = require("../controllers/warga.controller");
const controllerKasbon = require("../controllers/kasbon.controller");
const controllerRT = require("../controllers/rt.controller");
const controllerRW = require("../controllers/rw.controller");
const controllerPengurus = require("../controllers/pengurus.controller");

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

    // Pengeluaran
    app.post(
        "/api/admin/insert/pengeluaran",
        [authJwt.verifyToken, middleware.verifyAdd.verifyPengeluaran],
        controllerPengeluaran.addPengeluaran
    )

    app.post(
        "/api/admin/delete/pengeluaran",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataPengeluaran],
        controllerPengeluaran.deletePengeluaran
    )

    app.post(
        "/api/admin/update/pengeluaran",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataPengeluaran],
        controllerPengeluaran.updatePengeluaran
    )

    // end Pengeluaran

    // karyawan
    app.post(
        "/api/admin/insert/karyawan",
        [authJwt.verifyToken, middleware.verifyAdd.verifyKaryawan],
        controllerKaryawan.addKaryawan
    )

    app.post(
        "/api/admin/delete/karyawan",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataKaryawan],
        controllerKaryawan.deleteKaryawan
    )

    app.post(
        "/api/admin/update/karyawan",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataKaryawan],
        controllerKaryawan.updateKaryawan
    )

    // end Karyawan

    // warga
    app.post(
        "/api/admin/insert/warga",
        [authJwt.verifyToken, middleware.verifyAdd.verifyWarga],
        controllerWarga.addWarga
    )

    app.post(
        "/api/admin/delete/warga",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataWarga],
        controllerWarga.deleteWarga
    )

    app.post(
        "/api/admin/update/warga",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataWarga],
        controllerWarga.updateWarga
    )

    app.post(
        "/api/admin/list/warga",
        [authJwt.verifyToken],
        controllerWarga.listWarga
    )

    // End Warga

    // Kasbon

    app.post(
        "/api/admin/insert/kasbon",
        [authJwt.verifyToken, middleware.verifyAdd.verifyKasbon],
        controllerKasbon.addKasbon
    )

    app.post(
        "/api/admin/delete/kasbon",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataKasbon],
        controllerKasbon.deleteKasbon
    )

    app.post(
        "/api/admin/update/kasbon",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataKasbon],
        controllerKasbon.updateKasbon
    )


    app.get(
        "/api/admin/mock/data",
        [authJwt.verifyToken],
        controllerKaryawan.mockData
    )

    app.get(
        "/api/admin/mock/datalist",
        [authJwt.verifyToken],
        controllerKaryawan.mockDataList
    )

    // End Kasbon

    // start rt
    app.post(
        "/api/admin/insert/rt",
        [authJwt.verifyToken],
        controllerRT.addRT
    )

    app.post(
        "/api/admin/delete/rt",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataRT],
        controllerRT.deleteRT
    )

    app.post(
        "/api/admin/update/rt",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataRT],
        controllerRT.updateRT
    )

    // end rt

    // start rw
    app.post(
        "/api/admin/insert/rw",
        [authJwt.verifyToken],
        controllerRW.addRW
    )

    app.post(
        "/api/admin/delete/rw",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataRW],
        controllerRW.deleteRW
    )

    app.post(
        "/api/admin/update/rw",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataRW],
        controllerRW.updateRW
    )

    // end rw


    // start pengurus
    app.post(
        "/api/admin/insert/pengurus]",
        [authJwt.verifyToken],
        controllerPengurus.addPENGURUS
    )

    app.post(
        "/api/admin/delete/pengurus",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataPengurus],
        controllerPengurus.deletePENGURUS
    )

    app.post(
        "/api/admin/update/pengurus",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataPengurus],
        controllerPengurus.updatePENGURUS
    )

    // end pengurus

};
