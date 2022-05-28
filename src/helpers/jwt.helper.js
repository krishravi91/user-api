import  jwt  from 'jsonwebtoken';
import UserToken from '../model/user/User.Token.js';
import {getUserByEmail} from "../model/user/user.model.js";
import { storeUserRefreshJWT } from '../model/user/user.model.js';

const generateToken = async(email, _id) =>{

    try{
        //  const payload = { _id: user._id, roles: user.roles };
        const user = await getUserByEmail(email);

         const accessJWT =  jwt.sign( 
            {email} , 
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: '15m'}
        );
        
        
        const refreshJWT = jwt.sign(
             {email} , 
             process.env.JWT_ACCESS_SECRET,
             {expiresIn: '30d'}
        );   

        await storeUserRefreshJWT(_id,refreshJWT)
        
        const userToken = await UserToken.findOne({ userId: user._id });
		if (userToken) await userToken.remove();

        await new UserToken({ userId: user._id, token: refreshJWT }).save();
		return Promise.resolve({ accessJWT, refreshJWT });
         
    }catch (err) {
        return Promise.reject(err);
    }
    
}


// const createRefreshJWT = (payLoad) =>{
//     const refreshJWT = jwt.sign({ payLoad }, 
//         process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'});

//     return Promise.resolve(refreshJWT)
// }


export default generateToken;