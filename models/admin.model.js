module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("tb_admin", {
    username_admin: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    nama_admin: {
      type: Sequelize.STRING
    },
    email_admin: {
      type: Sequelize.STRING
    },
    password_admin: {
      type: Sequelize.STRING
    },
    no_hp_admin: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    id_pengurus:{
      type: Sequelize.STRING
    },
    is_verif: {
      type: Sequelize.BOOLEAN
    }
  });

  return Admin;
};