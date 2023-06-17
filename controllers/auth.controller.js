const db = require("../models");
const config = require("../config/auth.config");
const User = db.admin;
const Pengurus = db.pengurus;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    username_admin: req.body.username_admin,
    email_admin: req.body.email_admin,
    password_admin: bcrypt.hashSync(req.body.password_admin, 8),
    no_hp_admin: req.body.no_hp_admin,
    nama_admin: req.body.nama_admin,
    role: req.body.role,
    id_pengurus: req.body.id_pengurus
  })
    .then(user => {
      res.status(200).send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email_admin: req.body.email_admin
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password_admin,
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
        .then(pengurus => {

          var token = jwt.sign({ id: user.id, role: user.role, nama: user.nama_admin }, config.secret, {
            expiresIn: 3600 // 1 hours
          });
          
          res.status(200).send({
            id_pengurus: user.id_pengurus,
            id_perumahan: pengurus.id_perumahan,
            id_warga: pengurus.id_warga,
            username: user.username_admin,
            email: user.email_admin,
            role: user.role,
            accessToken: token,
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
  }, { where: { username_admin: req.body.username_admin } })
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