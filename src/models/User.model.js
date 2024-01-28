import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        minLength: [3, 'La contraseña debe tener al menos 8 caracteres']
    },
    lastName: {
        type: String,
        require: true,
        minLength: [3, 'La contraseña debe tener al menos 8 caracteres']
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un correo electrónico válido'],
    },
    password:{
        type: String,
        unique: true,
        minLength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    projects:[
        {
            type:Schema.Types.ObjectId,
            ref:'projects'
        }
    ]
},{
    timestamps: true,
    versionKey: false
});
userSchema.statics.ecryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
userSchema.statics.comparePassword = async (password, receivedPassword) =>{
    return await bcrypt.compare(password, receivedPassword);
}

export default model('User',userSchema);