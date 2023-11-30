const { v1: uuidv1 } = require('uuid');
const db = require("../models");
const Pemasukan = db.pemasukan;
const Perumahan = db.perumahan;
const Warga = db.daftarWarga;
const QR = db.generateQr;

exports.addPemasukan = async (req, res) => {
    const dataFindQr = await QR.findOne({
        where: {
            reference_id: req.body.data.reference_id
        }
    });

    if (dataFindQr.list_bulan.length > 0) {
        dataFindQr.list_bulan.map((item, idx) => {
            const uuid = uuidv1();
            Warga.findOne({
                where: {
                    id_warga: dataFindQr.id_warga
                }
            }).then((warga) => {
                let dataSum = parseInt(req.body.data.amount) / parseInt(dataFindQr.list_bulan.length)
                let totalDana = parseInt(dataSum) - (parseInt(dataSum) * 0.007) - (parseInt(dataSum) * 0.015)

                Pemasukan.create({
                    id_transaksi: uuid,
                    id_warga: warga.id_warga,
                    nama_pembayar: warga.nama_warga,
                    nomor_rumah: warga.nomor_rumah,
                    tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
                    nilai_transaksi: totalDana,
                    bulan: item.nama
                })
                    .then(async (user) => {
                        const PerumahanData = await Perumahan.findOne({
                            where: {
                                id_perumahan: dataFindQr.id_perumahan
                            }
                        });

                        await Perumahan.update({
                            saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) + (parseInt(req.body.data.amount)),
                        }, { where: { id_perumahan: dataFindQr.id_perumahan } });



                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message });
                    });
            })

        })

        res.status(200).send({ message: "Pemasukan berhasil ditambah!." });
    }
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
                }, { where: { id_perumahan: dataFindQr.id_perumahan } });

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
}


exports.listPemasukanLaporan = (req, res) => {
    db.sequelize.query(
        "select tb_pemasukans.tanggal_transaksi,tb_pemasukans.id_transaksi,tb_pemasukans.id_warga, tb_pemasukans.nilai_transaksi ,tb_pemasukans.bulan , tb_pemasukans.nama_pembayar,tb_pemasukans.tanggal_transaksi from tb_pemasukans join tb_daftar_wargas on tb_pemasukans.id_warga = tb_daftar_wargas.id_warga where tb_daftar_wargas.id_perumahan = :id_perumahan ",
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: { id_perumahan: req.body.id_perumahan},
        }
    ).then(result => {
        let dataTemp = []
        
        result.map((item) => {
            const datku = dataTemp.find((i) => i.id_warga == item.id_warga)
            const index = dataTemp.findIndex((i) => i.id_warga === item.id_warga);
            const itemYear = new Date(item.tanggal_transaksi * 1000).getFullYear();
            if (itemYear != req.body.tahun) {
                return
            }

            if (datku) {
                dataTemp[index].data.push(item)
            } else {
                dataTemp.push({
                    id_transaksi: item.id_transaksi,
                    id_warga: item.id_warga,
                    nama_pembayar: item.nama_pembayar,
                    data: [item]
                })
            }
        })
        
        res.status(200).json({ message: "Berhasil Get Data Pemasukan.", data: dataTemp });
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