import  express  from "express";
import morgan from "morgan";
import cors from 'cors';

//routes
import products from "./routes/producs.routes"
import user from "./routes/user.routes"
import project from "./routes/project.routes"
import task from "./routes/task.routes"



const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.json({
        msg:"Welcome to apiSoftionPro"
    })
})

app.use('/api/products',products);
app.use('/api/auth',user);
app.use('/api/projects',project);
app.use('/api/task',task);

app.use((req, res, next) =>{
    res.status(404).json({message:"Routa incorrecta"});
  });
  

export default app;