const db = require("../models");
const RT = db.rt;

exports.addRT = (req, res) => {
    RT.create({
        id_rt: req.body.id_rt,
        nomor_rt: req.body.nomor_rt,
        id_perumahan: req.body.id_perumahan,
        id_rw: req.body.id_rw
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
        id_rw: req.body.id_rw
    }, { where: { id_rt: req.body.id_rt } })
        .then(user => {
            res.status(200).send({ message: "RT berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.listRT = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_rts JOIN tb_rws ON tb_rts.id_rw = tb_rws.id_rw",
        {
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data RT.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};