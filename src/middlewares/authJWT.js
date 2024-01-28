import jwt from "jsonwebtoken"
import config from "../config"
import UserModel from "../models/User.model";
import { setData } from "../temp";

export const verifyToken = async (req,res,next) =>{
 try {
    const token = req.headers["x-access-token"];
    
    if(!token) return res.status(403).json({message:"No token provider"})
    
    const decode = jwt.verify(token,config.SECRET)

    const user = await UserModel.findById(decode.id, {password:0})

    if(!user) return res.status(404).json({message:"no user found"})

    setData(user._id);

    next();
 } catch (error) {
    return res.status(401).json({message: 'Unauthorized'})
 }
}

export const isModerator = async (req,res,next) => {
  
}