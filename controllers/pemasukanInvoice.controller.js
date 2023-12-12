const { v1: uuidv1 } = require('uuid');
const db = require("../models");
const Pemasukan = db.pemasukan;
const Perumahan = db.perumahan;
const Warga = db.daftarWarga;
const inv = db.Invoice;
const PemasukanInv= db.pemasukanInvoice;

exports.addPemasukanInv = async (req, res) => {


    console.log('fddfdfsdfsdfsdf', req);

    const dataFindInv = await inv.findOne({
        where: {
            id: req.body.id
        }
    });

    if (dataFindInv.list_bulan.length > 0) {
        dataFindInv.list_bulan.map((item, idx) => {
            const uuid = uuidv1();
            Warga.findOne({
                where: {
                    id_warga: dataFindInv.id_warga
                }
            }).then((warga) => {
                let dataSum = parseInt(req.body.amount) / parseInt(dataFindInv.list_bulan.length)
                let totalDana = parseInt(dataSum) - (parseInt(dataSum) * 0.007) - (parseInt(dataSum) * 0.015)


                console.log('fddfdfsdfsdfsdfaaaaaaa', warga);


                PemasukanInv.create({
                    id_transaksi: uuid,
                    id_warga: warga.id_warga,
                    nama_pembayar: warga.nama_warga,
                    nomor_rumah: warga.nomor_rumah,
                    tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
                    nilai_transaksi: totalDana,
                    bulan: item.nama,
                    external_id: req.body.external_id,
                    user_id: req.body.user_id,
                    is_high: req.body.is_high,
                    payment_method: req.body.payment_method,
                    status: req.body.status,
                    merchant_name: req.body.merchant_name,
                    amount: req.body.amount,
                    paid_amount: req.body.paid_amount,
                    bank_code: req.body.bank_code,
                    paid_at: req.body.paid_at,
                    payer_email: req.body.payer_email,
                    description: req.body.description,
                    adjusted_received_amount: req.body.adjusted_received_amount,
                    fees_paid_amount: req.body.fees_paid_amount,
                    updated: req.body.updated,
                    created: req.body.updated,
                    currency: 'IDR',
                    payment_channel: req.body.payment_method,
                    payment_destination: req.body.payment_destination,
                    id:req.body.id
                })
                    .then(async (user) => {
                        const PerumahanData = await Perumahan.findOne({
                            where: {
                                id_perumahan: dataFindInv.id_perumahan
                            }
                        });

                        await Perumahan.update({
                            saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) + (parseInt(req.body.amount)),
                        }, { where: { id_perumahan: dataFindInv.id_perumahan } });
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message });
                    });
            })

        })

        res.status(200).send({ message: "Pemasukan berhasil ditambah!." });
    }
};


exports.listPemasukanInv = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_pemasukan_invoices ORDER BY tb_pemasukan_invoices.tanggal_transaksi DESC",
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


exports.listPemasukanLaporanInv = (req, res) => {

    let query='';

    if (req.body.id_warga == '') {
        query ="select * from tb_pemasukan_invoices join tb_daftar_wargas on tb_pemasukan_invoices.id_warga = tb_daftar_wargas.id_warga where tb_daftar_wargas.id_perumahan = :id_perumahan "
    }else{
        query ="select * from tb_pemasukan_invoices join tb_daftar_wargas on tb_pemasukan_invoices.id_warga = tb_daftar_wargas.id_warga where tb_daftar_wargas.id_perumahan = :id_perumahan AND tb_daftar_wargas.id_warga = :id_warga "
    }

    db.sequelize.query(
        query,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: { id_perumahan: req.body.id_perumahan, id_warga: req.body.id_warga},
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

exports.listPemasukanWargaInv = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_pemasukan_invoices JOIN tb_daftar_wargas on tb_pemasukan_invoices.id_warga = tb_daftar_wargas.id_warga where tb_pemasukan_invoices.id_warga = :id_warga AND tb_daftar_wargas.id_perumahan = :id_perumahan ORDER BY tb_pemasukan_invoices.tanggal_transaksi DESC",
        {
            replacements: { id_warga: req.body.id_warga, id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Pemasukan.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};