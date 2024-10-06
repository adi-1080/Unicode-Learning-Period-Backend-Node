import express from 'express'
const router = express.Router()

import recruiterController from '../controllers/recruiter-controller.js'
import authenticateRoute from '../middlewares/authenticate-route.js'

router.post('/login',recruiterController.login)
router.post('/register',recruiterController.register)

export default router