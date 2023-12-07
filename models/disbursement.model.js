module.exports = (sequelize, Sequelize) => {
    const Kasbon = sequelize.define("tb_disbursement", {
      id_disbursement: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      external_id: {
        type: Sequelize.STRING
      },
      bank_code: {
        type: Sequelize.STRING
      },
      account_holder_name: {
        type: Sequelize.STRING
      },
      account_number: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      tanggal_disbursement: {
        type: Sequelize.STRING
      },
      id_warga:{
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      id_perumahan: {
        type: Sequelize.STRING
      }
    });
  
    return Kasbon;
  };