import express from 'express'
import { createVote, getResults } from '../controller/VoteController.js'
import { ensureAuthenticated } from '../Middleware/isAuth.js'



const router=express.Router()

router.post('/create-vote',ensureAuthenticated ,createVote)
router.get('/results', ensureAuthenticated, getResults)
export default router