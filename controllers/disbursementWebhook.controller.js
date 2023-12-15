const { v1: uuidv1 } = require('uuid');
const db = require("../models");
const inv = db.disbursement;
const DisWebhook = db.disbursementWebhook;

exports.addWebhookDisbursement = async (req, res) => {
    const uuid = uuidv1();
    inv.findOne({
        where: {
            external_id: req.body.external_id
        }
    }).then((data) => {

        DisWebhook.create({
            id_disbursement_webhook: uuid,
            id: req.body.id,
            user_id: req.body.user_id,
            external_id: req.body.external_id,
            amount: req.body.amount,
            bank_code: req.body.bank_code,
            account_holder_name: req.body.account_holder_name,
            disbursement_description: req.body.disbursement_description,
            failure_code: req.body.failure_code,
            is_instant: req.body.is_instant,
            status: req.body.status,
            updated: req.body.updated,
            created: req.body.created,
            email_to: req.body.email_to,
            email_cc: req.body.email_cc,
            email_bcc: req.body.email_bcc,
            id_warga: data.id_warga,
            id_perumahan: data.id_perumahan
        })

        res.status(200).send({ message: "Disbursement berhasil ditambah!." });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });

};


exports.listDisbursementWebHook = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_disbursement_webhooks ORDER BY tb_disbursement_webhooks.created DESC",
        {
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Disbursement.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}