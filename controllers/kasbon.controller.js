const db = require("../models");
const Kasbon = db.kasbon;

exports.addKasbon = (req, res) => {
    Kasbon.create({
        id_transaksi: req.body.id_transaksi,
        tanggal_transaksi: req.body.tanggal_transaksi,
        nama_karyawan: req.body.nama_karyawan,
        id_karyawan:req.body.id_karyawan,
        detail_transaksi:req.body.detail_transaksi,
        pinjaman:req.body.pinjaman,
        angsuran:req.body.angsuran,
        balance:req.body.balance,
        keterangan:req.body.keterangan,
    })
        .then(user => {
            res.status(200).send({ message: "Kasbon berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteKasbon = (req, res) => {
    Kasbon.destroy({
        where: {
            id_transaksi: req.body.id_transaksi
        }
    }).then(user => {
        res.status(200).send({ message: "Kasbon berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateKasbon = (req, res) => {
    Kasbon.update({
        id_transaksi: req.body.id_transaksi,
        tanggal_transaksi: req.body.tanggal_transaksi,
        nama_karyawan: req.body.nama_karyawan,
        id_karyawan:req.body.id_karyawan,
        detail_transaksi:req.body.detail_transaksi,
        pinjaman:req.body.pinjaman,
        angsuran:req.body.angsuran,
        balance:req.body.balance,
        keterangan:req.body.keterangan,
    }, { where: { id_transaksi: req.body.id_transaksi } })
        .then(user => {
            res.status(200).send({ message: "Kasbon berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};