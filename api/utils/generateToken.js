import jwt from 'jsonwebtoken';

const generateToken =  function(id){
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"20d"
    })
}


export default generateToken;