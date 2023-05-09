module.exports = (sequelize, Sequelize) => {
    const Pengeluaran = sequelize.define("tb_pengeluaran", {
      id_transaksi: {
        type: Sequelize.STRING
      },
      nama_transaksi: {
        type: Sequelize.STRING
      },
      kategori_transaksi: {
        type: Sequelize.STRING
      },
      tanggal_transaksi: {
        type: Sequelize.STRING
      },
      nilai_transaksi: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      bukti_foto: {
        type: Sequelize.STRING
      }
    });
  
    return Pengeluaran;
  };