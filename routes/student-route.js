const express                   = require('express')
const router                    = express.Router()

const studentController         = require('../controllers/student-controller')

router.get('/',studentController.index)
router.post('/show',studentController.show)
router.post('/store',studentController.store)
router.post('/update',studentController.update)
router.post('/delete',studentController.destroy)

module.exports = router