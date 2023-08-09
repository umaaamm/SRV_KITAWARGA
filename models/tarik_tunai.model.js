module.exports = (sequelize, Sequelize) => {
    const TarikTunai = sequelize.define("tb_tunai", {
      id_tarik_tunai: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      tanggal_tarik_tunai: {
        type: Sequelize.STRING
      },
      jumlah_tarik_tunai: {
        type: Sequelize.DECIMAL
      },   
      keterangan: {
        type: Sequelize.STRING
      },
      id_perumahan: {
        type: Sequelize.STRING
      }
    });
  
    return TarikTunai;
  };