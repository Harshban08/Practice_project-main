const jwd = require('jsonwebtoken');

const createToken = jwt.sign(payLoad,process.env.PRIVATE_KEY,(err,token)=>{
    if(err){
        console.error("INVALID:",err.message)
    }
    else{
        console.log(token);
    }
})

const validateToken= jwt.verify(token,process.env.PRIVATE_KEY); 

jwt.verify(token,process.env.PRIVATE_KEY,function(err,decoded){
    console.log(decoded.foo)
})

try{
    var decode = jwt.verify(token,'wrong-secret');
} catch(err){
    console.log("Token verification failed",err.message);
}