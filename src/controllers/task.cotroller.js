import Task from '../models/task.model';
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

export const udpateTask = async(req,res)=>{
    try{
        // Extrae el id de la tarea y los campos a actualizar del cuerpo de la solicitud
        const {idTask, ...updateFields} = req.body;
        
        // Encuentra y actualiza la tarea por su id, con los campos a actualizar y devuelve la tarea actualizada
        const task = await Task.findByIdAndUpdate(idTask, updateFields, {new: true});
        // Si no se encuentra la tarea, devuelve un mensaje de tarea no válida
        if(!task) return res.status(400).json({message:"Tarea no válida"});
    }
    catch(err){
        return res.status(500).json({message:"error interno del servidor"})
    }
}

export const deleteTask = async(req,res)=>{
    try {
        const {idTask} = req.body;
        
        const task = await Task.findByIdAndDelete(idTask);

        if(!task) return res.status(400).json({message:"Tarea no válida"})
    } 
    catch(err){
        return res.status(500).json({message:"error interno del servidor"})
    }
}

