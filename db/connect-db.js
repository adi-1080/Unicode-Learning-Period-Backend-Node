import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const connectDB = async() => {
    try{
        // CONNECTING TO MONGODB ATLAS USING MONGOOSE
        const dbURL = process.env.MONGODB_URL
        console.log(typeof dbURL);
        mongoose.connect(dbURL)

        const db = mongoose.connection

        // FUNCTIONS TO EXECUTE ON CONNECTING WITH ATLAS
        db.on('error', (err) => {
            console.log(err);
        })

        db.once('open', () => {
            console.log('MongoDB Atlas Database Connection Established');
        })
    }
    catch(err){
        console.log("Failed to connect to database:",err);
    }
    
}

export default connectDB