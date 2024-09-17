import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from '../middleware/auth.js'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	message: 'Too many requests from this IP address, Please try again after 15 minutes.'
})

const authRouter = express.Router()

authRouter.route('/register').post(apiLimiter,register)
authRouter.route('/login').post(apiLimiter,login)
authRouter.route('/update').patch(authenticateUser, updateUser)


export default authRouter