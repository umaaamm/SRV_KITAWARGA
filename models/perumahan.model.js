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
    });
  
    return Role;
  };