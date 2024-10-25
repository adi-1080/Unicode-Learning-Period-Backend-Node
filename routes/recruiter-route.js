import express from 'express'
const router = express.Router()

import recruiterController from '../controllers/recruiter-controller.js'
import authenticateRoute from '../middlewares/authenticate-route.js'
import authRecruiter from '../middlewares/authRecruiter.js'

router.post('/login',recruiterController.login)
router.post('/register',recruiterController.register)
router.post('/view-applicants',authRecruiter,recruiterController.viewApplications)

export default router