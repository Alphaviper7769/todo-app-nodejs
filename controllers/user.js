import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/featues.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorConstruct.js";

export const register = async (req, res , next
) => {

  try {

    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already Exists", 404));

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });

    sendToken(user, res, "Registered Successfully", 201);
    
  } catch (error) {
    
    next(error)

  }

};

export const getMyProfile = async (req, res, next) => {
  
  try {
    
    res.status(200).json({
      success: true,
      user: req.user,
      });

  } catch (error) {
    
    next(error);

  }

};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) return next(new ErrorHandler("inValid Email or Password", 404));
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) return next(new ErrorHandler("inValid Email or Password", 404)); //error handling
  
    sendToken(user, res, `Welcome Back, ${user.name}`, 200);
  } catch (error) {
    next(error)
  }
};

export const logout = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { 
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    
    })
    .json({
      success: true,
      message: "Logged out",
    });
};
