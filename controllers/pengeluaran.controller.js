const db = require("../models");
const Pengeluaran = db.pengeluaran;

exports.addPengeluaran = (req, res) => {
    Pengeluaran.create({
        id_transaksi: req.body.id_transaksi,
        nama_transaksi: req.body.nama_transaksi,
        kategori_transaksi: req.body.kategori_transaksi,
        tanggal_transaksi: req.body.tanggal_transaksi,
        nilai_transaksi: req.body.nilai_transaksi,
        keterangan: req.body.keterangan,
        bukti_foto: req.body.bukti_foto,
        id_kasbon: req.body.id_kasbon
    })
        .then(user => {
            res.status(200).send({ message: "Pengeluaran berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deletePengeluaran = (req, res) => {
    Pengeluaran.destroy({
        where: {
            id_transaksi: req.body.id_transaksi
        }
    }).then(user => {
        res.status(200).send({ message: "Pengeluaran berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updatePengeluaran = (req, res) => {
    Pengeluaran.update({
        id_transaksi: req.body.id_transaksi,
        nama_transaksi: req.body.nama_transaksi,
        kategori_transaksi: req.body.kategori_transaksi,
        tanggal_transaksi: req.body.tanggal_transaksi,
        nilai_transaksi: req.body.nilai_transaksi,
        keterangan: req.body.keterangan,
        bukti_foto: req.body.bukti_foto,
        id_kasbon: req.body.id_kasbon
    }, { where: { id_transaksi: req.body.id_transaksi } })
        .then(user => {
            res.status(200).send({ message: "Pengeluaran berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};