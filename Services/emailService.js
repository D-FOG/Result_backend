const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.uniEmail,
        pass: process.env.emailPass
    }
});
module.exports = transport