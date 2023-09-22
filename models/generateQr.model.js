module.exports = (sequelize, Sequelize) => {
    const Qr = sequelize.define("tb_generate_qr", {
      reference_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },   
      amount: {
        type: Sequelize.DECIMAL
      },
      channel_code: {
        type: Sequelize.STRING
      },
      expires_at: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      metadata: {
        type: Sequelize.STRING
      },
      business_id: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.STRING
      },
      updated: {
        type: Sequelize.STRING
      },
      qr_string: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      id_warga:{
        type: Sequelize.STRING
      },
      id_perumahan:{
        type: Sequelize.STRING
      },
    });
  
    return Qr;
  };