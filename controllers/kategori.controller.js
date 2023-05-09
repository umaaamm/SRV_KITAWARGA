const db = require("../models");
const Kategori = db.kategori;

exports.addKategori = (req, res) => {
    Kategori.create({
        id_kategori: req.body.id_kategori,
        nama_kategori_transaksi: req.body.nama_kategori_transaksi,
        keterangan_kategori_transaksi: req.body.keterangan_kategori_transaksi,
    })
        .then(user => {
            res.status(200).send({ message: "Kategori berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteKategori = (req, res) => {
    Kategori.destroy({
        where: {
            id_kategori: req.body.id_kategori
        }
    }).then(user => {
        res.status(200).send({ message: "Kategori berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateKategori = (req, res) => {
    Kategori.update({
        id_kategori: req.body.id_kategori,
        nama_kategori_transaksi: req.body.nama_kategori_transaksi,
        keterangan_kategori_transaksi: req.body.keterangan_kategori_transaksi,
    }, { where: { id_kategori: req.body.id_kategori } })
        .then(user => {
            res.status(200).send({ message: "Kategori berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};