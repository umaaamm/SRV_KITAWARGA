const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://web.kitawarga.com","http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models");


db.manajemenKaryawan.hasMany(db.kasbon, {
  foreignKey: 'id_karyawan',
  as: 'karyawan',
  sourceKey: 'id_karyawan',
});
// db.kasbon.belongsTo(db.manajemenKaryawan, {
//   foreignKey: 'id_karyawan',
//   as: 'kasbon',
//   targetKey: 'id_karyawan',
// });


db.perumahan.hasMany(db.manajemenKaryawan, {
  foreignKey: 'id_perumahan',
  as: 'perumahan',
  sourceKey: 'id_perumahan',
});
db.manajemenKaryawan.belongsTo(db.perumahan, {
  foreignKey: 'id_perumahan',
  as: 'perumahan',
  targetKey: 'id_perumahan',
});


db.perumahan.hasMany(db.pengurus, {
  foreignKey: 'id_perumahan',
  as: 'pengurus',
  sourceKey: 'id_perumahan',
});
db.pengurus.belongsTo(db.perumahan, {
  foreignKey: 'id_perumahan',
  as: 'pengurus',
  targetKey: 'id_perumahan',
});


db.pengurus.belongsTo(db.daftarWarga, {
  foreignKey: 'id_warga',
  as: 'pengurus_warga',
  targetKey: 'id_warga',
});

db.daftarWarga.belongsTo(db.rt, {
  foreignKey: 'id_rt',
  as: 'rt',
  targetKey: 'id_rt',
});

db.daftarWarga.belongsTo(db.rw, {
  foreignKey: 'id_rw',
  as: 'rw',
  targetKey: 'id_rw',
});

db.rt.belongsTo(db.rw, {
  foreignKey: 'id_rw',
  as: 'rtrw',
  targetKey: 'id_rw',
});

db.kasbon.hasMany(db.pengeluaran, {
  foreignKey: 'id_kasbon',
  as: 'kasbon_pengeluaran',
  targetKey: 'id_kasbon',
});


db.kategori.hasMany(db.pengeluaran, {
  foreignKey: 'id_kategori',
  as: 'kategori_pengeluaran',
  targetKey: 'id_kategori',
});

db.perumahan.hasMany(db.pengeluaran, {
  foreignKey: 'id_perumahan',
  as: 'perumahan_pengeluaran',
  targetKey: 'id_perumahan',
});

db.daftarWarga.hasMany(db.pemasukan, {
  foreignKey: 'id_warga',
  as: 'pemasukan_warga',
  targetKey: 'id_warga',
});

db.admin.belongsTo(db.pengurus, {
  foreignKey: 'id_pengurus',
  as: 'admin_pengurus',
  targetKey: 'id_pengurus',
});

db.admin.belongsTo(db.role, {
  foreignKey: 'role',
  as: 'roles',
  targetKey: 'id',
});



// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: false}).then(() => {
// console.log('Drop and Resync Database with { force: true }');
// });

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to KitaWarga services, You will never understand, how this works. :)" });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/admin.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
