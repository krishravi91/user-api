import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = plainPassword =>{
    return new Promise(resolve =>{
        resolve(bcrypt.hashSync(plainPassword, saltRounds))
    });
};

const comparePassword = (painPass, passFromDb) =>{
    return new Promise((resolve,reject) =>{
        console.log(painPass,passFromDb);
        bcrypt.compare(painPass,passFromDb,function(err, result) {
            if(err) reject(err);

            resolve(result);
        });
    });
};

export {hashPassword, comparePassword}