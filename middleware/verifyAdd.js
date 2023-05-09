const db = require("../models");
const ROLE = db.role;
const KATEGORI = db.kategori;

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
                message: "Failed! Kategori is already in database!"
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
    checkDataKategori: checkDataKategori
};
module.exports = verifyAdd;