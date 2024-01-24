import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un correo electrónico válido'],
    },
    password:{
        type: String,
        unique: true,
    },

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