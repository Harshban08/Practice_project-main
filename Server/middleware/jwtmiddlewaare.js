const jwt = require('jsonwebtoken');

const generateToken=(userData)=>{
    //In this function we are creating a new JWTToke to provide user, for login/Session management or for the authorization perpose
    return jwt.sign(userData,process.env.PRIVATE_KEY)
}

const validateJwtToken = (req,res,next)=>{
    //first we are checking that JWT token is available or not
    const authorization=req.headers.authorization;
    //Output: 1. Bearer String
    //Output: 2. String
    //Output: 3. _____
    //Output: 4. Token bana hi nahi

    if(!authorization){
        return res.status(401).json({err:'Token not available'})
    }

    //We are storing the token value from headers and spliting to get "bearer xyz.abc.kjh" to "xyz.abc.kjh"
    const token = req.headers.authorization.split(' ')[1]

    //Token provided is wrong throw err message
    if(!token){
        return res.status(401).json({err:"Unauthorized User"});
    }

    try{

        //In this error handler try catch: we are handling, if token is validated ot verified, then move to next middleware or respond back to client.
        const validateToken=jwt.verify(token,process.env.PRIVATE_KEY);
        // if(validateToken){

        // }

        req.user = validateToken;
        next();
    }
    catch(err){
        console.error("Error Occured",err.message);
    }

}

module.exports = {generateToken,validateJwtToken};