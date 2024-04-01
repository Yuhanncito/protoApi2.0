import { Schema, model } from "mongoose";


const userSchema = new Schema({
    idParticipate: {
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    idPropietary:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    idWorkSpace:{
        type:Schema.Types.ObjectId,
        ref:'workspaces',
        required: true,
    }
},{
    timestamps: true,
    versionKey: false
});


export default model('Invitation',userSchema);