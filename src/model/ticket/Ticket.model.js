import {tScheme} from "./Ticket.schema.js";


const insertTicket = (ticketObj) =>{
    // console.log(ticketObj);
    return new Promise((resolve, reject )=>{
        try{
            tScheme(ticketObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error){
            reject(error)
        }
    }) 
}

export {insertTicket}