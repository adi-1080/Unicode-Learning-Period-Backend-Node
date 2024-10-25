import express from "express"
const router = express.Router()

import jobController from "../controllers/job-controller.js";
import authRecruiter from "../middlewares/authRecruiter.js";

router.post('/create-job-listings',authRecruiter,jobController.createJob)

export default router