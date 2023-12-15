module.exports = (sequelize, Sequelize) => {
  const DisWebhook = sequelize.define("tb_disbursement_webhook", {
    id_disbursement_webhook: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    id:{
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.STRING
    },
    external_id: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.DECIMAL
    },
    bank_code: {
      type: Sequelize.STRING
    },
    account_holder_name: {
      type: Sequelize.STRING
    },
    disbursement_description: {
      type: Sequelize.STRING
    },
    failure_code: {
      type: Sequelize.STRING
    },
    is_instant: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    updated: {
      type: Sequelize.STRING
    },
    created: {
      type: Sequelize.STRING
    },
    email_to: {
      type: Sequelize.JSON
    },
    email_cc: {
      type: Sequelize.JSON
    },
    email_bcc: {
      type: Sequelize.JSON
    },
    id_warga: {
      type: Sequelize.STRING
    },
    id_perumahan: {
      type: Sequelize.STRING
    },
  });

  return DisWebhook;
};