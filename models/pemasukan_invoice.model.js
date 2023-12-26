module.exports = (sequelize, Sequelize) => {
    const Pemasukan = sequelize.define("tb_pemasukan_invoice", {
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
      },
      id: {
        type: Sequelize.STRING
      },
      external_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      is_high: {
        type: Sequelize.STRING
      },
      payment_method: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      merchant_name: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      paid_amount: {
        type: Sequelize.DECIMAL
      },
      bank_code: {
        type: Sequelize.STRING
      },
      paid_at: {
        type: Sequelize.STRING
      },
      payer_email: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      adjusted_received_amount: {
        type: Sequelize.DECIMAL
      },
      fees_paid_amount: {
        type: Sequelize.DECIMAL
      },
      updated: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      payment_channel: {
        type: Sequelize.STRING
      },
      payment_destination: {
        type: Sequelize.STRING
      },
      tahun:{
        type: Sequelize.STRING
      }
    });
  
    return Pemasukan;
  };