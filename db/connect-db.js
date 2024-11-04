import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const connectDB = async() => {
    try{
        // CONNECTING TO MONGODB ATLAS USING MONGOOSE
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_ATLAS_UNICODE_USERNAME}:${process.env.MONGODB_ATLAS_UNICODE_PASSWORD}@${process.env.UNICODE_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.UNICODE_CLUSTER_NAME}`,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            }
        )

        const db = mongoose.connection

        // FUNCTIONS TO EXECUTE ON CONNECTING WITH ATLAS
        db.on('error', (err) => {
            console.log(err);
        })

        db.once('open', () => {
            console.log('Database Connection Established');
        })
    }
    catch(err){
        console.log("Failed to connect to database:",error);
    }
    
}

export default connectDB