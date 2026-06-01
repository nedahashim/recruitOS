import { Router } from 'express'
import { getJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobs.controller.js'
import protect from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect) // all job routes require login

router.route('/').get(getJobs).post(createJob)
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob)

export default router