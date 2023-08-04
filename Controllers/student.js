const Student = require('../Models/Student/studentModel')

const createStudent = async (req, res) => {
    const studentBody = req.val;
    const {matNo, studentEmail, password} = req.val;
    
    try{
       
        const student = await Student.findOne({$or: [{ matNo },{ studentEmail }]})
            .then(isStudents => {
                if (isStudents) {
                    const isStudentFields = []
                    if (isStudents.matNo === matNo){
                        isStudentFields.push('Matriculation number')
                    }
                    if (isStudents.studentEmail === studentEmail){
                        isStudentFields.push('Student email')
                    }
                    res.status(409).json({error:`${ isStudentFields } already exists`})
                } else {
                   function hashPassword(userPassword, callback) {
                        const saltRounds = 10;

                        bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
                            if (err) {
                            console.error('Error while hashing the password:', err);
                            return callback(err, null);
                            }

                            // Return the hashed password through the provided callback
                            callback(null, hashedPassword);
                        });
                    }

                        // Usage example:
                    const userPassword = password;
                    hashPassword(userPassword, (hashErr, hashedPassword) => {
                    if (!hashErr) {
                        console.log('Hashed password:', hashedPassword);
                    }
                    });
                    const students = new Student(studentBody)
                    students.save()
                        .then(students => {
                            res.status(200).send(students);
                        })
                        .catch(err => {
                            res.status(400).send(`Failed to upload students: ${err}`);
                        })
                }
            })


    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
}

const getStudent = (req, res) => {
    const { matNo } = req.val
    try{
        Student.findOne({matNo})
            .then(students => {
                res.status(200).send(students);
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).status(`Internal error: ${error}`);
    }
}

const updateStudent = (req, res) => {
    const { firstName, lastName, middleName, studentBody } = req.body;
    const {matNo, studentEmail} = req.val;
    try{
        const student = Student.findOne({$or: [{ matNo }]})
            .then(isStudents => {
                if (isStudents) {
                    const isStudentFields = []
                    if (isStudents.matNo === matNo){
                        isStudentFields.push('Matriculation number')
                    }
                    // if (isStudents.studentEmail === studentEmail){
                    //     isStudentFields.push('Student email')
                    // }
                    res.status(409).json({error:`${ isStudentFields } already exists`})
                } else {
                    Student.findOneAndUpdate({studentEmail}, { firstName, lastName, middleName, matNo },{new: true})
                        .then(students => {
                            res.status(200).send(students);
                        })
                        .catch(err => {
                            res.status(400).send(`Failed to upload students: ${err}`);
                        })
                }
            })
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
}

const deleteStudent = (req, res) => {
    const { matNo } = req.body;


    try {
        Student.findOneAndDelete({ matNo })
            .then(students => {
                res.status(200).send(students);
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).status(`Internal error: ${error}`);
    }
}
module.exports = {
    createStudent, 
    getStudent,
    updateStudent,
    deleteStudent
}