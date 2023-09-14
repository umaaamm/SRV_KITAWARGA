const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const https = require("https");

var corsOptions = {
  origin: ["http://web.kitawarga.com", "http://localhost:3000"]
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

//tidak dipake
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

db.gaji.belongsTo(db.manajemenKaryawan, {
  foreignKey: 'id_karyawan',
  as: 'gaji_karyawan',
  targetKey: 'id_karyawan',
})


db.gaji.belongsTo(db.perumahan, {
  foreignKey: 'id_perumahan',
  as: 'gaji_id_perumahan',
  targetKey: 'id_perumahan',
})



db.tarik_tunai.belongsTo(db.perumahan, {
  foreignKey: 'id_perumahan',
  as: 'gaji_id_perumahan',
  targetKey: 'id_perumahan',
})

db.pengeluaran_bulanan.belongsTo(db.perumahan, {
  foreignKey: 'id_perumahan',
  as: 'gaji_id_perumahan',
  targetKey: 'id_perumahan',
})

db.pengeluaran_bulanan.belongsTo(db.kategori, {
  foreignKey: 'id_kategori',
  as: 'gaji_id_kategori',
  targetKey: 'id_kategori',
})


/**

db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
console.log('Drop and Resync Database with { force: true }');

db.role.create({
  id: '2c452346-3429-11ee-be56-0242ac120002',
  name: 'Admin',
  kode_role: '2c452346-3429-11ee-be56-0242ac120002',
});

db.perumahan.create({
  id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002',
  nama_perumahan: 'Perum Sedder',
  alamat_perumahan: 'Alamat Seeder',
  saldo_perumahan: '100000',
  link_cctv: 'link seeder',
  link_img_qr: 'link seeder',
  alamat_maps: 'alamat seeder'
})

db.rw.create({
  id_rw: '381a8afe-3428-11ee-be56-0242ac120002',
  nomor_rw: '02',
  id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002',
})

db.rt.create({
  id_rt: '8c398a4a-3428-11ee-be56-0242ac120002',
  nomor_rt: '05',
  id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002',
  id_rw: '381a8afe-3428-11ee-be56-0242ac120002'
})

db.daftarWarga.create({
  id_warga: '956d1ad0-0946-11ee-be56-0242ac120002',
  nama_warga: 'Sedder Name',
  blok_rumah: 'V',
  nomor_rumah: '02',
  email: 'umam.tekno@gmail.com',
  nomor_hp: '081290766692',
  is_rw: false,
  is_rt: true,
  id_rt: '8c398a4a-3428-11ee-be56-0242ac120002',
  id_rw: '381a8afe-3428-11ee-be56-0242ac120002',
  id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002',
  status_pernikahan: 'Lajang',
  jenis_kelamin:'Laki-Laki',
  biaya_ipl: '100000'
})

db.pengurus.create({
  id_pengurus: '51c4bf36-0946-11ee-be56-0242ac120002',
  id_warga: '956d1ad0-0946-11ee-be56-0242ac120002',
  id_perumahan: '4872a5d0-3428-11ee-be56-0242ac120002',
})

db.admin.create({
  username_admin: 'admin',
    email_admin: 'admin@gmail.com',
    password_admin: bcrypt.hashSync('admin', 8),
    no_hp_admin: '081290766692',
    nama_admin: 'Admin Seeder',
    role: '2c452346-3429-11ee-be56-0242ac120002',
    id_pengurus: '51c4bf36-0946-11ee-be56-0242ac120002'
})

 });

  */

// db.sequelize.sync({ alter: true }).then(() => {
//   console.log('alter and Resync Database with { alter: true }');
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to KitaWarga services, You will never understand, how this works. :)" });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/admin.routes')(app);

const options = {
  key: fs.readFileSync("certs/kitawarga.com.key"),                  //Change Private Key Path here
  cert: fs.readFileSync("certs/sectigo_kitawarga.com_crt.crt"),            //Change Main Certificate Path here
  ca: fs.readFileSync('certs/sectigo_kitawarga.com_intermediate.crt.crt'),             //Change Intermediate Certificate Path here
  };

// set port, listen for requests
const PORT = process.env.PORT || 3000;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
