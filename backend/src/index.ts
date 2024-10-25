import express, {Request,Response} from "express"
import cors from "cors"
import "dotenv/config" 
import mongoose from "mongoose"


mongoose.connect(process.env.MONGODB_URL as string).then(()=>console.log("Connected to DB"))


const app = express()
app.use(express.json())
app.use(cors())

app.get("/test",async (req:Request, res: Response)=>{
    res.json({message: "Hello!"});
})

app.listen(8000,()=>{
    console.log("SERVER STARTED AT : 8000")
})