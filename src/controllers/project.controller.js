import User from '../models/User.model';
import Project from '../models/project.model';
import  jwt  from "jsonwebtoken";
import config from "../config";

export const getProjects = async (req,res) => {
    try{
        const data = await Project.find().populate();

        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error interno del servidor"})
    }

}

export const insertProject = async (req,res) => {
    try {
        const token = req.headers["x-access-token"];
    
        if(!token) return res.status(403).json({message:"No token provider"})
        
        const decode = jwt.verify(token,config.SECRET)

        
        
        const user = await User.findById(decode.id, {password:0})
    
    
        if(!user) return res.status(404).json({message:"no user found"})

        const {nameProject} = req.body;
        
        const newProject = new Project({
            nameProject,
            createBy:user._id
        })        
      
        const savedProject = await newProject.save();
        return res.status(200).json({message:'ok'});
        
        //return res.status(200).json({message:'ok'});
    } catch (error) {
        return res.status(500).json({message:'error interno del servidor'})
    }


}

export const updateProject = async (req,res) => {

}

export const deleteProjects = async (req,res) => {

}

export const getProjectsWithTaskUsers = async (req,res) => {
    try{
        const token = req.headers["x-access-token"];
    
        if(!token) return res.status(403).json({message:"No token provider"})
        
        const decode = jwt.verify(token,config.SECRET)

        
        const user = await User.findById(decode.id, {password:0})
    
        if(!user) return res.status(404).json({message:"no user found"})

        const data = await Project.find({createBy:user._id});

        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error interno del servidor"})
    }
}