const db = require("../models");
const TarikTunai = db.tarik_tunai;

exports.addTarikTunai = (req, res) => {
    TarikTunai.create({
        id_tarik_tunai: req.body.id_tarik_tunai,
        tanggal_tarik_tunai: req.body.tanggal_tarik_tunai,
        jumlah_tarik_tunai: req.body.jumlah_tarik_tunai,
        keterangan: req.body.keterangan,
        id_perumahan: req.body.id_perumahan,
    })
        .then(user => {
            res.status(200).send({ message: "Tarik Tunai berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteTarikTunai = (req, res) => {
    TarikTunai.destroy({
        where: {
            id_tarik_tunai: req.body.id_tarik_tunai
        }
    }).then(user => {
        res.status(200).send({ message: "Tarik Tunai berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateTarikTunai = (req, res) => {
    TarikTunai.update({
        id_tarik_tunai: req.body.id_tarik_tunai,
        tanggal_tarik_tunai: req.body.tanggal_tarik_tunai,
        jumlah_tarik_tunai: req.body.jumlah_tarik_tunai,
        keterangan: req.body.keterangan,
        id_perumahan: req.body.id_perumahan,
    }, { where: { id_tarik_tunai: req.body.id_tarik_tunai } })
        .then(user => {
            res.status(200).send({ message: "Tarik Tunai berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.listTarikTunai = (req, res) => {

    let query = '';
    if (req.body.param == 1) {
        query = "SELECT * FROM tb_tunais JOIN tb_perumahans ON tb_tunais.id_perumahan = tb_perumahans.id_perumahan  WHERE tb_perumahans.id_perumahan = :id_perumahan  ORDER BY tb_tunais.keterangan ASC";
    }

    db.sequelize.query(
        query,
        {
            replacements: { id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Tarik Tunai.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};