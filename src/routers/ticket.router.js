import express from "express";
import {insertTicket} from "../model/ticket/Ticket.model.js"
const router = express.Router();

router.all('/',(req,res, next)=>{
    // res.json({message:"new ticket route"});

    next();
});

router.post('/', async(req,res)=>{

    try{
        const {subject, sender, message} = req.body;
    const userId= req.userId;

    const ticketObj = {
        clientId: userId,
        subject,
        conversations:[
            {
                sender,
                message
            }
        ]
    }

    const result = await insertTicket(ticketObj);
    console.log(result)
    if(result._id){
        return res.json({status:'success', message:"new ticket created successfully"})
    }


    res.json({status:'error', message:"unable to create a new ticket"});


    } catch (error){
        res.json({status:'error', message:error.message});

    }
    
});

export {router as ticketRouter};