const { UUIDV1 } = require("sequelize");
const db = require("../models");
const Pemasukan = db.pemasukan;
const Perumahan = db.perumahan;
const Warga = db.daftarWarga;
const QR = db.generateQr;

exports.addPemasukan = async (req, res) => {
console.log('lllmlm', req);
    const dataFindQr = await QR.findOne({
        where: {
            id: req.body.data.id
        }
    });


    console.log('mlmlmaaaa',dataFindQr );

    console.log('mlmlmaaazzzzzza',dataFindQr.id_warga );

    Warga.findOne({
        where: {
            id_warga: dataFindQr.id_warga
        }
    }).then((warga) => {
        Pemasukan.create({
            id_transaksi: UUIDV1,
            id_warga: warga.id_warga,
            nama_pembayar: warga.nama_warga,
            nomor_rumah: warga.nomor_rumah,
            tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
            nilai_transaksi: req.body.data.amount,
        })
            .then(async (user) => {
                const PerumahanData = await Perumahan.findOne({
                    where: {
                        id_perumahan: dataFindQr.id_perumahan
                    }
                });

                await Perumahan.update({
                    saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) + (parseInt(req.body.data.amount)),
                }, { where: { id_perumahan: dataFindQr.id_perumahan} });

                res.status(200).send({ message: "Pemasukan berhasil ditambah!." });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    })
};


exports.addPemasukanVA = async (req, res) => {
    const dataFindQr = await QR.findOne({
        where: {
            id: req.body.id
        }
    });

    Warga.findOne({
        where: {
            id_warga: dataFindQr.id_warga
        }
    }).then((warga) => {
        Pemasukan.create({
            id_transaksi: UUIDV1,
            id_warga: warga.id_warga,
            nama_pembayar: warga.nama_warga,
            nomor_rumah: warga.nomor_rumah,
            tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
            nilai_transaksi: req.body.amount,
        })
            .then(async (user) => {
                const PerumahanData = await Perumahan.findOne({
                    where: {
                        id_perumahan: dataFindQr.id_perumahan
                    }
                });

                await Perumahan.update({
                    saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) + (parseInt(req.body.amount)),
                }, { where: { id_perumahan: dataFindQr.id_perumahan} });

                res.status(200).send({ message: "Pemasukan berhasil ditambah!." });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    })

};


exports.listPemasukan = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_pemasukans ORDER BY tb_pemasukans.tanggal_transaksi DESC",
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

exports.listPemasukanWarga = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_pemasukans where tb_pemasukans.id_warga = :id_warga ORDER BY tb_pemasukans.tanggal_transaksi DESC",
        {
            replacements: { id_warga: req.body.id_warga },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Pemasukan.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};