const db = require("../models");
const Warga = db.daftarWarga;

exports.addWarga = (req, res) => {
    Warga.create({
        id_warga: req.body.id_warga,
        nama_warga: req.body.nama_warga,
        blok_rumah: req.body.blok_rumah,
        nomor_rumah: req.body.nomor_rumah,
        email: req.body.email,
        nomor_hp: req.body.nomor_hp,
        is_rw: req.body.is_rw,
        is_rt: req.body.is_rt,
        id_rt: req.body.id_rt,
        id_rw: req.body.id_rw,
        id_perumahan: req.body.id_perumahan,
        status_pernikahan: req.body.status_pernikahan,
        jenis_kelamin: req.body.jenis_kelamin,
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
        nomor_rumah: req.body.nomor_rumah,
        email: req.body.email,
        nomor_hp: req.body.nomor_hp,
        is_rw: req.body.is_rw,
        is_rt: req.body.is_rt,
        id_rt: req.body.id_rt,
        id_rw: req.body.id_rw,
        id_perumahan: req.body.id_perumahan,
        status_pernikahan: req.body.status_pernikahan,
        jenis_kelamin: req.body.jenis_kelamin,
    }, { where: { id_warga: req.body.id_warga } })
        .then(user => {
            res.status(200).send({ message: "Warga berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};