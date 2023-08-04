const express = require('express');
const Admin = require('../../Models/Admin/Admin')
const router = express.Router()
const { createAdmin, getAdmin, updateAdmin, deleteAdmin } = require('../../Controllers/admin')
const {validateCreateAdmin, validateUpdateAdmin} = require('../../Middlewares/validateAdmin')

router.get('/', getAdmin);

router.post('/', validateCreateAdmin, createAdmin);

router.put('/', validateUpdateAdmin, updateAdmin);

router.delete('/', deleteAdmin);

module.exports = router;