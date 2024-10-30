import express from 'express'
const router = express.Router()

import blogController from "../controllers/blog-controller.js"
import authenticateRoute from '../middlewares/authenticate-route.js'

router.post('/create',authenticateRoute.authUser,blogController.create)
router.get('/:author_id/getallblogs',blogController.getAllBlogs)
router.post('/update',authenticateRoute.authUser,blogController.update)

export default router