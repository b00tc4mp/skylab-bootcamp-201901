'use strict'

require('dotenv').config()
const nodemailer = require('nodemailer')

const { env: { MAIL, MAIL_PASS } } = process


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL,
        pass: MAIL_PASS
    }
})

module.exports = transporter