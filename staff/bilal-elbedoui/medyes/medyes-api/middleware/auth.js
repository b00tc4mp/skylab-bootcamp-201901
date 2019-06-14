const jwt = require('jsonwebtoken')
const { env: { jwtPrivateKey }} = process


module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided')
    
    try{
        debugger
        const {userId , orgId}= jwt.verify(token, jwtPrivateKey);
        
        req.userId = userId;
        if(orgId) req.orgId = orgId
        debugger        
        next();
        debugger
    }catch(ex){

        res.status(400).send('Invalid token.')

    }
}