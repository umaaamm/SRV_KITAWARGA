const db = require("../models");
const RW = db.rw;

exports.addRW = (req, res) => {
    RW.create({
        id_rw: req.body.id_rw,
        nomor_rw: req.body.nomor_rw,
        id_perumahan: req.body.id_perumahan,
    })
        .then(user => {
            res.status(200).send({ message: "RW berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteRW = (req, res) => {
    RW.destroy({
        where: {
            id_rw: req.body.id_rw
        }
    }).then(user => {
        res.status(200).send({ message: "RW berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateRW = (req, res) => {
    RW.update({
        id_rw: req.body.id_rw,
        nomor_rw: req.body.nomor_rw,
        id_perumahan: req.body.id_perumahan,
    }, { where: { id_rw: req.body.id_rw } })
        .then(user => {
            res.status(200).send({ message: "RW berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.listRW = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_rws",
        {
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data RW.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};