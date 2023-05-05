import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
dotenv.config();
const app=express();

//it says that any post request will go to post routes and it will not start with ./ instead it will start with ./posts


app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded ({limit:"30mb",extended:true}));
app.use(cors());

app.use('/posts',postRoutes);
app.use('/user',userRoutes);
//since used '/user' from userRouted hence we will have to define it .. defined above

const PORT=process.env.PORT ||5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() =>app.listen(PORT,()=>console.log(`server running on port : http://localhost:${PORT}`)))
.catch((error)=>console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify',false);