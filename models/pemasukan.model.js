module.exports = (sequelize, Sequelize) => {
    const Pemasukan = sequelize.define("tb_pemasukan", {
      id_transaksi: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      id_warga: {
        type: Sequelize.STRING
      },
      nama_pembayar: {
        type: Sequelize.STRING
      },
      nomor_rumah: {
        type: Sequelize.STRING
      },
      tanggal_transaksi: {
        type: Sequelize.STRING
      },
      nilai_transaksi: {
        type: Sequelize.DECIMAL
      },
      bulan: {
        type: Sequelize.STRING
      }
    });
  
    return Pemasukan;
  };