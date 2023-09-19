const db = require("../models");
const Warga = db.daftarWarga;

exports.addWarga = (req, res) => {
    Warga.create({
        id_warga: req.body.id_warga,
        nama_warga: req.body.nama_warga,
        blok_rumah: req.body.blok_rumah,
        nomor_rumah: req.body.nomor_rumah,
        email: req.body.email,
        nomor_hp: req.body.nomor_hp,
        is_rw: req.body.is_rw,
        is_rt: req.body.is_rt,
        id_rt: req.body.id_rt,
        id_rw: req.body.id_rw,
        id_perumahan: req.body.id_perumahan,
        status_pernikahan: req.body.status_pernikahan,
        jenis_kelamin: req.body.jenis_kelamin,
        biaya_ipl: parseInt(req.body.biaya_ipl) + parseInt(req.body.nomor_hp.slice(-3))
    })
        .then(user => {
            res.status(200).send({ message: "Warga berhasil ditambah!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteWarga = (req, res) => {
    Warga.destroy({
        where: {
            id_warga: req.body.id_warga
        }
    }).then(user => {
        res.status(200).send({ message: "Warga berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateWarga = (req, res) => {
    Warga.update({
        id_warga: req.body.id_warga,
        nama_warga: req.body.nama_warga,
        blok_rumah: req.body.blok_rumah,
        nomor_rumah: req.body.nomor_rumah,
        email: req.body.email,
        nomor_hp: req.body.nomor_hp,
        is_rw: req.body.is_rw,
        is_rt: req.body.is_rt,
        id_rt: req.body.id_rt,
        id_rw: req.body.id_rw,
        id_perumahan: req.body.id_perumahan,
        status_pernikahan: req.body.status_pernikahan,
        jenis_kelamin: req.body.jenis_kelamin,
        biaya_ipl: req.body.biaya_ipl
    }, { where: { id_warga: req.body.id_warga } })
        .then(user => {
            res.status(200).send({ message: "Warga berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.listWarga = (req, res) => {

    // SELECT * FROM tb_daftar_wargas JOIN tb_perumahans ON tb_daftar_wargas.id_perumahan = tb_perumahans.id_perumahan JOIN tb_rts ON tb_daftar_wargas.id_rt = tb_rts.id_rt JOIN tb_rws ON tb_daftar_wargas.id_rw = tb_rws.id_rw

    //** 1. ASC, 2. DESC, 3. Searching */

    let query = '';
    if (req.body.param == 1) {
        query = "SELECT * FROM tb_daftar_wargas JOIN tb_perumahans ON tb_daftar_wargas.id_perumahan = tb_perumahans.id_perumahan WHERE tb_daftar_wargas.id_perumahan = :id_perumahan ORDER BY tb_daftar_wargas.nama_warga ASC";
    }
    if (req.body.param == 2) {
        query = "SELECT * FROM tb_daftar_wargas JOIN tb_perumahans ON tb_daftar_wargas.id_perumahan = tb_perumahans.id_perumahan WHERE tb_daftar_wargas.id_perumahan = :id_perumahan ORDER BY tb_daftar_wargas.nama_warga DESC";
    }
    if (req.body.param == 3) {
        query = "SELECT * FROM tb_daftar_wargas JOIN tb_perumahans ON tb_daftar_wargas.id_perumahan = tb_perumahans.id_perumahan WHERE tb_daftar_wargas.id_perumahan = :id_perumahan AND tb_daftar_wargas.nama_warga LIKE :nama  ORDER BY tb_daftar_wargas.nama_warga ASC";
    }

    db.sequelize.query(
        query,
        {
            replacements: { id_perumahan: req.body.id_perumahan, nama: '%'+req.body.nama+'%' },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Warga.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.getProfile = (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_daftar_wargas JOIN tb_perumahans ON tb_daftar_wargas.id_perumahan = tb_perumahans.id_perumahan WHERE tb_daftar_wargas.id_perumahan = :id_perumahan AND tb_daftar_wargas.id_warga = :id_warga",
        {
            replacements: { id_perumahan: req.body.id_perumahan, id_warga: req.body.id_warga },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Warga.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};