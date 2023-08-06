module.exports = (sequelize, Sequelize) => {
  const ManajemenKaryawan = sequelize.define("tb_manajemen_karyawan", {
    id_karyawan: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    nama_karyawan: {
      type: Sequelize.STRING
    },
    posisi: {
      type: Sequelize.STRING
    },
    sisa_kasbon: {
      type: Sequelize.DECIMAL
    },
    id_perumahan: {
      type: Sequelize.STRING
    },
    gaji_bulanan:{
      type: Sequelize.DECIMAL
    }
  });

  return ManajemenKaryawan;
};