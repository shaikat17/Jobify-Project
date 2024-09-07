import express from "express";
import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from '../middleware/auth.js'

const authRouter = express.Router()

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/update').patch(authenticateUser, updateUser)


export default authRouter