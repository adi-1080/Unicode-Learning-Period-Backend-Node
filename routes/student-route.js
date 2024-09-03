const express                   = require('express')
const router                    = express.Router()

const studentController         = require('../controllers/student-controller')
const authenticateRoute         = require('../middlewares/authenticate-route')

router.post('/register',studentController.register)
router.post('/login',studentController.login)

router.get('/',authenticateRoute,studentController.index)
router.post('/show', studentController.show)
router.post('/store',authenticateRoute, studentController.store)
router.post('/update',authenticateRoute, studentController.update)
router.post('/delete',authenticateRoute, studentController.destroy)

module.exports = router