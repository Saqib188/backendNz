import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import generateToken from "../utils/generateToken.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password ");
  }
});

const createUser = asyncHandler(async function (req, res) {


  const { name, email, password } = req.body;
  console.log(name,"name",email,"email",password,"password","from createuser controller");
  

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("User Already Exist ");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic: `/uploads/${req.file.filename}`,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
});

const uploadPath = path.join(process.cwd(), "uploads");

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


/// profile update Controller 

const updateUserProfile = asyncHandler(async function (req,res) {

  const user = await User.findById(req.user._id);
  if (user){
    user.name= req.body.name || user?.name;
    user.email = req.body?.email || user?.email;
    if (req.file){

      user.pic = `/uploads/${req.file.filename}` || user?.pic;
    }
    if(req.body.password){
      user.password = req.body.password 
    }
    
    const updatedUser = await user.save();
    res.json({
      _id :updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      pic:updatedUser.pic,
      token:generateToken(updatedUser._id)
    })

  } else{
    res.status(404);
    throw new Error("User Not Found");
  }

   
})

export { createUser, upload, authUser,updateUserProfile };
