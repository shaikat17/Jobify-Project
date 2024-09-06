import {BadRequestError} from "../errors/index.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";


const register = async (req, res, next) => {
  const { name, email, password } = req.body
  
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values.')
  }

  const userAlreadyExits = await User.findOne({ email })
  
  if (userAlreadyExits) {
    throw new BadRequestError('Email already in use.')
  }

    const user = await User.create({name, email, password});
    res.status(StatusCodes.OK).json({ user });
  
};

const login = (req, res) => {
  res.send("login user");
};

const updateUser = (req, res) => {
  res.send("update user");
};


export { register, login, updateUser };
