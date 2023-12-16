const db = require("../models");
const ROLE = db.role;
const KATEGORI = db.kategori;
const PENGELUARAN = db.pengeluaran
const KARYAWAN = db.manajemenKaryawan
const WARGA = db.daftarWarga
const KASBON = db.kasbon
const RT = db.rt
const RW = db.rw
const PENGURUS = db.pengurus
const PERUMAHAN = db.perumahan
const ADMIN = db.admin
const TARIKTUNAI = db.tarik_tunai

var bcrypt = require("bcryptjs");

checkDuplicateRole = (req, res, next) => {
    ROLE.findOne({
        where: {
            id: req.body.id
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Roles is already in database!"
            });
            return;
        }
        next();
    });
};

checkDataeRole = (req, res, next) => {
    ROLE.findOne({
        where: {
            kode_role: req.body.kode_role
        }
    }).then(role => {
        if (!role) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!"
            });
            return;
        }
        next();
    });
};

checkDuplicateKategori = (req, res, next) => {
    KATEGORI.findOne({
        where: {
            id_kategori: req.body.id_kategori
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Kategori is already in database!"
            });
            return;
        }
        next();
    });
};

checkDataKategori = (req, res, next) => {
    KATEGORI.findOne({
        where: {
            id_kategori: req.body.id_kategori
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!"
            });
            return;
        }
        next();
    });
};

// Pengeluaran

checkDuplicatePengeluaran = (req, res, next) => {
    PENGELUARAN.findOne({
        where: {
            id_transaksi: req.body.id_transaksi
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Pengeluaran is already in database!"
            });
            return;
        }
        next();
    });
};

checkDataPengeluaran = (req, res, next) => {
    PENGELUARAN.findOne({
        where: {
            id_transaksi: req.body.id_transaksi
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!"
            });
            return;
        }
        next();
    });
};


// Karyawan

checkDuplicateKaryawan = (req, res, next) => {
    KARYAWAN.findOne({
        where: {
            id_karyawan: req.body.id_karyawan
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Karyawan is already in database!"
            });
            return;
        }
        next();
    });
};

checkDataKaryawan = (req, res, next) => {
    KARYAWAN.findOne({
        where: {
            id_karyawan: req.body.id_karyawan
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!"
            });
            return;
        }
        next();
    });
};


// Warga

checkDuplicateWarga = (req, res, next) => {
    WARGA.findOne({
        where: {
            id_warga: req.body.id_warga
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Warga is already in database!"
            });
            return;
        }
        next();
    });
};

checkDataWarga = (req, res, next) => {
    WARGA.findOne({
        where: {
            id_warga: req.body.id_warga
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!"
            });
            return;
        }
        next();
    });
};


// kasbon

checkDuplicateKasbon = (req, res, next) => {
    KASBON.findOne({
        where: {
            id_kasbon: req.body.id_kasbon
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Warga is already in database!"
            });
            return;
        }
        next();
    });
};

checkDataKasbon = (req, res, next) => {
    KASBON.findOne({
        where: {
            id_kasbon: req.body.id_kasbon
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!!"
            });
            return;
        }
        next();
    });
};


checkDataRT = (req, res, next) => {
    RT.findOne({
        where: {
            id_rt: req.body.id_rt
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!!"
            });
            return;
        }
        next();
    });
};


checkDataRW = (req, res, next) => {
    RW.findOne({
        where: {
            id_rw: req.body.id_rw
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!!"
            });
            return;
        }
        next();
    });
};


checkDataPengurus = (req, res, next) => {
    PENGURUS.findOne({
        where: {
            id_pengurus: req.body.id_pengurus
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!!"
            });
            return;
        }
        next();
    });
};

checkDataPerumahan = (req, res, next) => {
    PERUMAHAN.findOne({
        where: {
            id_perumahan: req.body.id_perumahan
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!!"
            });
            return;
        }
        next();
    });
};

checkDataAdmin = (req, res, next) => {
    ADMIN.findOne({
        where: {
            no_hp_admin: req.body.no_hp_admin
        }
    }).then(admin => {

        if (!admin) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!"
            });
            return;
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password_admin,
            admin.password_admin
          );

        if(!passwordIsValid){
            res.status(400).send({
                message: "Failed! Password lama tidak sesuai!"
            });
            return;
        }

        
        next();
    });
};

checkDataWargaPass = (req, res, next) => {
    WARGA.findOne({
        where: {
            id_warga: req.body.id_warga
        }
    }).then(admin => {

        if (!admin) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!"
            });
            return;
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password_warga,
            admin.password_warga
          );

        if(!passwordIsValid){
            res.status(400).send({
                message: "Failed! Password lama tidak sesuai!"
            });
            return;
        }

        
        next();
    });
};

// tarik tunai

checkDuplicateTarikTunai = (req, res, next) => {
    TARIKTUNAI.findOne({
        where: {
            id_tarik_tunai: req.body.id_tarik_tunai
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Tarik Tunai is already in database!"
            });
            return;
        }
        next();
    });
};

checkDataTarikTunai = (req, res, next) => {
    TARIKTUNAI.findOne({
        where: {
            id_tarik_tunai: req.body.id_tarik_tunai
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                message: "Failed! Data tidak ada dalam database!"
            });
            return;
        }
        next();
    });
};

const verifyAdd = {
    verifyRole: checkDuplicateRole,
    verifyKategori: checkDuplicateKategori,
    checkDataeRole: checkDataeRole,
    checkDataKategori: checkDataKategori,
    checkDataPengeluaran: checkDataPengeluaran,
    verifyPengeluaran: checkDuplicatePengeluaran,
    checkDataKaryawan: checkDataKaryawan,
    verifyKaryawan: checkDuplicateKaryawan,
    checkDataWarga: checkDataWarga,
    verifyWarga: checkDuplicateWarga,
    checkDataKasbon: checkDataKasbon,
    verifyKasbon: checkDuplicateKasbon,
    checkDataRT: checkDataRT,
    checkDataRW: checkDataRW,
    checkDataPengurus: checkDataPengurus,
    checkDataPerumahan: checkDataPerumahan,
    checkDataAdmin: checkDataAdmin,
    checkDataWargaPass: checkDataWargaPass,
    checkDataTarikTunai: checkDataTarikTunai,
    verifyTarikTunai: checkDuplicateTarikTunai,
};

module.exports = verifyAdd;