import express from "express";
// import { get } from "express/lib/response";
// import { json } from "express/lib/response.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import {insertUser, getUserByEmail} from "../model/user/user.model.js";
const router = express.Router();

router.all('/',(req,res, next)=>{
    // console.log(name);
    // res.json({message:"new user route"});

    next();
});

router.post('/', async(req,res) => {
    const {name,company,address, phone, email, password} = req.body;
   try{

    const hashedPassword = await hashPassword(password);

    const newUserObj = {
        name,
        company,
        address,
        phone,
        email,
        password: hashedPassword,
    };
        const result = await insertUser(newUserObj);
        console.log(result);
        res.json({message:"New USer Created",result});

   } catch (error){
       console.log(error);
       res.json({status:"error", message:error.message});
   }

    
});

//create new user router
router.post("/login", async (req,res) =>{
    console.log(req.body);
    const {email,password} = req.body;
    
    
    //hash and compare with the db

    if(!email || !password){
       return res.json({status:"error", message: "Invalid form submission"})
    }

    //get user with email from db

    const user = await getUserByEmail(email);
    // console.log(user);
    const passFromDb = user && user._id ? user.password :null

    if(!passFromDb) return res.json({status:"error", message: "Invalid form submission"}) 
    // console.log(passFromDb);
    const result = await comparePassword(password,passFromDb)
    console.log(result);


    res.json({status:"success", message: "Login Successful"})
})

export {router as userRouter};