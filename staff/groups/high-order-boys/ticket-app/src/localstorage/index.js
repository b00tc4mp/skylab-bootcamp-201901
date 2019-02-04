'use strict'

const userStorage = {

    auth: JSON.parse(localStorage.getItem('auth')) || null,
    
    setUserToken(){
        this.auth = JSON.parse(localStorage.getItem('auth'))
    },
    
    saveUserToken(userData) {
        localStorage.setItem('auth', JSON.stringify(userData))
        this.setUserToken()
    },  

    deleteUserToken(){
        localStorage.removeItem('auth')
        this.auth = null
    }
}

export default userStorage
