import express from 'express'
import {  currentUser, login, logout } from '../controller/AuthController.js'
import { ensureAuthenticated } from '../Middleware/isAuth.js'


const router=express.Router()


router.post('/login',login)

router.post('/logout', logout)

router.get('/currentuser',ensureAuthenticated,currentUser)





export default router