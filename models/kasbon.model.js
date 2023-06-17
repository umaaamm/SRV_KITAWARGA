module.exports = (sequelize, Sequelize) => {
    const Kasbon = sequelize.define("tb_kasbon", {
      id_kasbon: {
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
      tenor: {
        type: Sequelize.STRING
      },
      angsuran_per_bulan: {
        type: Sequelize.DECIMAL
      },
      keterangan: {
        type: Sequelize.STRING
      }
    });
  
    return Kasbon;
  };