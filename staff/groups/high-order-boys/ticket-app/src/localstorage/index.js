'use strict'

const userStorage = {

    auth: JSON.parse(localStorage.getItem('auth')) || null,
    
    setUserToken(){
        this.auth = JSON.parse(localStorage.getItem('auth'))
    },
    
    saveUserToken(userData) {
        if(userData.constructor !== Object) throw TypeError('userData has to be an Object instance')

        localStorage.setItem('auth', JSON.stringify(userData))
        this.setUserToken()
    },  

    deleteUserToken(){
        localStorage.removeItem('auth')
        this.auth = null
    }
}

export default userStorage
