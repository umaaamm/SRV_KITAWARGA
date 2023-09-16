const db = require("../models");
const Pemasukan = db.pemasukan;

exports.addPemasukan = (req, res) => {
    Pemasukan.create({
        id_transaksi: req.body.data.id,
        id_warga: '956d1ad0-0946-11ee-be56-0242ac120002',
        nama_pembayar: 'Mahmud',
        nomor_rumah: '23',
        tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
        nilai_transaksi: req.body.data.amount,
    })
        .then(user => {
            res.status(200).send({ message: "Pemasukan berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.addPemasukanVA = (req, res) => {
    Pemasukan.create({
        id_transaksi: req.body.id,
        id_warga: '956d1ad0-0946-11ee-be56-0242ac120002',
        nama_pembayar: 'Mahmud',
        nomor_rumah: '23',
        tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
        nilai_transaksi: req.body.amount,
    })
        .then(user => {
            res.status(200).send({ message: "Pemasukan VA berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.listPemasukan = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_pemasukans",
        {
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Pemasukan.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};