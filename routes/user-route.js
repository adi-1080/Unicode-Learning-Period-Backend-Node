const express                   = require('express')
const router                    = express.Router()

const userController            = require('../controllers/user-controller')
const authenticateRoute         = require('../middlewares/authenticate-route')
const upload                    = require('../middlewares/multer')

router.post('/upload',upload.single('user-photo'),userController.uploadImage)
router.post('/register',upload.fields([{name:'avatar'},{name:'resume_url'}]),userController.register)
router.post('/login',userController.login)

router.get('/index',authenticateRoute,userController.index)
router.post('/show', authenticateRoute, userController.show)
router.post('/store',authenticateRoute, userController.store)
router.post('/update',authenticateRoute, userController.update)
router.post('/delete',authenticateRoute, userController.destroy)

module.exports = router