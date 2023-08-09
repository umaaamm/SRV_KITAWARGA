module.exports = (sequelize, Sequelize) => {
    const Pengeluaran_bulanan = sequelize.define("tb_pengeluaran_bulanan", {
      id_pengeluaran_bulanan: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nama_transaksi_pengeluaran_bulanan: {
        type: Sequelize.STRING
      },
      id_kategori: {
        type: Sequelize.STRING
      },
      kategori_transaksi: {
        type: Sequelize.STRING
      },
      tanggal_transaksi_pengeluaran_bulanan: {
        type: Sequelize.STRING
      },
      nilai_transaksi_pengeluaran_bulanan: {
        type: Sequelize.DECIMAL
      },
      keterangan_pengeluaran_bulanan: {
        type: Sequelize.STRING
      },
      bukti_foto_pengeluaran_bulanan: {
        type: Sequelize.STRING
      },
      id_perumahan:{
        type: Sequelize.STRING
      },
    });
  
    return Pengeluaran_bulanan;
  };