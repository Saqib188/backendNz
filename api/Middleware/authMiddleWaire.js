import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import { config } from "dotenv";
import expressAsyncHandler from "express-async-handler";

config();
const protect = expressAsyncHandler(async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
  

      token = req.headers.authorization.split(" ")[1];

      // decoded token id

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not autherized , token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not Autherized, No Token");
  }
});

export default protect;
