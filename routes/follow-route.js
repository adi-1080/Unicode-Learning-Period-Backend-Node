import express from 'express'
const router = express.Router()

import followController from '../controllers/follow-controller.js'

router.post('/follow', followController.follow)
router.get('/:user_id/followers', followController.getFollowers)

export default router