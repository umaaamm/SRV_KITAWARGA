const db = require("../models");
const Karyawan = db.manajemenKaryawan;

exports.addKaryawan = (req, res) => {
    Karyawan.create({
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        posisi: req.body.posisi,
        sisa_kasbon: req.body.sisa_kasbon,
    })
        .then(user => {
            res.status(200).send({ message: "Karyawan berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteKaryawan = (req, res) => {
    Karyawan.destroy({
        where: {
            id_karyawan: req.body.id_karyawan
        }
    }).then(user => {
        res.status(200).send({ message: "Karyawan berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateKaryawan = (req, res) => {
    Karyawan.update({
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        posisi: req.body.posisi,
        sisa_kasbon: req.body.sisa_kasbon,
    }, { where: { id_karyawan: req.body.id_karyawan } })
        .then(user => {
            res.status(200).send({ message: "Karyawan berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// mock

exports.mockData = (req, res) => {

    let data = {
        "total_saldo": "2000000",
        "total_pemasukan_bulan_ini": "4000000",
        "total_pengeluaran_bulan_ini": "1000000",
        "selisih": "300000",
    }

    res.status(200).json({ message: "Berhasil Get Data Summary.", data: data });
};

exports.mockDataList = (req, res) => {

    let data = [{
        "nama": "Arif",
        "tanggal": "1686193241",
        "balance": "10300",
        "keterangan": "1"
    },
    {
        "nama": "Yoga Tomi",
        "tanggal": "1686193241",
        "balance": "10200",
        "keterangan": "0"
    },
    {
        "nama": "Dhimas",
        "tanggal": "1686193241",
        "balance": "15000",
        "keterangan": "1"
    },
    {
        "nama": "Reza",
        "tanggal": "1686193241",
        "balance": "15000",
        "keterangan": "0"
    }]

    res.status(200).json({ message: "Berhasil Get Data Summary.", data: data });
};

exports.listKaryawan = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_manajemen_karyawans",
        {
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Karyawan.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};