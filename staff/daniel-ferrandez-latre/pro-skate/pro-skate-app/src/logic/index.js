const { validate,  errors: { LogicError } } = require('pro-skate-common')
const dataApi = require('../data')

const logic = {
  set __userToken__(token) {
      sessionStorage.userToken = token
  },

  get __userToken__() {
      return sessionStorage.userToken
  },

  get isUserLoggedIn() {
      return !!this.__userToken__
  },

  registerUser(name, surname, email, password, age) {
      validate.arguments([
          { name: 'name', value: name, type: 'string', notEmpty: true },
          { name: 'surname', value: surname, type: 'string', notEmpty: true },
          { name: 'email', value: email, type: 'string', notEmpty: true },
          { name: 'password', value: password, type: 'string', notEmpty: true },
          { name: 'age', value: age, type: 'string', notEmpty: true }
      ])

      validate.email(email)

      return ( async ()=> {
        try{
          await dataApi.createUser(name, surname, email, password, age)
        }catch(err){
          throw new LogicError(err.message)
        }
      })()
  },

  loginUser(email, password){
    validate.arguments([
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true }
  ])
  validate.email(email)
  return ( async ()=> {
    try{
      this.__userToken__= await dataApi.authenticate( email, password )
    }catch(err){
      throw new LogicError(err.message)
    }
  })()
  }


}

module.exports = logic