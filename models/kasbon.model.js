module.exports = (sequelize, Sequelize) => {
    const Kasbon = sequelize.define("tb_kasbon", {
      id_transaksi: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
      },
      angsuran: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      }
    });
  
    return Kasbon;
  };