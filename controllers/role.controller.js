const db = require("../models");
const Role = db.role;

exports.addRole = (req, res) => {
    Role.create({
        id: req.body.kode_role,
        name: req.body.name,
        kode_role: req.body.kode_role,
    })
        .then(user => {
            res.status(200).send({ message: "Role berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteRole = (req, res) => {
    Role.destroy({
        where: {
            kode_role: req.body.kode_role
        }
    }).then(user => {
        res.status(200).send({ message: "Role berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateRole = (req, res) => {
    Role.update({
        id: req.body.kode_role,
        name: req.body.name,
        kode_role: req.body.kode_role,
    }, { where: { kode_role: req.body.kode_role } })
        .then(user => {
            res.status(200).send({ message: "Role berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.listRole = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM roles",
        {
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Role.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};