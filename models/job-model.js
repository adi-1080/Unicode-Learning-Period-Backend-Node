import mongoose from 'mongoose'

const Schema = mongoose.Schema

const jobSchema = new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    requirements:{
        type:[String]
    },
    salary_range:{
        type:String
    },
    location:{
        type:String
    },
    job_type:{
        type:String
    },
    recruiter_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter'
    },
    company_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
}, {timestamps: true})

const Job = mongoose.model('Job', jobSchema)
export default Job