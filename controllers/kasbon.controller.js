const db = require("../models");
const Kasbon = db.kasbon;

exports.addKasbon = (req, res) => {
    Kasbon.create({
        id_kasbon: req.body.id_kasbon,
        tanggal_transaksi: req.body.tanggal_transaksi,
        nama_karyawan: req.body.nama_karyawan,
        id_karyawan: req.body.id_karyawan,
        detail_transaksi: req.body.detail_transaksi,
        pinjaman: req.body.pinjaman,
        tenor: req.body.tenor,
        angsuran_per_bulan: req.body.angsuran_per_bulan,
        keterangan: req.body.keterangan,
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
            id_kasbon: req.body.id_kasbon
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
        id_kasbon: req.body.id_kasbon,
        tanggal_transaksi: req.body.tanggal_transaksi,
        nama_karyawan: req.body.nama_karyawan,
        id_karyawan: req.body.id_karyawan,
        detail_transaksi: req.body.detail_transaksi,
        pinjaman: req.body.pinjaman,
        tenor: req.body.angsuran,
        angsuran_per_bulan: req.body.balance,
        keterangan: req.body.keterangan,
    }, { where: { id_kasbon: req.body.id_kasbon } })
        .then(user => {
            res.status(200).send({ message: "Kasbon berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.listKasbon = (req, res) => {

    let query = '';
    if (req.body.param == 1) {
        query = "SELECT * FROM tb_kasbons JOIN tb_manajemen_karyawans ON tb_kasbons.id_karyawan = tb_manajemen_karyawans.id_karyawan JOIN tb_perumahans ON tb_manajemen_karyawans.id_perumahan =  tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan AND tb_kasbons.tenor != '0' ORDER BY tb_manajemen_karyawans.nama_karyawan ASC";
    }
    if (req.body.param == 2) {
        query = "SELECT * FROM tb_kasbons JOIN tb_manajemen_karyawans ON tb_kasbons.id_karyawan = tb_manajemen_karyawans.id_karyawan JOIN tb_perumahans ON tb_manajemen_karyawans.id_perumahan =  tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan AND tb_kasbons.tenor != '0' ORDER BY tb_manajemen_karyawans.nama_karyawan DESC";
    }
    if (req.body.param == 3) {
        query = "SELECT * FROM tb_kasbons JOIN tb_manajemen_karyawans ON tb_kasbons.id_karyawan = tb_manajemen_karyawans.id_karyawan JOIN tb_perumahans ON tb_manajemen_karyawans.id_perumahan =  tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan AND tb_manajemen_karyawans.nama_karyawan LIKE :nama AND tb_kasbons.tenor != '0' ORDER BY tb_manajemen_karyawans.nama_karyawan ASC";
    }
    if (req.body.param == 4) {
        query = "SELECT * FROM tb_kasbons JOIN tb_manajemen_karyawans ON tb_kasbons.id_karyawan = tb_manajemen_karyawans.id_karyawan JOIN tb_perumahans ON tb_manajemen_karyawans.id_perumahan =  tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan AND tb_manajemen_karyawans.id_karyawan = :nama_kary AND tb_kasbons.tenor != '0' ORDER BY tb_manajemen_karyawans.nama_karyawan ASC";
    }

    db.sequelize.query(
        query,
        {
            replacements: { id_perumahan: req.body.id_perumahan, nama_kary:req.body.nama ,nama: '%' + req.body.nama + '%' },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Kasbon.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};