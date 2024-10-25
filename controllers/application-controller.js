import Application from "../models/application-model.js";
import Job from "../models/job-model.js";

const applyForJob = async (req,res) => {
    try {
        const job_id = req.body.job_id
        const job = await Job.findById(job_id)
        if(!job){
            return res.status(500).json({message: "Job Not Found"})
        }

        const newApplication = new Application({
            user_id: req.user.user_id,
            job_id: job_id,
            status: req.body.status,
            applied_date: Date.now()
        })

        await newApplication.save()

        res.status(200).json({message: "Application created", application: newApplication})
    } catch (error) {
        res.status(500).json({message:"Could not apply for job", error: error})
    }
}

export default {applyForJob}