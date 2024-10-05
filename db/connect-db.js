import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const connectDB = () => {
    // CONNECTING TO MONGODB ATLAS USING MONGOOSE
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_ATLAS_UNICODE_USERNAME}:${process.env.MONGODB_ATLAS_UNICODE_PASSWORD}@${process.env.UNICODE_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.UNICODE_CLUSTER_NAME}`)

    const db = mongoose.connection

    // FUNCTIONS TO EXECUTE ON CONNECTING WITH ATLAS
    db.on('error', (err) => {
        console.log(err);
    })

    db.once('open', () => {
        console.log('Database Connection Established');
    })
}

export default connectDB