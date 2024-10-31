import Job from "../models/job-model.js";
import Company from "../models/company-model.js"

const createJob = async (req,res) => {
    try{
        const company = await Company.findById(req.recruiter.company_id)
        
        if(!company){
            return res.status(500).json({message: "Company not associated with recruiter"})
        }

        const newJob = new Job({
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        salary_range: req.body.salary_range,
        location: req.body.location,
        job_type: req.body.job_type,
        recruiter_id: req.recruiter.recruiter_id,
        company_id: req.recruiter.company_id,
        })
        
        await newJob.save()
        res.status(200).json({message: "Job created successfully", newJob: newJob})
    }
    catch(err){
        res.status(500).json({message: "Could not create Job", error: err})
    }
}

export default {createJob}