import { Schema, model } from "mongoose";


const userSchema = new Schema({
    nameTask: {
        type: String,
        require: true
    },
    descriptionTask: {
        type: String,
    },
    userTasks: [{
        ref:'users',
        type:Schema.Types.ObjectId
    }],
    timeHoursTaks:{
        type: Number,
    },
    projectRelation:{
        type: Schema.Types.ObjectId,
        ref:'projects',
        require:true
    }
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

export default model('Task',userSchema);