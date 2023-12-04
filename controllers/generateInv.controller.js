const { default: axios } = require("axios");
const db = require("../models");
const axiosInstance = require("../services/axios");
const APIURL = require("../services/endpoint");
const Invoice = db.Invoice;
const Warga = db.daftarWarga;
const { v1: uuidv1 } = require('uuid');

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

    axiosInstance.post(APIURL.InvoiceUrl, requestData, axiosConfig ).then((response) => {
       console.log('fmkdfmkd', response);
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
            amountList: Number(wargaData.biaya_ipl) * req.body.list_bulan.length,
        }).then((qr) => {
            res.status(200).send({ message: "Invoice berhasil digenerate!.", data: response });
        })
    }).catch((error) => {
        console.log('fdfmdfmdmfm', error);
        res.status(500).send({ message: error });
    });
};