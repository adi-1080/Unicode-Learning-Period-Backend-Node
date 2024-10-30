import express from 'express'
const router = express.Router()

import followController from '../controllers/follow-controller.js'
import authenticateRoute from '../middlewares/authenticate-route.js'

router.post('/follow',authenticateRoute.authUser,followController.follow)
router.get('/:user_id/followers',authenticateRoute.authUser,followController.getFollowers)

export default router