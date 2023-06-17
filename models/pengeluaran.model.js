module.exports = (sequelize, Sequelize) => {
    const Pengeluaran = sequelize.define("tb_pengeluaran", {
      id_transaksi: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nama_transaksi: {
        type: Sequelize.STRING
      },
      id_kategori: {
        type: Sequelize.STRING
      },
      id_kasbon: {
        type: Sequelize.STRING
      },
      kategori_transaksi: {
        type: Sequelize.STRING
      },
      tanggal_transaksi: {
        type: Sequelize.STRING
      },
      nilai_transaksi: {
        type: Sequelize.DECIMAL
      },
      keterangan: {
        type: Sequelize.STRING
      },
      bukti_foto: {
        type: Sequelize.STRING
      },
      id_perumahan:{
        type: Sequelize.STRING
      }
    });
  
    return Pengeluaran;
  };