import Project from '../models/project.model';
import { getUserId } from '../middlewares/authJWT';

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
    

        const user = await getUserId(token);
    
    
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

export const deleteProject = async (req,res) => {
    try{
        const {idProject} = req.body;
        
        const deletedProject = await Project.findByIdAndDelete(idProject);
        
        if(!deletedProject) return res.status(400).json({message:"error"});

        return res.status(200).json({message:"ok"})

    }catch(err){
        return res.status(500).json({message:"error interno del servidor"})

    }

}

export const getProjectsWithTaskUsers = async (req,res) => {
    try{
        const token = req.headers["x-access-token"];
    
        const user = await getUserId(token);
    
        if(!user) return res.status(404).json({message:"no user found"})

        const data = await Project.find({createBy:user._id});

        res.status(200).json(data);

    }catch(err){
        res.status(500).json({message:"error interno del servidor"})
    }
}

export const getProjectsById = async (req,res) =>{
    try{
        const {projectId} = req.body;

        const data = await Project.findById(projectId);

        if(!data) return res.status(400).json({message:"Proyecto no encontrado"})

        res.status(200).json({message:"ok",data});

    }catch(err){
        res.status(500).json({message:"error interno del servidor"})
    }
}