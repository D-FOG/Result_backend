const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    adminNumber: {
        Type: Number,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
})

const Admin = mongoose.model('TotaleGrade', AdminSchema);

module.exports = Admin