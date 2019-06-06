const jwt = require('jsonwebtoken')
const { env: { jwtPrivateKey }} = process


module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided')
    
    try{
        debugger
        const {sub , org}= jwt.verify(token, jwtPrivateKey);
        
        req.userId = sub;
        if(org) req.orgId = org

        next();

    }catch(ex){

        res.status(400).send('Invalid token.')

    }
}