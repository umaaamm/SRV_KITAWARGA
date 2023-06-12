const db = require("../models");
const config = require("../config/auth.config");
const User = db.admin;
const Role = db.role;

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

      var token = jwt.sign({ id: user.id, role: user.role, nama: user.nama_admin }, config.secret, {
        expiresIn: 3600 // 1 hours
      });

      var authorities = [];

      res.status(200).send({
        id: user.id,
        username: user.username_admin,
        email: user.email_admin,
        role: user.role,
        accessToken: token,
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};