module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("tb_rt", {
      id_rt: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      id_rw: {
        type: Sequelize.STRING,
      },
      nomor_rt: {
        type: Sequelize.STRING
      },
      id_perumahan: {
        type: Sequelize.STRING
      },
    });
  
    return Role;
  };