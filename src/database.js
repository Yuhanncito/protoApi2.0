import mongoose from "mongoose";

mongoose.connect('mongodb+srv://apiServerClient:apiServer123@softiondb.uy6dflb.mongodb.net/softionpro?retryWrites=true&w=majority')
.then(db=>console.log('DB is Connect'))
.catch(err => console.log(err))