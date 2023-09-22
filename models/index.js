const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    port: 25060,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
     },
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
db.pengurus = require("../models/pengurus.model.js")(sequelize, Sequelize);
db.perumahan = require("../models/perumahan.model.js")(sequelize, Sequelize);
db.rt = require("../models/rt.model.js")(sequelize, Sequelize);
db.rw = require("../models/rw.model.js")(sequelize, Sequelize);
db.summary = require("../models/summary.model.js")(sequelize, Sequelize);
db.gaji = require("../models/gaji.model.js")(sequelize, Sequelize);
db.pengeluaran_bulanan = require("../models/pengeluaran_bulanan.model.js")(sequelize, Sequelize);
db.tarik_tunai = require("../models/tarik_tunai.model.js")(sequelize, Sequelize);
db.generateQr = require("../models/generateQr.model.js")(sequelize, Sequelize);


module.exports = db;
