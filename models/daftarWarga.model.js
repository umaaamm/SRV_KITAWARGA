module.exports = (sequelize, Sequelize) => {
    const DaftarWarga = sequelize.define("tb_daftar_warga", {
      id_warga: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nama_warga: {
        type: Sequelize.STRING
      },
      blok_rumah: {
        type: Sequelize.STRING
      },
      nomor_rumah: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      nomor_hp: {
        type: Sequelize.STRING
      },
      is_rw: {
        type: Sequelize.BOOLEAN
      },
      is_rt: {
        type: Sequelize.BOOLEAN
      },
      id_rw: {
        type: Sequelize.STRING
      },
      id_rt: {
        type: Sequelize.STRING
      },
      id_perumahan: {
        type: Sequelize.STRING
      },
      status_pernikahan: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      biaya_ipl:{
        type: Sequelize.DECIMAL
      },
      password_warga:{
        type: Sequelize.STRING
      },
      fcm_token: {
        type: Sequelize.STRING
      }
    });
  
    return DaftarWarga;
  };