import { Schema, model } from "mongoose";


const userSchema = new Schema({
    namePoject: {
        type: String,
        required: true,
    },
    createBy:{
        type: Schema.Types.ObjectId,
        require: true
    },
    tasks:[{
        type: Schema.Types.ObjectId,
        ref:'tasks'
    }],
    started:{
        type: Date
    },
    finished:{
        type: Date
    }
    
},{
    timestamps: true,
    versionKey: false
});


export default model('Project',userSchema);