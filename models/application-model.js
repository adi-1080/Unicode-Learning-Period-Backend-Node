import mongoose from 'mongoose'

const Schema = mongoose.Schema

const applicationSchema = new Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    job_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    status:{
        type:String
    },
    applied_date:{
        type:Date
    }
})

const Application = mongoose.model('Application', applicationSchema) 
export default Application