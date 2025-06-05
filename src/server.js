import express from 'express';
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/tasks.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app=express();
const PORT=process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/',(req,res)=>{
    res.send("okay working just fine");
})

app.listen(PORT,()=>{
    console.log(`Listening at port:${PORT}`);
})