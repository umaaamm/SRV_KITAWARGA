module.exports = (sequelize, Sequelize) => {
    const Kasbon = sequelize.define("tb_kasbon", {
      id_transaksi: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      tanggal_transaksi: {
        type: Sequelize.STRING
      },
      nama_karyawan: {
        type: Sequelize.STRING
      },
      id_karyawan: {
        type: Sequelize.STRING
      },
      detail_transaksi: {
        type: Sequelize.STRING
      },
      pinjaman: {
        type: Sequelize.DECIMAL
      },
      angsuran: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.DECIMAL
      },
      keterangan: {
        type: Sequelize.STRING
      }
    });
  
    return Kasbon;
  };