const express = require('express')
const router = express.Router()

const companyController = require('../controllers/company-controller')
const authenticateRoute = require('../middlewares/authenticate-route')

router.post('/login',companyController.login)
router.post('/signup',companyController.signup)

module.exports = router