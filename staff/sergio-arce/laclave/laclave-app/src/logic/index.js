import userApi from '../api/user-api'

const logic = {

    create(img) {
        console.log('logic', img)
    },
    
    registerUser(name, username, email, emailConfirm, password, passwordConfirm) {
    
        if (typeof name !== 'string') throw Error(`name is not a string`)
        if (!name.trim().length) throw Error(`name is empty`)

        if (typeof username !== 'string') throw Error(`username is not a string`)
        if (!username.trim().length) throw Error(`username is empty`)

        if (typeof email !== 'string') throw Error(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof emailConfirm !== 'string') throw Error(`emailConfirm is not a string`)
        if (!emailConfirm.trim().length) throw Error(`emailConfirm is empty`)

        if (email !== emailConfirm ) throw Error(`email and emailConfirm are diferent`)

        if (typeof password !== 'string') throw Error(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)

        if (typeof passwordConfirm !== 'string') throw Error(`passwordConfirm is not a string`)
        if (!passwordConfirm.trim().length) throw Error(`passwordConfirm is empty`)

        if (password !== passwordConfirm ) throw Error(`${password} and ${passwordConfirm} are diferent`)

        return userApi.registerUser(name, username, email, password)
        
    },

    loginUser(email, password) {

        if (typeof email !== 'string') throw Error(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof password !== 'string') throw Error(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)

        return userApi.loginUser(email, password)
        .then(data => {
            
            sessionStorage.userToken = data.token
        })
    },

    get isUserLoggedIn() {
        
        return  (sessionStorage.userToken !== undefined) 
    },
    
    logOutUser() {
        sessionStorage.clear()
    },

    retrieveUser() {
        
        const userToken =  sessionStorage.userToken
        return userApi.retrieveUser(userToken)

    },

    updateUser(userData) {

        if (userData.constructor !== Object) throw TypeError(`${userData} is not an Object`)
       
        
        const userToken =  sessionStorage.userToken

        return userApi.updateUser(userToken, userData)
    },


    searchCongresses(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return userApi.searchCongresses(query)

    },

    searchArtist(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return userApi.searchArtist(query)
    },

    searchItems(query) {
        
        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return userApi.searchItems(query)
        
    },

    createArtist(artistData){
        
        if (artistData.constructor !== Object) throw TypeError(`${artistData} is not an Object`)
    
        const userToken = sessionStorage.userToken
        return userApi.createArtist(artistData, userToken)
    },

    retrieveArtists() {
        return userApi.retrieveArtists() 
            .then(response => response)
    },

    createCongress(data) {

        if (data.constructor !== Object) throw TypeError(`${data} is not an Object`)

        const token = sessionStorage.userToken

        return userApi.createCongress(data, token) 

    }
}

export default logic