// import call from '../../common/call'
// import ReactJoiValidations from 'react-joi-validation'
// import validate from 'react-joi-validation';
// import Joi from 'joi-browser'
const call = require('../../common/call')



const userRouter = {

    __url__:'http://localhost:8080/api/users',


    create({ fullname, email, role, organization, phoneNumber, situation, password }){
        debugger
        // validateRegisterUser({ fullname, email, role, organization, phoneNumber, situation, password })

        return call(`${this.__url__}`,{
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            data: { fullname, email, role, organization, phoneNumber, situation, password }
        })

    }
}


// function validateRegisterUser({ fullname, email, role, organization, phoneNumber, situation, password }) {
    
//     const schema = {
//         fullname: Joi.string().min(5).required(),
//         email: Joi.string().min(2).email().required(),
//         phoneNumber: Joi.string().min(9).required(),
//         role: Joi.string().required(),
//         organization: Joi.string(),
//         situation: Joi.string().required()
//         // password: new PasswordComplexity(complexityOptions).required()

//     }

//     return Joi.validate({ fullname, email, role, organization, phoneNumber, situation, password }, schema)
// }

// function validateAuthUser(user) {
    
//     const schema = {
//         email: Joi.string().min(9).email().required()
//         // password: new PasswordComplexity(complexityOptions).required()
//     }

//     return Joi.validate(user, schema)



module.exports= userRouter
