import express from "express"
const router = express.Router()

import applicationController from "../controllers/application-controller.js"
import authenticateRoute from "../middlewares/authenticate-route.js"
import authRecruiter from "../middlewares/authRecruiter.js"

router.post('/apply-for-job',authenticateRoute.authUser,applicationController.applyForJob)

export default router