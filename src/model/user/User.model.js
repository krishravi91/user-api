import {uSchema} from "./User.Schema.js";

const insertUser = (userObj) => {
    return new Promise((resolve,reject) => {
        uSchema(userObj)
        .save()
        .then(data => resolve(data))
        .catch(error => reject(error));
    }) 
    
};

const getUserByEmail = email => {
    
    return new Promise((resolve,reject)=>{

    if(!email) return false

    try{
        uSchema.findOne({email},(error,data) => {
            if(error){
                console.log(error)
                reject(error)
            }
            resolve(data)
        })
    } catch (error) {
        reject(error)
    }
  
})

}

const storeUserRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
      try {
        uSchema.findOneAndUpdate(
          { _id },
          {
            $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
          },
          { new: true }
        )
          .then((data) => resolve(data))
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

export {insertUser, getUserByEmail, storeUserRefreshJWT};