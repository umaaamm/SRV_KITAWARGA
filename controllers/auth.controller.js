const db = require("../models");
const config = require("../config/auth.config");
const User = db.admin;
const Pengurus = db.pengurus;
const Warga = db.daftarWarga;
const PerumahanData = db.perumahan;
const { v1: uuidv1 } = require('uuid');

const transporter = require("../services/emailSent");
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const uuidPerumahan  = uuidv1();
  const uuidWarga  = uuidv1();
  const uuidPengurus  = uuidv1();

  await PerumahanData.create({
    id_perumahan: uuidPerumahan,
    nama_perumahan: req.body.nama_perumahan,
    alamat_perumahan: req.body.alamat_perumahan,
    saldo_perumahan: 0,
    link_cctv: "",
    link_img_qr: "",
    alamat_maps: "",
    bank_code: "",
    account_holder_name: "",
    account_number: ""
  })

  await Warga.create({
    id_warga: uuidWarga,
    nama_warga: req.body.nama,
    blok_rumah: req.body.blok_rumah,
    nomor_rumah: req.body.nomor_rumah,
    email: req.body.email,
    nomor_hp: req.body.nomor_hp,
    is_rw: false,
    is_rt: false,
    id_rt: "0710e340-9e4f-11ee-8c90-0242ac120002",
    id_rw: "e88288de-9e4e-11ee-8c90-0242ac120002",
    id_perumahan: uuidPerumahan,
    status_pernikahan: req.body.status_pernikahan,
    jenis_kelamin: req.body.jenis_kelamin,
    biaya_ipl: parseInt(req.body.biaya_ipl),
    password_warga: bcrypt.hashSync('perum123', 8),
  })

  await Pengurus.create({
    id_pengurus: uuidPengurus,
    id_warga: uuidWarga,
    id_perumahan: uuidPerumahan,
  })

  User.create({
    username_admin: req.body.nama.substring(0,3) + Math.floor(Math.random() * 101),
    email_admin: req.body.email,
    password_admin: bcrypt.hashSync('perum123', 8),
    no_hp_admin: req.body.nomor_hp,
    nama_admin: req.body.nama,
    role: '2c452346-3429-11ee-be56-0242ac120002',
    id_pengurus: uuidPengurus
  })
    .then(user => {

      var mailOptions = {
        from: 'reza@kitawarga.com',
        to: req.body.email,
        subject: 'Registrasi berhasil',
        html: '<p>Hallo,'+ req.body.nama+' Selamat Registrasi anda telah berhasil.</p><p><strong>Tim KitaWarga akan menghubungi anda segera.</strong></p><p>Terimakasih.</p>'
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).send({ message: error });
        } else {

          var mailOptionsKita = {
            from: 'reza@kitawarga.com',
            to: 'reza@kitawarga.com',
            subject: 'Registrasi berhasil',
            html: '<p>Hallo, Terdapat registrasi baru di KitaWarga,</p><p>Nama : '+req.body.nama+' </p><p>Nama Perumahan : '+req.body.nama_perumahan+' </p><p>No Hp : '+req.body.nomor_hp+' </p><p>Email : '+req.body.email+'</p><p>Silahkan di Follow up!</p>'
          };

          transporter.sendMail(mailOptionsKita, function(error, info){});

          res.status(200).send({ message: "User was registered successfully!" });
        }
      });

      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  User.findOne({
    where: {
      no_hp_admin: req.body.no_hp
    }
  })
    .then(async (user) => {
      if (!user) {
        const warga = await Warga.findOne({
          where: {
            nomor_hp: req.body.no_hp
          }
        });

        if (!warga) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          warga.password_warga
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        var token = jwt.sign({ id_warga: warga.id_warga, role: 'warga', nama: warga.nama_warga }, config.secret, {
          expiresIn: 3600 // 1 hours
        });

        res.status(200).send({
          id_warga: warga.id_warga,
          id_perumahan: warga.id_perumahan,
          nama_warga: warga.nama_warga,
          biaya_ipl: warga.biaya_ipl,
          role: 'warga',
          accessToken: token,
        });

        return;
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password_admin
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      Pengurus.findOne({
        where: {
          id_pengurus: user.id_pengurus
        }
      })
        .then(async (pengurus) =>  {

          var token = jwt.sign({ id: user.id, role: user.role, nama: user.nama_admin }, config.secret, {
            expiresIn: 3600 // 1 hours
          });

          const perumahanD = await PerumahanData.findOne({
            where: {
              id_perumahan: pengurus.id_perumahan
            }
          })

          const warga = await Warga.findOne({
            where: {
              id_warga: pengurus.id_warga
            }
          });

          res.status(200).send({
            id_pengurus: user.id_pengurus,
            id_perumahan: pengurus.id_perumahan,
            id_warga: pengurus.id_warga,
            username: user.username_admin,
            email: user.email_admin,
            role: user.role,
            accessToken: token,
            bank_code: perumahanD.bank_code,
            account_holder_name: perumahanD.account_holder_name,
            account_number: perumahanD.account_number,
            biaya_ipl: warga.biaya_ipl,
          });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updatePassword = (req, res) => {
  User.update({
    password_admin: bcrypt.hashSync(req.body.new_password, 8),
  }, { where: { no_hp_admin: req.body.no_hp_admin } })
    .then(user => {
      res.status(200).send({ message: "Berhasil diperbaharui password!." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.listAdmin = (req, res) => {
  db.sequelize.query(
    "SELECT * FROM tb_admins JOIN tb_pengurus ON tb_admins.id_pengurus = tb_pengurus.id_pengurus JOIN roles ON tb_admins.role = roles.id",
    {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(user => {
      res.status(200).json({ message: "Berhasil Get Data Admin.", data: result });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};