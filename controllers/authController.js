import {BadRequestError, UnauthenticatedError} from "../errors/index.js";
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

  const user = await User.create({ name, email, password });
  
  const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ user:{name: user.name, email: user.email, lastName: user.lastName, location: user.location}, token });
  
};

const login = async (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    throw new BadRequestError('Please provide all values.')
  }
  const user = await User.findOne({ email }).select('+password')

  const passMatch = await user.comparePassword(password)
  
  if (!user || !passMatch) {
    throw new UnauthenticatedError('Invalid Credentials ')
  }

const token = user.createJWT()
    user.password = undefined
  res.status(StatusCodes.OK).json({user, token, location: user.location})
};

const updateUser = (req, res) => {
  res.send("update user");
};


export { register, login, updateUser };
