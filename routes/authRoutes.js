import express from "express";
import { register, login, updateUser } from "../controllers/authController.js";

const authRouter = express.Router()

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/update').post(updateUser)


export default authRouter