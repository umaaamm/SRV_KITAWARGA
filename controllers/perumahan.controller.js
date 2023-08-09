const db = require("../models");
const PERUMAHAN = db.perumahan;

exports.addPERUMAHAN = (req, res) => {
    PERUMAHAN.create({
        id_perumahan: req.body.id_perumahan,
        nama_perumahan: req.body.nama_perumahan,
        alamat_perumahan: req.body.alamat_perumahan,
        saldo_perumahan: req.body.saldo_perumahan,
        link_cctv: req.body.link_cctv,
        link_img_qr: req.body.link_img_qr,
        alamat_maps: req.body.alamat_maps
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
        saldo_perumahan: req.body.saldo_perumahan,
        link_cctv: req.body.link_cctv,
        link_img_qr: req.body.link_img_qr,
        alamat_maps: req.body.alamat_maps
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