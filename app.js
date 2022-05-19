import dotenv from 'dotenv';
import express from "express";
const app = express()
// const cors = require("cors");
import cors from "cors";
import {userRouter} from "./src/routers/user.router.js";
import {ticketRouter} from "./src/routers/ticket.router.js";
import {handleError} from "./src/utils/errorHandler.js";
import mongoose from 'mongoose';

dotenv.config();

app.use(cors());

// app.use(express.urlencoded());
app.use(express.json());

const port = process.env.PORT || 3001;

//MongoDB connection setup
mongoose.connect(process.env.MONGO_URL);

if(process.env.NODE_ENV !== 'production'){
    const mDb = mongoose.connection;
    mDb.on("open", ()=> {
        console.log("mongodb connected")
    });
    mongoose.now("error", (error)=> {
        console.log(error)
    });
    
}

// const userRouter = require("./src/routers/user.router")

app.use("/v1/user",userRouter);
app.use("/v1/ticket",ticketRouter);

app.use('*',(req,res, next) => {
    const error = new Error("Resource not Found");
    error.status = 404; 

    next(error);
});

app.use((error, req,res,next) => {
    handleError(error,res);
})

app.listen(port, () => {
    console.log(`api is connected ${port}`)
})