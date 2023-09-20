const db = require("../models");
const Pemasukan = db.pemasukan;
const Perumahan = db.perumahan;
const Warga = db.daftarWarga;

exports.addPemasukan = (req, res) => {

    console.log('mlmldmgldmg', req.body);
    // Warga.findOne({
    //     where: {
    //         biaya_ipl: req.body.data.amount,
    //         id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002'
    //     }
    // }).then((warga) => {
    //     Pemasukan.create({
    //         id_transaksi: req.body.data.id,
    //         id_warga: warga.id_warga,
    //         nama_pembayar: warga.nama_warga,
    //         nomor_rumah: warga.nomor_rumah,
    //         tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
    //         nilai_transaksi: req.body.data.amount,
    //     })
    //         .then(async (user) => {
    //             const PerumahanData = await Perumahan.findOne({
    //                 where: {
    //                     id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002'
    //                 }
    //             });

    //             await Perumahan.update({
    //                 saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) + (parseInt(req.body.data.amount)),
    //             }, { where: { id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002' } });

    //             res.status(200).send({ message: "Pemasukan berhasil ditambah!." });
    //         })
    //         .catch(err => {
    //             res.status(500).send({ message: err.message });
    //         });
    // })
};


exports.addPemasukanVA = (req, res) => {
    Warga.findOne({
        where: {
            biaya_ipl: req.body.data.amount,
            id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002'
        }
    }).then((warga) => {
        Pemasukan.create({
            id_transaksi: req.body.data.id,
            id_warga: warga.id_warga,
            nama_pembayar: warga.nama_warga,
            nomor_rumah: warga.nomor_rumah,
            tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
            nilai_transaksi: req.body.amount,
        })
            .then(async (user) => {
                const PerumahanData = await Perumahan.findOne({
                    where: {
                        id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002'
                    }
                });

                await Perumahan.update({
                    saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) + (parseInt(req.body.amount)),
                }, { where: { id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002' } });

                res.status(200).send({ message: "Pemasukan VA berhasil ditambah!." });
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