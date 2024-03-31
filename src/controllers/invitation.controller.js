import { getUserId } from "../middlewares/authJWT";
import User from "../models/User.model";
import Invitation from "../models/invitation.model";
import WorkSpace from "../models/workSpace.model";

export const setInvitatio = async (req,res) => {
    try {
        const token = req.headers["x-access-token"];

        const {workSpace, email} = req.body;

        const id = await getUserId(token)

        const workSpaceExist = await WorkSpace.findById(workSpace);

        if(!workSpaceExist) return res.status(400).json({message:'Error en la peticion 1'});

        const userExist = await User.findOne({email});

        if(!userExist) return res.status(400).json({message:'Error en la peticion 2'});

		const newInvitation = new Invitation({
			idPropietary:id._id,
			idParticipate:userExist._id,
			idWorkSpace:workSpaceExist._id
		})
        
		const savedInvitation = await newInvitation.save();

		res.status(200).json({message:'ok'})

    } catch (error) {
        res.status(500).json({message:'Error Interno del Servidor'});
    }
}


/*const acceptInvitation = async (req,res) =>{
	try{
		const{id1,id2} = req.body;
		
		const idUser = getUserId(req.headers.x-access-token);

		if(idUser !== id2) return res.status(400).json({message:'usuario incorrecto'})

		const invitacion = await Invitaciones.fineOne({$and:[{IdAnfitrion:id1},{IdInvitado:id2}]})

		if(!invitacion) return res.status(400).json({message:'No hay invitacion'})

		const workSpaceUpdate = await WorkSpace.updateOne({_id : invitacion.context}, {$push:{ participantes : invitacion.IdInvitado}});

		if(!workSpaceUpdate) return res.status(400).json({message:'Ah Ocurrido un error'})

		const invitacionDelete = await Invitaciones.fineOneAndDelete({_id:invitacion_id})

		if(!invitacionDelete) return res.status(400).json({message:'Ah Ocurrido un error'})

		res.status(200).json({message:'ok'});

	}
	catch(err){
		res.status(500).json({message:'Error Interno del Servidor'});
	}
}
*/