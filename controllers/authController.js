import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";


// Register Controller
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values.");
  }

  const userAlreadyExits = await User.findOne({ email });

  if (userAlreadyExits) {
    throw new BadRequestError("Email already in use.");
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
  });
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values.");
  }
  const user = await User.findOne({ email }).select("+password");
  
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials.')
  }

  const passMatch = await user.comparePassword(password);

  if (!user || !passMatch) {
    throw new UnauthenticatedError("Invalid Credentials ");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

// User Information Update Controller
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values.");
  }

  const user = await User.findOneAndUpdate({ _id: req.user.userId },{ email, name, lastName, location },{ new: true });

  // user.email = email;
  // user.name = name;
  // user.lastName = lastName;
  // user.location = location;

  // const response = await user.save();
  // console.log("🚀 ~ updateUser ~ response:", response);

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
