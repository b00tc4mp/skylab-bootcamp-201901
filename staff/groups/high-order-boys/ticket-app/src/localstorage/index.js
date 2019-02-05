'use strict'
let storage = sessionStorage
const userStorage = {

    auth: JSON.parse(storage.getItem('auth')) || null,
    
    setUserToken(){
        this.auth = JSON.parse(storage.getItem('auth'))
    },
    
    saveUserToken(userData) {
        if(userData.constructor !== Object) throw TypeError('userData has to be an Object instance')

        storage.setItem('auth', JSON.stringify(userData))
        this.setUserToken()
    },  

    deleteUserToken(){
        storage.removeItem('auth')
        this.auth = null
    }
}

export default userStorage
