const db = require("../models");
const Karyawan = db.manajemenKaryawan;
const Perumahan = db.perumahan;

exports.addKaryawan = (req, res) => {
    Karyawan.create({
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        posisi: req.body.posisi,
        sisa_kasbon: req.body.sisa_kasbon,
        id_perumahan: req.body.id_perumahan,
        gaji_bulanan: req.body.gaji_bulanan
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
        id_perumahan: req.body.id_perumahan,
        gaji_bulanan: req.body.gaji_bulanan
    }, { where: { id_karyawan: req.body.id_karyawan } })
        .then(user => {
            res.status(200).send({ message: "Karyawan berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// mock

exports.mockData = async (req, res) => {

    const PerumahanData = await Perumahan.findOne({
        where: {
            id_perumahan: req.body.id_perumahan
        }
    });

    const dataPemasukan  = await db.sequelize.query(
        "select sum(nilai_transaksi) as nilai_transaksi from tb_pemasukans join tb_daftar_wargas on tb_pemasukans.id_warga = tb_daftar_wargas.id_warga where tb_daftar_wargas.id_perumahan = :id_perumahan",
        {
            replacements: { id_perumahan: req.body.id_perumahan},
            type: db.sequelize.QueryTypes.SELECT
        }
    )

    const dataPengeluaran  = await db.sequelize.query(
        "select sum(nilai_transaksi) as nilai_transaksi from tb_pengeluarans where tb_pengeluarans.id_perumahan = :id_perumahan",
        {
            replacements: { id_perumahan: req.body.id_perumahan},
            type: db.sequelize.QueryTypes.SELECT
        }
    )

    const dataPengeluaranBulanan  = await db.sequelize.query(
        "select sum(nilai_transaksi_pengeluaran_bulanan) as nilai_transaksi_pengeluaran_bulanan from tb_pengeluaran_bulanans where tb_pengeluaran_bulanans.id_perumahan = :id_perumahan",
        {
            replacements: { id_perumahan: req.body.id_perumahan},
            type: db.sequelize.QueryTypes.SELECT
        }
    )

    const dataPengeluaranGaji  = await db.sequelize.query(
        "select sum(jumlah_gaji) as jumlah_gaji from tb_gajis where tb_gajis.id_perumahan = :id_perumahan",
        {
            replacements: { id_perumahan: req.body.id_perumahan},
            type: db.sequelize.QueryTypes.SELECT
        }
    )

    const dataPengeluaranKasbon  = await db.sequelize.query(
        "select sum(pinjaman) as jumlah_kasbon from tb_kasbons join tb_manajemen_karyawans on tb_kasbons.id_karyawan = tb_manajemen_karyawans.id_karyawan  where tb_manajemen_karyawans.id_perumahan =:id_perumahan",
        {
            replacements: { id_perumahan: req.body.id_perumahan},
            type: db.sequelize.QueryTypes.SELECT
        }
    )

    let totalPengeluaran = parseInt(dataPengeluaran[0].nilai_transaksi || 0) + parseInt(dataPengeluaranGaji[0].jumlah_gaji || 0) + parseInt(dataPengeluaranBulanan[0].nilai_transaksi_pengeluaran_bulanan || 0) +  parseInt(dataPengeluaranKasbon[0].jumlah_kasbon || 0)
    let data = {
        "total_saldo": PerumahanData.saldo_perumahan || '0', 
        "total_pemasukan_bulan_ini": dataPemasukan[0].nilai_transaksi || '0',
        "total_pengeluaran_bulan_ini": totalPengeluaran.toString() || '0',
        "selisih": `${dataPemasukan[0].nilai_transaksi - dataPengeluaran[0].nilai_transaksi}` || '0',
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