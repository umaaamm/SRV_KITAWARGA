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
      biaya_ipl:{
        type: Sequelize.DECIMAL
      },
      link_cctv:{
        type: Sequelize.STRING
      },
      link_img_qr:{
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };