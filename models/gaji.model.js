module.exports = (sequelize, Sequelize) => {
    const Gaji = sequelize.define("tb_gaji", {
      id_gaji: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      tanggal_gaji: {
        type: Sequelize.STRING
      },
      id_karyawan: {
        type: Sequelize.STRING
      },   
      jumlah_gaji: {
        type: Sequelize.DECIMAL
      },
      id_perumahan: {
        type: Sequelize.STRING
      }
     
    });
  
    return Gaji;
  };