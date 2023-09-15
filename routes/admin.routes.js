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
const controllerPerumahan = require("../controllers/perumahan.controller");
const controllerAdmin = require("../controllers/auth.controller");
const controllerTarikTunai = require("../controllers/tarikTunai.controller");
const controllerPemasukan = require("../controllers/pemasukan.controller");

const middleware = require("../middleware");
const multer = require('multer')
const path = require("path");


// akan digunakan jika sudah perlu

// const diskStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, "../upload"));
//     },
//     // konfigurasi penamaan file yang unik
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     },
//   });

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/admin/update/password",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataAdmin],
        controllerAdmin.updatePassword
    )

    app.get(
        "/api/admin/list/admin",
        [authJwt.verifyToken],
        controllerAdmin.listAdmin
    )

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

    app.get(
        "/api/admin/list/role",
        [authJwt.verifyToken],
        controllerRole.listRole
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

    app.get(
        "/api/admin/list/kategori",
        [authJwt.verifyToken],
        controllerKategori.listKategori
    )
    // end kategori

    // Pengeluaran

    //  "/api/admin/insert/pengeluaran",multer({ storage: diskStorage }).single('bukti_foto'),
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

    app.post(
        "/api/admin/list/pengeluaran",
        [authJwt.verifyToken],
        controllerPengeluaran.listPengeluaran
    )

    app.post(
        "/api/admin/list/pengeluaran_webview",
        controllerPengeluaran.listPengeluaran
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

    app.get(
        "/api/admin/list/karyawan",
        [authJwt.verifyToken],
        controllerKaryawan.listKaryawan
    )

    // end Karyawan

    // warga
    app.post(
        "/api/admin/insert/warga",
        [authJwt.verifyToken, middleware.verifyAdd.verifyWarga],
        controllerWarga.addWarga
    )

    app.post(
        "/api/admin/profil/warga",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataWarga],
        controllerWarga.getProfile
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

    app.post(
        "/api/admin/list/kasbon",
        [authJwt.verifyToken],
        controllerKasbon.listKasbon
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

    app.get(
        "/api/admin/list/rt",
        [authJwt.verifyToken],
        controllerRT.listRT
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

    app.get(
        "/api/admin/list/rw",
        [authJwt.verifyToken],
        controllerRW.listRW
    )

    // end rw


    // start pengurus
    app.post(
        "/api/admin/insert/pengurus",
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

    app.get(
        "/api/admin/list/pengurus",
        [authJwt.verifyToken],
        controllerPengurus.listPengurus
    )

    // end pengurus

    // perumahan
    app.post(
        "/api/admin/insert/perumahan",
        [authJwt.verifyToken],
        controllerPerumahan.addPERUMAHAN
    )

    app.post(
        "/api/admin/delete/perumahan",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataPerumahan],
        controllerPerumahan.deletePERUMAHAN
    )

    app.post(
        "/api/admin/update/perumahan",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataPerumahan],
        controllerPerumahan.updatePERUMAHAN
    )

    app.get(
        "/api/admin/list/perumahan",
        [authJwt.verifyToken],
        controllerPerumahan.listPerumahan
    )

    // end


    // tarik tunai
    app.post(
        "/api/admin/insert/tarik_tunai",
        [authJwt.verifyToken, middleware.verifyAdd.verifyTarikTunai],
        controllerTarikTunai.addTarikTunai
    )

    app.post(
        "/api/admin/delete/tarik_tunai",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataTarikTunai],
        controllerTarikTunai.deleteTarikTunai
    )

    app.post(
        "/api/admin/update/tarik_tunai",
        [authJwt.verifyToken, middleware.verifyAdd.checkDataTarikTunai],
        controllerTarikTunai.updateTarikTunai
    )

    app.post(
        "/api/admin/list/tarik_tunai",
        [authJwt.verifyToken],
        controllerTarikTunai.listTarikTunai
    )

    //pemasukan
    app.post(
        "/api/admin/insert/pemasukan_webhook",
        controllerPemasukan.addPemasukan
    )

    app.post(
        "/api/admin/list/pemasukan",
        [authJwt.verifyToken],
        controllerPemasukan.listPemasukan
    )

};
