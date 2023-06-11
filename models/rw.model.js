module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("tb_rw", {
      id_rw: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nomor_rw: {
        type: Sequelize.STRING
      },
      id_perumahan: {
        type: Sequelize.STRING
      },
    });
  
    return Role;
  };