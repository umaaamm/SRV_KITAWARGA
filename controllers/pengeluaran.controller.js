const db = require("../models");
const Pengeluaran = db.pengeluaran;

exports.addPengeluaran = (req, res) => {
    Pengeluaran.create({
        id_transaksi: req.body.id_transaksi,
        nama_transaksi: req.body.nama_transaksi,
        id_kategori: req.body.id_kategori,
        kategori_transaksi: req.body.kategori_transaksi,
        tanggal_transaksi: req.body.tanggal_transaksi,
        nilai_transaksi: req.body.nilai_transaksi,
        keterangan: req.body.keterangan,
        // bukti_foto: req.file.filename,
        bukti_foto: 'bukti_foto',
        id_kasbon: req.body.id_kasbon,
        id_perumahan: req.body.id_perumahan
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
        id_kasbon: req.body.id_kasbon,
        id_perumahan: req.body.id_perumahan
    }, { where: { id_transaksi: req.body.id_transaksi } })
        .then(user => {
            res.status(200).send({ message: "Pengeluaran berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.listPengeluaran = (req, res) => {
    let query = '';
    if (req.body.param == 1) {
        query = "SELECT * FROM tb_pengeluarans JOIN tb_ketegoris ON tb_pengeluarans.id_kategori = tb_ketegoris.id_kategori LEFT JOIN tb_kasbons ON tb_pengeluarans.id_kasbon = tb_kasbons.id_kasbon JOIN tb_perumahans ON tb_pengeluarans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_pengeluarans.nama_transaksi ASC";
    }
    if (req.body.param == 2) {
        query = "SELECT * FROM tb_pengeluarans JOIN tb_ketegoris ON tb_pengeluarans.id_kategori = tb_ketegoris.id_kategori LEFT JOIN tb_kasbons ON tb_pengeluarans.id_kasbon = tb_kasbons.id_kasbon JOIN tb_perumahans ON tb_pengeluarans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_pengeluarans.nama_transaksi DESC";
    }
    if (req.body.param == 3) {
        query = "SELECT * FROM tb_pengeluarans JOIN tb_ketegoris ON tb_pengeluarans.id_kategori = tb_ketegoris.id_kategori LEFT JOIN tb_kasbons ON tb_pengeluarans.id_kasbon = tb_kasbons.id_kasbon JOIN tb_perumahans ON tb_pengeluarans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan AND tb_pengeluarans.nama_transaksi LIKE :nama_transaksi ORDER BY tb_pengeluarans.nama_transaksi ASC";
    }

    db.sequelize.query(
        query,
        {
            replacements: { id_perumahan: req.body.id_perumahan, nama_transaksi: '%'+req.body.nama_transaksi+'%' },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Pengeluaran.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};