module.exports = (sequelize, Sequelize) => {
    const DaftarWarga = sequelize.define("tb_daftar_warga", {
      id_warga: {
        type: Sequelize.STRING
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
      }
    });
  
    return DaftarWarga;
  };