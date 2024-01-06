var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'reza@kitawarga.com',
        pass: 'saujkslktlfdptbf'
    }
});

module.exports = transporter;
