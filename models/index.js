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
    ssl: {
       rejectUnauthorized: true,
       ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUDD4M9eFFMuPvo5d/n6RKEFi6s0QwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvOWM4N2U0ZGYtMTE3MS00N2U3LTgyM2UtYmExMGNlMWVl
YTU4IFByb2plY3QgQ0EwHhcNMjMwODI4MDkxNjQ0WhcNMzMwODI1MDkxNjQ0WjA6
MTgwNgYDVQQDDC85Yzg3ZTRkZi0xMTcxLTQ3ZTctODIzZS1iYTEwY2UxZWVhNTgg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAK6T7HI0
MrAg8x3QxW+AAlap9sJ4KXRBq4xv5yxcfz50kRLnC9L42LPK6QgSNwfrDsZbLF/H
BvExeLhPrs6Ai/ROSVLyp5zpO4tNMd+2XKRSupo/lRzAtg8lvUgzg43ns7tgRtn9
esDnhcc8P96mWHXTE5RcdWf0NDkX10y/JcBYik1uo/UTnLqjfHouJSF3YNR+QjDz
8RyUsuOpho6nccUWIdrMTsaWGBYLXcAjqoLXK2N2TCgO1T+pMneyTZny3SRQ+zjU
uZn8UjFmEBZiSoSnrzUZWMe+gwoFrM57T02IDWeO73ZnbfZqnDfgnT/h70qTb7N6
FG9owUIpv5KG08cWXzxY19TL78ZB3uw9Nq8vIbqPfzX4fMbMMRoZycxuimVRDS12
4Z18jSfMzM3xPaxg2mqiH5ONflHT2nN3VRT4/yTIuEhf1I4bvCZR1Ebo/pXxYhay
e7p+sF7YB1LyQnmyzQpDtHIYcjNY0+vNw7F0u9Xq2fV63ZRDet6PEhRsAQIDAQAB
oz8wPTAdBgNVHQ4EFgQUIOdldelqammHY2llJ6gAh20kwmYwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHouZYpgji9pjimZ
sDGDAurTs920dBky0YsVFQ2wCCNTQlunMohnnZX937hVmDOQUzDul0uU34cI/q6u
Avn8qjIdjNpHHplQkhU8qPk1MY9G7aP2bTkcnSbRrBP/z3+Aptwqe69uDhrybgCa
J2FCEb72u5bMj5eDEJA+lV6QPiLGM6mUrDh27gMXgZ6h+zTyiap1k06V+O/KTo73
cqarc2jzZwgE6NrSLkp6c8ID0tHxHDej5mk/eQXsAl0JEOt804hFuEth5IIHL9Ss
1/qHc9m2ypIsF3rZ03hhSMXGeRwU5hMekq/s9O/BxQ5cAJZqnohlJM+i5sZSYg+3
X1t5epk/Ox/1+HJOPIfFMrN7YUl2RT6bG6XfQB8aTc0upQzm9Ur0TR69Kki4FFTQ
d+rz5SwsrcSJhqg2yUL/n1RI5OwwZNrSFTVHwWa8aZ5v+aR+jGi2wo0SsCagZkyT
Awy8z/28pMhpOtPlOMmpQY7QeJI55iUxJaXfY7izQsYvVwyFMg==
-----END CERTIFICATE-----
`,
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


module.exports = db;
