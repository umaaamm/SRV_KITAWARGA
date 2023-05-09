module.exports = (sequelize, Sequelize) => {
    const Kategori = sequelize.define("tb_ketegori", {
      id_kategori: {
        type: Sequelize.STRING
      },
      nama_kategori_transaksi: {
        type: Sequelize.STRING
      },
      keterangan_kategori_transaksi: {
        type: Sequelize.STRING
      }
    });
  
    return Kategori;
  };