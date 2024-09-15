const { default: axios } = require("axios");
const db = require("../models");
const axiosInstance = require("../services/axios");
const APIURL = require("../services/endpoint");
const Invoice = db.Invoice;
const Warga = db.daftarWarga;
const { v1: uuidv1 } = require('uuid');
var admin = require("firebase-admin");

const inv = db.Invoice;
const PemasukanInv = db.pemasukanInvoice;
const Perumahan = db.perumahan;

exports.getListBulan = async (req, res) => {

    const data = [
        { nama: "Januari", value: false },
        { nama: "Februari", value: false },
        { nama: "Maret", value: false },
        { nama: "April", value: false },
        { nama: "Mei", value: false },
        { nama: "Juni", value: false },
        { nama: "Juli", value: false },
        { nama: "Agustus", value: false },
        { nama: "September", value: false },
        { nama: "Oktober", value: false },
        { nama: "November", value: false },
        { nama: "December", value: false },
    ];

    db.sequelize.query(
        "select * from tb_pemasukan_invoices where tb_pemasukan_invoices.id_warga = :id_warga and tb_pemasukan_invoices.tahun = :tahun ",
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: { id_warga: req.body.id_warga, tahun: req.body.tahun },

        }
    ).then(result => {
        let tempData = [];

        data.map((item) => {
            if (!result.some((testItem) => testItem.bulan === item.nama)) {
                tempData.push(item);
            }
        });


        res.status(200).json({ message: "Berhasil Get Data Bulan.", data: tempData });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}


exports.generateInv = async (req, res) => {
    let expiryDate = new Date(new Date().setHours(new Date().getHours() + 1));
    const uuid = uuidv1();

    const wargaData = await Warga.findOne({
        where: {
            id_warga: req.body.id_warga
        }
    })

    const requestData = {
        external_id: `invoice-` + Date.now(),
        payer_email: req.body.email,
        description: req.body.description,
        amount: Number(wargaData.biaya_ipl) * req.body.list_bulan.length,
    }

    const headers = {
        'for-user-id': req.body.id_perumahan,
    };

    const axiosConfig = {
        headers: headers
    };

    const verifyfcmtoken = (fcmtoken) => {
        return admin.messaging().send({
            token: fcmtoken
        }, true)
    }

    axiosInstance.post(APIURL.InvoiceUrl, requestData, axiosConfig).then((response) => {
        Invoice.create({
            id_invoice: uuid,
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            external_id: response.external_id,
            user_id: response.user_id,
            description: response.description,
            status: response.status,
            merchant_name: response.merchant_name,
            merchant_profile_picture_url: response.merchant_profile_picture_url,
            expiry_date: response.expiry_date,
            invoice_url: response.invoice_url,
            id_warga: wargaData.id_warga,
            id_perumahan: wargaData.id_perumahan,
            list_bulan: req.body.list_bulan,
            isMultiMonth: req.body.isMultiMonth,
            tahun: req.body.tahun,
            amountList: Number(wargaData.biaya_ipl) * req.body.list_bulan.length,
            type_payment: req.body.type_payment
        }).then(async (qr) => {

            if (req.body.type_payment == "2") {
                const dataFindInv = await inv.findOne({
                    where: {
                        id: response.id
                    }
                });
                const verifyfcmtoken = (fcmtoken) => {
                    return admin.messaging().send({
                        token: fcmtoken
                    }, true)
                }

                if (dataFindInv.list_bulan.length > 0) {
                    dataFindInv.list_bulan.map((item, idx) => {
                        const uuidTrx = uuidv1();
                        Warga.findOne({
                            where: {
                                id_warga: dataFindInv.id_warga
                            }
                        }).then(async (warga) => {
                            let dataSum = parseInt(response.amount) / parseInt(dataFindInv.list_bulan.length)
                            let totalDana = parseInt(dataSum) - (parseInt(dataSum) * 0.007) - (parseInt(dataSum) * 0.015)

                            await PemasukanInv.create({
                                id_transaksi: uuidTrx,
                                id_warga: warga.id_warga,
                                nama_pembayar: warga.nama_warga,
                                nomor_rumah: warga.nomor_rumah,
                                tanggal_transaksi: Math.floor(new Date().getTime() / 1000),
                                nilai_transaksi: totalDana,
                                bulan: item.nama,
                                external_id: response.external_id,
                                user_id: response.user_id,
                                is_high: 'false',
                                payment_method: 'CASH',
                                status: 'PAID',
                                merchant_name: 'KitaWarga',
                                amount: totalDana,
                                paid_amount: totalDana,
                                bank_code: 'CASH',
                                paid_at: Math.floor(new Date().getTime() / 1000),
                                payer_email: 'admin@kitawarga.com',
                                description: 'Pembayaran CASH',
                                adjusted_received_amount: 0,
                                fees_paid_amount: 0,
                                updated: Math.floor(new Date().getTime() / 1000),
                                created: Math.floor(new Date().getTime() / 1000),
                                currency: 'IDR',
                                payment_channel: 'CASH',
                                payment_destination: 'CASH',
                                id: response.id,
                                tahun: dataFindInv.tahun,
                            });

                            const PerumahanData = await Perumahan.findOne({
                                where: {
                                    id_perumahan: dataFindInv.id_perumahan
                                }
                            });

                            await Perumahan.update({
                                saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) + (parseInt(totalDana)),
                            }, { where: { id_perumahan: dataFindInv.id_perumahan } });
                        })

                    });

                    const dataWarga = await Warga.findOne({
                        where: {
                            id_warga: dataFindInv.id_warga
                        }
                    });

                    if (dataWarga.fcm_token) {
                        verifyfcmtoken(dataWarga.fcm_token)
                            .then(async (result) => {
                                const messaging = admin.messaging()
                                var payload = {
                                    notification: {
                                        title: "Pembayaran",
                                        body: "Pembayaran iuran atau IPL Anda berhasil."
                                    },
                                    token: dataWarga.fcm_token || "",
                                };

                                await messaging.send(payload)
                            })
                            .catch(err => {
                                console.log('log Pemasukan INV', err);
                            })
                    }

                    // res.status(200).send({ message: "Pemasukan berhasil ditambah!." });
                }

            }

            if (wargaData.fcm_token && req.body.type_payment != "2") {
                verifyfcmtoken(wargaData.fcm_token)
                    .then(async (result) => {
                        const messaging = admin.messaging()
                        var payload = {
                            notification: {
                                title: "Pembayaran",
                                body: "Silakan lanjutkan pembayaran iuran atau IPL Anda."
                            },
                            token: wargaData.fcm_token || "",
                        };

                        await messaging.send(payload)
                    })
                    .catch(err => {
                        console.log('log generate INV', err);
                    })
            }

            const newReponse = {
            type_payment: req.body.type_payment,
            ...response
            }

            res.status(200).send({ message: "Invoice berhasil digenerate!.", data: newReponse });

        })
    }).catch((error) => {
        console.log('fdfmdfmdmfm', error);
        res.status(500).send({ message: error });
    });
};