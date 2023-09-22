const { default: axios } = require("axios");
const db = require("../models");
const axiosInstance = require("../services/axios");
const APIURL = require("../services/endpoint");
const Generate = db.generateQr;
const Warga = db.daftarWarga;

exports.generateQR = async (req, res) => {
    let expiryDate = new Date(new Date().setHours(new Date().getHours() + 1));

    const wargaData = await Warga.findOne({
        where: {
            id_warga: req.body.id_warga
        }
    })

    const requestData = {
        reference_id: `order-id-` + Date.now(),
        type: "DYNAMIC",
        currency: "IDR",
        amount: Number(wargaData.biaya_ipl),
        expires_at: expiryDate
    }

    const headers = {
        'for-user-id': req.body.id_perumahan,
      };

    const axiosConfig = {
        headers: headers
      };

    axiosInstance.post(APIURL.GenerateQr, requestData, axiosConfig ).then((response) => {
        Generate.create({
            reference_id: response.reference_id,
            type: response.type,
            currency: response.currency,
            amount: response.amount,
            channel_code: response.channel_code,
            expires_at: response.expires_at,
            description: response.description,
            metadata: response.metadata,
            business_id: response.business_id,
            id: response.id,
            created: response.created,
            updated: response.updated,
            qr_string: response.qr_string,
            status: response.status,
            id_warga: wargaData.id_warga,
            id_perumahan: wargaData.id_perumahan,
        }).then((qr) => {
            res.status(200).send({ message: "Qr berhasil digenerate!.", data: response });
        })
    }).catch((error) => {
        res.status(500).send({ message: error });
    });
};