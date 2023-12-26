const { default: axios } = require("axios");
const db = require("../models");
const axiosInstanceD = require("../services/axiosDisbursement");
const APIURL = require("../services/endpoint");
const Disbursement = db.disbursement;
const { v1: uuidv1 } = require('uuid');
const Perumahan = db.perumahan;

exports.generateDisbursement = async (req, res) => {
    const uuid = uuidv1();

    const requestData = {
        external_id: `externalId-` + Date.now(),
        bank_code: req.body.bank_code,
        account_holder_name: req.body.account_holder_name,
        account_number: req.body.account_number,
        description: req.body.description,
        amount: Number(req.body.amount),
    }

    const headers = {
        'for-user-id': req.body.id_perumahan,
    };

    const axiosConfig = {
        headers: headers
    };

    axiosInstanceD.post(APIURL.DisbursementUrl, requestData, axiosConfig).then((response) => {
        Disbursement.create({
            id_disbursement: uuid,
            external_id: response.external_id,
            bank_code: response.bank_code,
            account_holder_name: response.account_holder_name,
            account_number: req.body.account_number,
            description: response.disbursement_description,
            tanggal_disbursement: Math.floor(new Date().getTime() / 1000),
            id_warga: req.body.id_warga,
            amount: response.amount,
            id_perumahan: req.body.id_perumahan,
        }).then(async (qr) => {
            const PerumahanData = await Perumahan.findOne({
                where: {
                    id_perumahan: req.body.id_perumahan
                }
            });

            await Perumahan.update({
                saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) - (parseInt(response.amount)),
            }, { where: { id_perumahan: req.body.id_perumahan } });

            res.status(200).send({ message: "Disbursement berhasil digenerate!.", data: response });
        })
    }).catch((error) => {
        console.log('fdfmdfmdmfm', error);
        res.status(500).send({ message: error });
    });
};


exports.getBalance = async (req, res) => {
    const headers = {
        'for-user-id': req.body.id_perumahan,
    };

    const axiosConfig = {
        headers: headers
    };

    axiosInstanceD.get(APIURL.balance, axiosConfig).then((response) => {
        res.status(200).send({ message: "Balance berhasil diambil!.", data: response });
    }).catch((error) => {
        res.status(500).send({ message: error });
    });
};