import User from '../models/User.model';
import Project from '../models/project.model'
import { getData } from '../temp'

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
        const {nameProject, email} = req.body;

        const findEmail = await User.findOne({email});

        if(!findEmail) return res.status(400).json({message:"error de datos"})

        const newProject = new Project({
            nameProject,
            createBy:[findEmail._id]
        })

        const savedProject = await newProject.save();
        
        return res.status(200).json({message:'ok'});
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
        const data = await Project.find().populate();
        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error interno del servidor"})
    }
}