import app from "./src/app";
import './src/database'
const PORT = process.env.PORT || 4000;

app.listen(PORT);

console.log("Server Start");