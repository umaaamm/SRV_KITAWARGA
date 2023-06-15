const db = require("../models");
const PENGURUS = db.pengurus;

exports.addPENGURUS = (req, res) => {
    PENGURUS.create({
        id_pengurus: req.body.id_pengurus,
        id_warga: req.body.id_warga,
        id_perumahan: req.body.id_perumahan,
    })
        .then(user => {
            res.status(200).send({ message: "Pengurus berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deletePENGURUS = (req, res) => {
    PENGURUS.destroy({
        where: {
            id_rw: req.body.id_rw
        }
    }).then(user => {
        res.status(200).send({ message: "Pengurus berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updatePENGURUS = (req, res) => {
    PENGURUS.update({
        id_pengurus: req.body.id_pengurus,
        id_warga: req.body.id_warga,
        id_perumahan: req.body.id_perumahan,
    }, { where: { id_warga: req.body.id_warga } })
        .then(user => {
            res.status(200).send({ message: "Pengurus berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.listPengurus = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_pengurus JOIN tb_daftar_wargas ON tb_pengurus.id_warga = tb_daftar_wargas.id_warga JOIN tb_perumahans ON tb_pengurus.id_perumahan = tb_perumahans.id_perumahan",
        {
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Pengurus.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};