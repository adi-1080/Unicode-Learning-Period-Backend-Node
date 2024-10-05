import express from 'express'
const router = express.Router()

import companyController from '../controllers/company-controller.js'
import authenticateRoute from '../middlewares/authenticate-route.js'

router.post('/login',companyController.login)
router.post('/register',companyController.register)

export default router