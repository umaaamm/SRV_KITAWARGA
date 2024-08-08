const db = require("../models");
const PERUMAHAN = db.perumahan;

exports.addPERUMAHAN = (req, res) => {
  PERUMAHAN.create({
    id_perumahan: req.body.id_perumahan,
    nama_perumahan: req.body.nama_perumahan,
    alamat_perumahan: req.body.alamat_perumahan,
    saldo_perumahan: req.body.saldo_perumahan,
    link_cctv: req.body.link_cctv,
    link_img_qr: req.body.link_img_qr,
    alamat_maps: req.body.alamat_maps,
    bank_code: req.body.bank_code,
    account_holder_name: req.body.account_holder_name,
    account_number: req.body.account_number,
    status_account: req.body.status_account,
    expired_sub: "",
  })
    .then((user) => {
      res.status(200).send({ message: "Perumahan berhasil ditambah!." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deletePERUMAHAN = (req, res) => {
  PERUMAHAN.destroy({
    where: {
      id_perumahan: req.body.id_perumahan,
    },
  })
    .then((user) => {
      res.status(200).send({ message: "Perumahan berhasil dihapus!." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updatePERUMAHAN = (req, res) => {
  PERUMAHAN.update(
    {
      id_perumahan: req.body.id_perumahan,
      nama_perumahan: req.body.nama_perumahan,
      alamat_perumahan: req.body.alamat_perumahan,
      saldo_perumahan: req.body.saldo_perumahan,
      link_cctv: req.body.link_cctv,
      link_img_qr: req.body.link_img_qr,
      alamat_maps: req.body.alamat_maps,
      bank_code: req.body.bank_code,
      account_holder_name: req.body.account_holder_name,
      account_number: req.body.account_number,
    },
    { where: { id_perumahan: req.body.id_perumahan } }
  )
    .then((user) => {
      res.status(200).send({ message: "Perumahan berhasil diperbaharui!." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateSub = (req, res) => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + Number(req.body.expired_sub));

  PERUMAHAN.update(
    {
      expired_sub: futureDate,
      status_account: req.body.status_account,
    },
    { where: { id_perumahan: req.body.id_perumahan } }
  )
    .then((user) => {
      res
        .status(200)
        .send({ message: "Expired Sub Perumahan berhasil diperbaharui!." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.listPerumahan = (req, res) => {
  db.sequelize
    .query("SELECT * FROM tb_perumahans", {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Berhasil Get Data Perumahan.", data: result });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.validateExpiredSub = (req, res) => {
  PERUMAHAN.findOne({ where: { id_perumahan: req.body.id_perumahan } })
    .then((result) => {

        const expiredDate = new Date(result.expired_sub);

        if (result.status_account == "1" &&  expiredDate < new Date()) {
            return res.status(200).json({ data: true, message: "Expired Sub Perumahan." });
        }else{
            return res.status(200).json({ data: false, message: "Belum Expired Sub Perumahan." });
        }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
