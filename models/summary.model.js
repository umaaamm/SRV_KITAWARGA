module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("tb_summary", {
      id_summary: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      total_saldo: {
        type: Sequelize.DECIMAL
      },
      total_pengeluaran: {
        type: Sequelize.DECIMAL
      },
      total_pemasukan: {
        type: Sequelize.DECIMAL
      },
      id_perumahan: {
        type: Sequelize.STRING
      },
      id_rt: {
        type: Sequelize.DECIMAL
      },
      id_rw: {
        type: Sequelize.DECIMAL
      },
    });
  
    return Role;
  };