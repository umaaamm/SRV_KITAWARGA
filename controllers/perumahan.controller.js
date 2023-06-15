const db = require("../models");
const PERUMAHAN = db.perumahan;

exports.addPERUMAHAN = (req, res) => {
    PERUMAHAN.create({
        id_perumahan: req.body.id_perumahan,
        nama_perumahan: req.body.nama_perumahan,
        alamat_perumahan: req.body.alamat_perumahan,
    })
        .then(user => {
            res.status(200).send({ message: "Perumahan berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deletePERUMAHAN = (req, res) => {
    PERUMAHAN.destroy({
        where: {
            id_perumahan: req.body.id_perumahan
        }
    }).then(user => {
        res.status(200).send({ message: "Perumahan berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updatePERUMAHAN = (req, res) => {
    PERUMAHAN.update({
        id_perumahan: req.body.id_perumahan,
        nama_perumahan: req.body.nama_perumahan,
        alamat_perumahan: req.body.alamat_perumahan,
    }, { where: { id_perumahan: req.body.id_perumahan } })
        .then(user => {
            res.status(200).send({ message: "Perumahan berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.listPerumahan = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_perumahans",
        {
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Perumahan.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};