module.exports = (sequelize, Sequelize) => {
    const ManajemenKaryawan = sequelize.define("tb_manajemen_karyawan", {
      id_karyawan: {
        type: Sequelize.STRING
      },
      nama_karyawan: {
        type: Sequelize.STRING
      },
      posisi: {
        type: Sequelize.STRING
      },
      sisa_kasbon: {
        type: Sequelize.STRING
      }
    });
  
    return ManajemenKaryawan;
  };