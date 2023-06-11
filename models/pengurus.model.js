module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("tb_pengurus", {
      id_pengurus: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      id_warga: {
        type: Sequelize.STRING
      },
      id_perumahan: {
        type: Sequelize.STRING
      },
    });
  
    return Role;
  };