import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import route from './Routes/route.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT 

app.use(morgan('tiny'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());


mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDB');
}).catch(err=>{
    console.log(`error at mongo db ${err}`)
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.use('/auth',route)