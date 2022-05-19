import express from "express";
const router = express.Router();

router.all('/',(req,res, next)=>{
    res.json({message:"new ticket route"});
});

export {router as ticketRouter};