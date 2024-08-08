module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("tb_perumahan", {
      id_perumahan: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nama_perumahan: {
        type: Sequelize.STRING
      },
      alamat_perumahan: {
        type: Sequelize.STRING
      },
      link_cctv:{
        type: Sequelize.STRING
      },
      link_img_qr:{
        type: Sequelize.STRING
      },
      saldo_perumahan:{
        type: Sequelize.DECIMAL
      },
      alamat_maps:{
        type: Sequelize.STRING
      },
      bank_code:{
        type: Sequelize.STRING
      },
      account_holder_name:{
        type: Sequelize.STRING
      },
      account_number:{
        type: Sequelize.STRING
      },
      status_account:{
        type: Sequelize.STRING
      },
      expired_sub:{
        type: Sequelize.DATE
      },
    });
  
    return Role;
  };