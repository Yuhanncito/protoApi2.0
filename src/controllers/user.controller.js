import User from "../models/User.model";
import  jwt  from "jsonwebtoken";
import config from "../config";

export const singUp = async (req,res)=>{
    const {name,lastName,email,password} = req.body;

    const newUser = new User({
        name,
        lastName,
        email,
        password: await User.ecryptPassword(password)
    });
    const response = await User.findOne({email})
    if (response) return res.status(400).json({message:"User Exist"})
    
    const userSaved = await newUser.save();

    const token = jwt.sign({id: userSaved._id},config.SECRET,{
        expiresIn: 86400
    })
    res.status(200).json({token});
}
export const singIn = async (req,res)=>{
    const {email,password} = req.body;
    const response = await User.findOne({email})
    if (!response) return res.status(400).json({message:"User not found"})
    
    const matchPassword = await User.comparePassword(password,response.password)

    if(!matchPassword) return res.status(400).json({message:"Invalid Password", token: null})
    
    const token = jwt.sign({id:response._id},config.SECRET,{
        expiresIn: 86400
    })

    res.status(200).json({token,message:'correct'})
}

export const getAll = async (req,res)=>{
    const allUsers = await User.find();
    res.status(200).json(allUsers);
}