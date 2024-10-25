import mongoose from 'mongoose'
const Schema = mongoose.Schema

const companySchema = new Schema({
    company_id:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    company_name:{
        type: String
    },
    description:{
        type: String
    },
    website_url:{
        type: String
    },
    recruiters: [{type: mongoose.Schema.Types.ObjectId, ref:'Recruiter'}]
}, {timestamps: true})

const Company = mongoose.model('Company',companySchema)
export default Company