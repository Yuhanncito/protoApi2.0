import Secret from "../models/secretQuestion.model";
import Privilege from "../models/privileges.model";


const generatePrivilege = async(req,res) =>{
    try {
        const countPri = await Privilege.estimatedDocumentCount();

        if(countPri > 0) return;

        const values = await Promise.all([
            new Privilege({
                name:"lectura"
            }).save(),
            new Privilege({
                name:"lectura y escritura"
            }).save()
        ])


    
    } catch (error) {
        
    }
}
const generateQuestions = async(req,res) =>{
    try {
        const count = await Secret.estimatedDocumentCount();

        if(count > 0) return;

        const values = await Promise.all([
            new Secret({
                key:"colorFavorito",
                question:"¿Cuál es tu color favorito?"
            }).save(),
            new Secret({
                key:"nombreMascota",
                question:"¿Cómo se llama tu primera mascota?"
            }).save(),
            new Secret({
                key:"ciudadNacimiento",
                question:"¿En qué ciudad naciste?"
            }).save(),
            new Secret({
                key:"comidaFavorita",
                question:"¿Cuál es tu comida favorita?"
            }).save()
        ])


    
    } catch (error) {
        
    }
}

generateQuestions();
generatePrivilege();