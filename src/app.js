import  express  from "express";
import morgan from "morgan";
import cors from 'cors';
import products from "./routes/producs.routes"
import user from "./routes/user.routes"

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

export default app;