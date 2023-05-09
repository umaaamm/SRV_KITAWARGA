const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.pemasukan = require("../models/pemasukan.model.js")(sequelize, Sequelize);
db.pengeluaran = require("../models/pengeluaran.model.js")(sequelize, Sequelize);
db.kasbon = require("../models/kasbon.model.js")(sequelize, Sequelize);
db.kategori = require("../models/kategori.model.js")(sequelize, Sequelize);
db.manajemenKaryawan = require("../models/manajemenKaryawan.model.js")(sequelize, Sequelize);
db.daftarWarga = require("../models/daftarWarga.model.js")(sequelize, Sequelize);

module.exports = db;