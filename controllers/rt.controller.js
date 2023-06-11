const db = require("../models");
const RT = db.rt;

exports.addRT = (req, res) => {
    RT.create({
        id_rt: req.body.id_rt,
        nomor_rt: req.body.nomor_rt,
        id_perumahan: req.body.id_perumahan,
    })
        .then(user => {
            res.status(200).send({ message: "RT berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteRT = (req, res) => {
    RT.destroy({
        where: {
            id_rt: req.body.id_rt
        }
    }).then(user => {
        res.status(200).send({ message: "RT berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateRT = (req, res) => {
    RT.update({
        id_rt: req.body.id_rt,
        nomor_rt: req.body.nomor_rt,
        id_perumahan: req.body.id_perumahan,
    }, { where: { id_warga: req.body.id_warga } })
        .then(user => {
            res.status(200).send({ message: "RT berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};