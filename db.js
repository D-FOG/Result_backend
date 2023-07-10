const mongoose = require('mongoose');
require('dotenv').config()

const URI = `mongodb+srv://fogbonda017:${process.env.URIPASS}@studentcluster.75dnuzz.mongodb.net/student`

const dbConnect = async () => {
    try{
        const option ={
            useUnifiedTopology: true,
        }
        
        mongoose.connect(URI, option);

        const db = mongoose.connection;
        
        // db.on('error', console.error.bind(console, 'Connection error'));
        db.once('open', () => {
            console.log('Connected to the database successfully:');
        })
        // res.status(200).send('Connected successfully')
    } catch (error) {
        console.log(`Error connecting to the database: ${error}`);
        // res.status(500).json({ error: `error connecting to the database` })
    }
}

module.exports = dbConnect