import mongoose from 'mongoose'
const Schema = mongoose.Schema

const recruiterSchema = new Schema({
    name:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    join_date:{
        type: Date
    },
    qualification:{
        type: [String]
    },
    current_position:{
        type: String
    },
    salary:{
        type: Number
    },
    company_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
}, {timestamps: true})

const Recruiter = mongoose.model('Recruiter',recruiterSchema)

export default Recruiter