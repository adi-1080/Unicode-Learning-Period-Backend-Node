import express from 'express'
const router = express.Router()

import blogController from "../controllers/blog-controller.js"
import authenticateRoute from '../middlewares/authenticate-route.js'

router.post('/create',authenticateRoute.authUser,authenticateRoute.checkIfAuthorizedAuthor,blogController.createBlog)
router.get('/:author_id/getallblogs',authenticateRoute.checkIfAuthorizedAuthor,blogController.getAllBlogs)
router.post('/:blogId/update',authenticateRoute.authUser,authenticateRoute.checkIfAuthorizedAuthor,blogController.updateBlog)
router.post('/getblogsbytags',authenticateRoute.authUser,authenticateRoute.checkIfAuthorizedAuthor,blogController.getBlogsByTags)

export default router