import express from 'express'
const router                    = express.Router()

import userController from '../controllers/user-controller.js'
import authenticateRoute from '../middlewares/authenticate-route.js'
import upload from '../middlewares/multer.js'

router.post('/upload',upload.single('user-photo'),userController.uploadImage)
router.post('/register',upload.fields([{name:'avatar'},{name:'resume_url'}]),userController.register)
router.post('/login',userController.login)

router.get('/index',authenticateRoute,userController.index)
router.post('/show', authenticateRoute, userController.show)
router.post('/store',authenticateRoute, userController.store)
router.post('/update',authenticateRoute, userController.update)
router.post('/delete',authenticateRoute, userController.destroy)

export default router