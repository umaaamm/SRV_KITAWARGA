module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define("tb_generate_invoice", {
      id_invoice: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      id: {
        type: Sequelize.STRING
      },
      external_id: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },   
      amount: {
        type: Sequelize.DECIMAL
      },
      user_id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      merchant_name: {
        type: Sequelize.STRING
      },
      merchant_profile_picture_url: {
        type: Sequelize.STRING
      },
      expiry_date: {
        type: Sequelize.STRING
      },
      invoice_url: {
        type: Sequelize.STRING
      },
      id_warga:{
        type: Sequelize.STRING
      },
      id_perumahan:{
        type: Sequelize.STRING
      },
      list_bulan:{
        type: Sequelize.JSON
      },
      isMultiMonth: {
        type: Sequelize.STRING
      },
      amountList: {
        type: Sequelize.DECIMAL
      },
      tahun:{
        type: Sequelize.STRING
      }
    });

    return Invoice;
  };