const express = require('express');
const Admin = require('../../Models/Admin/Admin')
const router = express.Router()

router.get('/', (req, res) => {
    try{
        Admin.countDocuments()
            .then(admin => {
                if(admin === 0) {
                    res.status(404).send('No data in collection')
                } else{
                    Admin.find({})
                        .then(admin => {
                            res.status(200).send(admin);
                        })
                        .catch(err => {
                            res.status(400).send(`Error finding data: ${err}`);
                        })
                }
            })
            .catch(err => {
                res.status(500).send(`Server error`);
            })
    } catch (error){
        res.status(500).status(`Internal error: ${error}`);
    }
});

router.post('/', async (req, res) => {
    const adminBody = req.body;
    const {email, password, firstName, lastName, middleName} = req.body;
    const adminNumber = Math.floor(Math.random() * 1000)
    try{
        const student = Admin.findOne({$or: [{ email },{ adminNumber }]})
            .then(isAdmin => {
                if (isAdmin) {
                    const isAdminFields = []
                    if (isAdmin.email === email){
                        isAdminFields.push('Email')
                    }
                    if (isAdmin.adminNumber === adminNumber){
                        isAdminFields.push('Administrator number')
                    }
                    res.status(409).json({error:`${ isAdminFields } already exists`})
                } else {
                    const admin = new Admin({adminNumber, email, password, firstName, lastName, middleName})
                    admin.save()
                        .then(admin => {
                            res.status(200).send(admin);
                        })
                        .catch(err => {
                            res.status(400).send(`Failed to upload students: ${err}`);
                        })
                }
            })
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
});

router.put('/', (req, res) => {
    const { adminNumber, firstName, lastName, middleName, password, email } = req.body;
    try{
        //const admin = Admin.findOne({adminNumber})
        Admin.updateOne({adminNumber}, { firstName, lastName, middleName, password, email })
            .then(admin => {
                if (admin.modifiedCount === 1){
                    Admin.findOne({adminNumber})
                        .then((updatedAdmin)=>res.status(200).send(updatedAdmin))
                } else {
                    res.status(200).send('No changes made')
                }
            })
            .catch(err => {
                res.status(400).send(`Admin does not exist`);
            })
            // .then(isAdmin => {
            //     if (isAdmin) {
                    
            //     } else {
            //         // const isAdminFields = []
            //         // if (isAdmin.adminNumber == adminNumber){
            //         //     isAdminFields.push('Admin number')
            //         // }
            //         // if (isStudents.studentEmail === studentEmail){
            //         //     isStudentFields.push('Student email')
            //         // }
            //         res.status(409).json({error:`${ isAdminFields } already exists`})
            //     }
            // })
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
});

router.delete('/', (req, res) => {
    const { adminNumber } = req.body;


    try {
        Admin.findOneAndDelete({ adminNumber })
            .then(admin => {
                res.status(200).send(admin);
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).status(`Internal error: ${error}`);
    }
});

module.exports = router;