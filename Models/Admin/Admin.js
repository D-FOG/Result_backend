const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    adminNumber: {
        type: Number,
        unique: true
    },
    firstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin