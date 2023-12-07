const db = require("../models");
const Pengeluaran = db.pengeluaran;
const Karyawan = db.manajemenKaryawan;
const Kasbon = db.kasbon;
const Kategori = db.kategori;
const Gaji = db.gaji;
const Perumahan = db.perumahan;

const Pengeluaran_bulanan = db.pengeluaran_bulanan;
const { v1: uuidv1 } = require('uuid');

exports.addPengeluaran = async (req, res) => {
    try {
        const kategori = await Kategori.findOne({
            where: {
                id_kategori: req.body.id_kategori
            }
        });

        if (kategori.nama_kategori_transaksi == "Gaji dan Kasbon") {
            var totalGaji = 0;
            var potongan = 0;
            var idKaryawan = '';

            if (req.body.data_kasbon.length > 1) {
                const createdPengeluarans = await Promise.all(
                    req.body.data_kasbon.map(async (item) => {
                        const kasbonValue = await Kasbon.findOne({
                            where: {
                                id_kasbon: item.id_kasbon
                            }
                        });

                        await Kasbon.update({
                            tenor: kasbonValue.tenor - 1,
                            pinjaman: kasbonValue.pinjaman - kasbonValue.angsuran_per_bulan,
                        }, { where: { id_kasbon: item.id_kasbon } });

                        const valueK = await Karyawan.findOne({
                            where: {
                                id_karyawan: kasbonValue.id_karyawan
                            }
                        });

                        totalGaji = valueK.gaji_bulanan;
                        idKaryawan = valueK.id_karyawan;

                        await Karyawan.update({
                            sisa_kasbon: valueK.sisa_kasbon - kasbonValue.angsuran_per_bulan,
                        }, { where: { id_karyawan: kasbonValue.id_karyawan } });

                        const uuid = uuidv1();
                        potongan = parseInt(potongan) + parseInt(item.nilai_transaksi);
                        await Pengeluaran.create({
                            id_transaksi: uuid,
                            nama_transaksi: req.body.nama_transaksi,
                            id_kategori: req.body.id_kategori,
                            kategori_transaksi: req.body.kategori_transaksi,
                            tanggal_transaksi: req.body.tanggal_transaksi,
                            nilai_transaksi: item.nilai_transaksi,
                            keterangan: req.body.keterangan,
                            // bukti_foto: req.file.filename,
                            bukti_foto: 'bukti_foto',
                            id_kasbon: item.id_kasbon,
                            id_perumahan: req.body.id_perumahan
                        });
                    })
                );

                const uuid = uuidv1();
                await Gaji.create({
                    id_gaji: uuid,
                    id_karyawan: idKaryawan,
                    tanggal_gaji: req.body.tanggal_transaksi,
                    jumlah_gaji: parseInt(totalGaji) - parseInt(potongan),
                    id_perumahan: req.body.id_perumahan
                });

                const PerumahanData = await Perumahan.findOne({
                    where: {
                        id_perumahan: req.body.id_perumahan
                    }
                });

                await Perumahan.update({
                    saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) - (parseInt(totalGaji) - parseInt(potongan)),
                }, { where: { id_perumahan: req.body.id_perumahan } });

                res.status(200).send({ message: "Pengeluaran dan Penggajian berhasil ditambah!.", createdPengeluarans });
                return;
            }
        }

        if (kategori.nama_kategori_transaksi == "Gaji") {
            const uuid = uuidv1();

            const valueK = await Karyawan.findOne({
                where: {
                    id_karyawan: req.body.id_karyawan
                }
            });

            totalGaji = valueK.gaji_bulanan;
            await Gaji.create({
                id_gaji: uuid,
                id_karyawan: req.body.id_karyawan,
                tanggal_gaji: req.body.tanggal_transaksi,
                jumlah_gaji: totalGaji,
                id_perumahan: req.body.id_perumahan
            });

            const PerumahanData = await Perumahan.findOne({
                where: {
                    id_perumahan: req.body.id_perumahan
                }
            });

            await Perumahan.update({
                saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) - parseInt(totalGaji),
            }, { where: { id_perumahan: req.body.id_perumahan } });

            res.status(200).send({ message: "Penggajian berhasil ditambah!." });
            return;
        }

        const uuid = uuidv1();
        await Pengeluaran_bulanan.create({
            id_pengeluaran_bulanan: uuid,
            nama_transaksi_pengeluaran_bulanan: req.body.nama_transaksi_pengeluaran_bulanan,
            id_kategori: req.body.id_kategori,
            kategori_transaksi: req.body.kategori_transaksi,
            tanggal_transaksi_pengeluaran_bulanan: req.body.tanggal_transaksi_pengeluaran_bulanan,
            nilai_transaksi_pengeluaran_bulanan: req.body.nilai_transaksi_pengeluaran_bulanan,
            keterangan_pengeluaran_bulanan: req.body.keterangan_pengeluaran_bulanan,
            // bukti_foto: req.file.filename,
            bukti_foto_pengeluaran_bulanan: 'bukti_foto',
            id_perumahan: req.body.id_perumahan
        });

        const PerumahanData = await Perumahan.findOne({
            where: {
                id_perumahan: req.body.id_perumahan
            }
        });

        await Perumahan.update({
            saldo_perumahan: parseInt(PerumahanData.saldo_perumahan) - parseInt(req.body.nilai_transaksi_pengeluaran_bulanan),
        }, { where: { id_perumahan: req.body.id_perumahan } });

        res.status(200).send({ message: "Pengeluaran Bulanan berhasil ditambah!." });

        // Rest of your code for other cases
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "An error occurred." });
    }
};


exports.deletePengeluaran = (req, res) => {
    Pengeluaran.destroy({
        where: {
            id_transaksi: req.body.id_transaksi
        }
    }).then(user => {
        res.status(200).send({ message: "Pengeluaran berhasil dihapus!." });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updatePengeluaran = (req, res) => {
    Pengeluaran.update({
        id_transaksi: req.body.id_transaksi,
        nama_transaksi: req.body.nama_transaksi,
        kategori_transaksi: req.body.kategori_transaksi,
        tanggal_transaksi: req.body.tanggal_transaksi,
        nilai_transaksi: req.body.nilai_transaksi,
        keterangan: req.body.keterangan,
        bukti_foto: req.body.bukti_foto,
        id_kasbon: req.body.id_kasbon,
        id_perumahan: req.body.id_perumahan
    }, { where: { id_transaksi: req.body.id_transaksi } })
        .then(user => {
            res.status(200).send({ message: "Pengeluaran berhasil diperbaharui!." });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.listPengeluaran = async (req, res) => {

    try {
        let query = '';
        if (req.body.param == 1) {
            query = "SELECT * from  tb_kasbons join tb_perumahans on tb_kasbons.id_perumahan = tb_perumahans.id_perumahan tb_ join tb_manajemen_karyawans ON tb_manajemen_karyawans.id_karyawan = tb_kasbons.id_karyawan WHERE tb_manajemen_karyawans.id_perumahan = :id_perumahan ORDER BY tb_kasbons.tanggal_transaksi ASC";
        }
        // if (req.body.param == 2) {
        //     query = "SELECT * FROM tb_pengeluarans JOIN tb_ketegoris ON tb_pengeluarans.id_kategori = tb_ketegoris.id_kategori LEFT JOIN tb_kasbons ON tb_pengeluarans.id_kasbon = tb_kasbons.id_kasbon JOIN tb_perumahans ON tb_pengeluarans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_pengeluarans.nama_transaksi DESC";
        // }
        // if (req.body.param == 3) {
        //     query = "SELECT * FROM tb_pengeluarans JOIN tb_ketegoris ON tb_pengeluarans.id_kategori = tb_ketegoris.id_kategori LEFT JOIN tb_kasbons ON tb_pengeluarans.id_kasbon = tb_kasbons.id_kasbon JOIN tb_perumahans ON tb_pengeluarans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan AND tb_pengeluarans.nama_transaksi LIKE :nama_transaksi ORDER BY tb_pengeluarans.nama_transaksi ASC";
        // }

        const resultPengeluaranKasbon = await db.sequelize.query(
            query,
            {
                replacements: { id_perumahan: req.body.id_perumahan, nama_transaksi: '%' + req.body.nama_transaksi + '%' },
                type: db.sequelize.QueryTypes.SELECT
            }
        );


        if (req.body.param == 1) {
            queryBulanan = "SELECT * FROM tb_pengeluaran_bulanans JOIN tb_ketegoris ON tb_pengeluaran_bulanans.id_kategori = tb_ketegoris.id_kategori JOIN tb_perumahans ON tb_pengeluaran_bulanans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_pengeluaran_bulanans.nama_transaksi_pengeluaran_bulanan ASC";
        }

        const resultPengeluaranBulanan = await db.sequelize.query(
            queryBulanan,
            {
                replacements: { id_perumahan: req.body.id_perumahan, nama_transaksi: '%' + req.body.nama_transaksi + '%' },
                type: db.sequelize.QueryTypes.SELECT
            }
        );

        if (req.body.param == 1) {
            queryGaji = "SELECT * FROM tb_gajis JOIN tb_manajemen_karyawans ON tb_gajis.id_karyawan = tb_manajemen_karyawans.id_karyawan JOIN tb_perumahans ON tb_gajis.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_gajis.tanggal_gaji ASC";
        }
        const resultPengeluaranGaji = await db.sequelize.query(
            queryGaji,
            {
                replacements: { id_perumahan: req.body.id_perumahan },
                type: db.sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({ message: "Berhasil Get Data Pengeluaran.", resultPengeluaranKasbon, resultPengeluaranBulanan, resultPengeluaranGaji });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.listPengeluaranGaji = async (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_gajis JOIN tb_manajemen_karyawans ON tb_gajis.id_karyawan = tb_manajemen_karyawans.id_karyawan JOIN tb_perumahans ON tb_gajis.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_gajis.tanggal_gaji DESC",
        {
            replacements: { id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Gaji.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

}

exports.listPengeluaranGajiNew = async (req, res) => {
    db.sequelize.query(
        "SELECT tb_manajemen_karyawans.posisi, tb_manajemen_karyawans.gaji_bulanan, tb_manajemen_karyawans.id_karyawan, tb_manajemen_karyawans.nama_karyawan, tb_gajis.jumlah_gaji, tb_gajis.tanggal_gaji, tb_gajis.id_gaji FROM tb_gajis JOIN tb_manajemen_karyawans ON tb_gajis.id_karyawan = tb_manajemen_karyawans.id_karyawan JOIN tb_perumahans ON tb_gajis.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_gajis.tanggal_gaji DESC",
        {
            replacements: { id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        let dataTemp = [];
        result.map((item) => {

            const datku = dataTemp.find((i) => i.id_karyawan == item.id_karyawan)
            const index = dataTemp.findIndex((i) => i.id_karyawan === item.id_karyawan);
            const itemYear = new Date(Number(item.tanggal_gaji)).getFullYear();

            const itemMonth = new Date(Number(item.tanggal_gaji)).getMonth();

            const monthsArray = [
                "Januari", "Februari", "Maret", "April",
                "Mei", "Juni", "Juli", "Agustus",
                "September", "Oktober", "November", "Desember"
            ];

            if (itemYear != req.body.tahun) {
                return
            }

            if (datku) {
                dataTemp[index].data.push(item)
            } else {
                dataTemp.push({
                    id_gaji: item.id_gaji,
                    id_karyawan: item.id_karyawan,
                    nama_karyawan: item.nama_karyawan,
                    posisi: item.posisi,
                    gaji_bulanan: item.gaji_bulanan,
                    bulan: monthsArray[itemMonth - 1],
                    data: [item]
                })
            }
        });


        res.status(200).json({ message: "Berhasil Get Data Gaji.", data: dataTemp });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

}

exports.listPengeluaranKasbon = async (req, res) => {
    db.sequelize.query(
        "SELECT * from  tb_kasbons join tb_manajemen_karyawans ON tb_manajemen_karyawans.id_karyawan  = tb_kasbons.id_karyawan WHERE tb_manajemen_karyawans.id_perumahan = :id_perumahan ORDER BY tb_kasbons.tanggal_transaksi ASC",
        {
            replacements: { id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Kasbon.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.listPengeluaranKasbonNew = async (req, res) => {
    db.sequelize.query(
        "SELECT * from  tb_kasbons join tb_manajemen_karyawans ON tb_manajemen_karyawans.id_karyawan  = tb_kasbons.id_karyawan WHERE tb_manajemen_karyawans.id_perumahan = :id_perumahan ORDER BY tb_kasbons.tanggal_transaksi ASC",
        {
            replacements: { id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {

        let dataTemp = [];
        result.map((item) => {

            const datku = dataTemp.find((i) => i.id_karyawan == item.id_karyawan)
            const index = dataTemp.findIndex((i) => i.id_karyawan === item.id_karyawan);
            const itemYear = new Date(Number(item.tanggal_transaksi) * 1000).getFullYear();
            const itemMonth = new Date(Number(item.tanggal_transaksi) * 1000).getMonth();

            const monthsArray = [
                "Januari", "Februari", "Maret", "April",
                "Mei", "Juni", "Juli", "Agustus",
                "September", "Oktober", "November", "Desember"
            ];

            if (itemYear != req.body.tahun) {
                return
            }

            if (datku) {
                dataTemp[index].data.push(item)
            } else {
                dataTemp.push({
                    id_kasbon: item.id_kasbon,
                    id_karyawan: item.id_karyawan,
                    nama_karyawan: item.nama_karyawan,
                    bulan: monthsArray[itemMonth - 1],
                    data: [item]
                })
            }
        });

        res.status(200).json({ message: "Berhasil Get Data Kasbon.", data: dataTemp });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.listPengeluaranBulanan = async (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_pengeluaran_bulanans JOIN tb_ketegoris ON tb_pengeluaran_bulanans.id_kategori = tb_ketegoris.id_kategori JOIN tb_perumahans ON tb_pengeluaran_bulanans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_pengeluaran_bulanans.tanggal_transaksi_pengeluaran_bulanan DESC",
        {
            replacements: { id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Pengeluaran Bulanan.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}


exports.listPengeluaranBulananNew = async (req, res) => {
    db.sequelize.query(
        "SELECT * FROM tb_pengeluaran_bulanans JOIN tb_ketegoris ON tb_pengeluaran_bulanans.id_kategori = tb_ketegoris.id_kategori JOIN tb_perumahans ON tb_pengeluaran_bulanans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_pengeluaran_bulanans.tanggal_transaksi_pengeluaran_bulanan DESC",
        {
            replacements: { id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        let dataTemp = [];
        result.map((item) => {
            const itemMonth = new Date(Number(item.tanggal_transaksi_pengeluaran_bulanan)).getMonth();

            const monthsArray = [
                "Januari", "Februari", "Maret", "April",
                "Mei", "Juni", "Juli", "Agustus",
                "September", "Oktober", "November", "Desember"
            ];

            const datku = dataTemp.find((i) => new Date(Number(i.tanggal_transaksi_pengeluaran_bulanan)).getMonth() == itemMonth);
            const index = dataTemp.findIndex((i) => new Date(Number(i.tanggal_transaksi_pengeluaran_bulanan)).getMonth() == itemMonth);
            const itemYear = new Date(Number(item.tanggal_transaksi_pengeluaran_bulanan)).getFullYear();

            if (itemYear != req.body.tahun) {
                return
            }

            if (datku) {
                dataTemp[index].data.push(item)
            } else {
                dataTemp.push({
                    id_perumahan: item.id_perumahan,
                    nama_perumahan: item.nama_perumahan,
                    bulan: monthsArray[itemMonth - 1],
                    data: [item]
                })
            }
        });
        res.status(200).json({ message: "Berhasil Get Data Pengeluaran Bulanan.", data: dataTemp });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.listPengeluaranMobile = async (req, res) => {
    let query = '';
    if (req.body.param == 1) {
        query = "SELECT * FROM tb_pengeluaran_bulanans JOIN tb_ketegoris ON tb_pengeluaran_bulanans.id_kategori = tb_ketegoris.id_kategori JOIN tb_perumahans ON tb_pengeluaran_bulanans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_pengeluaran_bulanans.tanggal_transaksi_pengeluaran_bulanan ASC";
    }

    if (req.body.param == 2) {
        query = "SELECT * FROM tb_pengeluarans JOIN tb_ketegoris ON tb_pengeluarans.id_kategori = tb_ketegoris.id_kategori LEFT JOIN tb_kasbons ON tb_pengeluarans.id_kasbon = tb_kasbons.id_kasbon JOIN tb_perumahans ON tb_pengeluarans.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_pengeluarans.tanggal_transaksi ASC"
    }

    if (req.body.param == 3) {
        query = "SELECT * FROM tb_gajis JOIN tb_manajemen_karyawans ON tb_gajis.id_karyawan = tb_manajemen_karyawans.id_karyawan JOIN tb_perumahans ON tb_gajis.id_perumahan = tb_perumahans.id_perumahan WHERE tb_perumahans.id_perumahan = :id_perumahan ORDER BY tb_gajis.tanggal_gaji ASC"
    }

    db.sequelize.query(
        query,
        {
            replacements: { id_perumahan: req.body.id_perumahan },
            type: db.sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.status(200).json({ message: "Berhasil Get Data Pengeluaran Mobile.", data: result });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}