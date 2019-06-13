import normalize from '../common/normalize'
import users from '../data/users'
import events from '../data/events'
import organization from '../data/organizations'
import {LogicError} from '../common/errors'

const logic = {

    set __userToken__(token) {
        window.sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    registerUser(fullname, email, role, organization, phone, position, password, password1) {
        if (password !== password1) throw Error('pasword nooooooo')
            return (async () => {
                
                
                if (organization === "") organization = undefined
                try{
                    const response= await users.createUser(fullname, email, role, organization, phone, position, password)
                    return response
                }catch(error){
                    return error.response
                }
            })()
   },

    login(email, password) {
        return (async () => {
            try {
                const response = await users.authenticateUser(email, password)
                
                const { data: { token } } = response
    
                this.__userToken__= token
            } catch (error) {
                throw new LogicError(error.message)
            }    
        })()
    },
    logout(){
        sessionStorage.clear()
    },

    retrieveUser() {
        return (async () => {
            try {
               return await users.retrieveUser(this.__userToken__)

            } catch (error) {
                throw new LogicError(error.message.data.error)
            }
        })()
    },
    retrieveEvents(field, type){
        field = field === '' ? 'undefined' : field
        type = type === '' ? 'undefined' : type

        return (async()=>{
            try{
                const event = await events.retrieveEvents(this.__userToken__, field , type)
                
                return event
            }catch(error){
                throw new LogicError(error)
    
            }
        })()
    },
    retrieveEvent(id){

        return (async()=>{
            try{
                return await events.retrieveOneEvent(this.__userToken__,id)
            }catch(error){
                throw new LogicError(error)
            }
        })()
    },
    createEvent(title, description, medicalField, eventType, location, date, numberTicketsAvailable, price, image){
        return(async()=>{
                try{
                    return await events.publishEvent(this.__userToken__,title, description, medicalField, eventType, location, date, parseInt(numberTicketsAvailable), parseInt(price), image)

                }catch(error){
                    throw new LogicError(error)
                }
        })()
    },
    publishComment(id, text){
        return(async()=>{
            try{
                debugger
                return await events.sendComment(id, this.__userToken__, text)
            }catch(error){
                throw new LogicError(error)
            }
        })()
    },
    createOrganization(name,phone,address,mail){

        return (async()=>{
            try{
               return await organization.addOrganization(this.__userToken__, name,phone,address,mail)
            }catch(error){
                throw new LogicError(error)
            }
        })()
    }
}

export default logic