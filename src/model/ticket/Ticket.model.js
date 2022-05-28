import {tScheme} from "./Ticket.schema.js";


const insertTicket = (ticketObj) =>{
    // console.log(ticketObj);
    return new Promise((resolve, reject )=>{
        try{
            // console.log(tScheme);
            tScheme(ticketObj)
            .save()
            .then((data) => resolve(data))
            // .then(console.log(data))
            .catch((error) => reject(error))
        } catch (error){
            reject(error)
        }
    }) 
}

export {insertTicket}