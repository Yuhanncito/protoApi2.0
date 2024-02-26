import Task from '../models/task.model';
import { getUserId } from '../middlewares/authJWT';
import Project from '../models/project.model';

export const getTaskByProjectId = async (req,res) =>{
    try {

        const {projectRelation} = req.body;

        const tasks = await Task.find({projectRelation})

        return res.status(200).json(tasks)

        
    } catch (error) {
        return res.status(500).json({message:"error interno del servidor"})
    }

}

export const insertTask = async(req,res)=>{
   try {
        const {projectRelation,nameTask,descriptionTask,userTasks,timeHoursTaks} = req.body;

        if(nameTask.length === 0 || projectRelation.length === 0) return res.status(400).json({message:"Nombre Requerido"})

        const newTask = new Task({
            projectRelation,
            nameTask,
            descriptionTask,
            userTasks,
            timeHoursTaks
        })

        const taskSaved = await newTask.save();
        const projectUpdate = await Project.updateOne({_id : projectRelation}, {$push:{ tasks : taskSaved}});

        return res.status(200).json({message:"ok"})
   } catch (error) {
    return res.status(500).json({message:"error interno del servidor"})
   }

}