const db = require("../models");
const Warga = db.daftarWarga;

exports.addWarga = (req, res) => {
    Warga.create({
        id_warga: req.body.id_warga,
        nama_warga: req.body.nama_warga,
        blok_rumah: req.body.blok_rumah,
        nomor_rumah:req.body.nomor_rumah,
        email:req.body.email,
        nomor_hp:req.body.nomor_hp,
    })
        .then(user => {
            res.status(200).send({ message: "Warga berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteWarga = (req, res) => {
    Warga.destroy({
        where: {
            id_warga: req.body.id_warga
        }
    }).then(user => {
        res.status(200).send({ message: "Warga berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateWarga = (req, res) => {
    Warga.update({
        id_warga: req.body.id_warga,
        nama_warga: req.body.nama_warga,
        blok_rumah: req.body.blok_rumah,
        nomor_rumah:req.body.nomor_rumah,
        email:req.body.email,
        nomor_hp:req.body.nomor_hp,
    }, { where: { id_warga: req.body.id_warga } })
        .then(user => {
            res.status(200).send({ message: "Warga berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};