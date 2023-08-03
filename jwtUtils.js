const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.secretKey

function generateToken(email) {
    return jwt.sign({ email }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
  }
  
  module.exports = { generateToken };