const userApi = {

    __url__ : 'https://shrouded-retreat-99966.herokuapp.com/api', 
    // __url__ : 'http://localhost:8000/api', 

    registerUser(name, username, email, password) {

        if (typeof name !== 'string') throw Error(`name is not a string`)
        if (!name.trim().length) throw Error(`name is empty`)

        if (typeof username !== 'string') throw Error(`username is not a string`)
        if (!username.trim().length) throw Error(`username is empty`)

        if (typeof email !== 'string') throw Error(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof password !== 'string') throw Error(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)

        return fetch(`${this.__url__}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name,
                username,
                email,
                password
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return 
        })

    },

    loginUser(email, password) {

        if (typeof email !== 'string') throw Error(`email is not a string`)
        if (!email.trim().length) throw Error(`email is empty`)

        if (typeof password !== 'string') throw Error(`password is not a string`)
        if (!password.trim().length) throw Error(`password is empty`)

        return fetch(`${this.__url__}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return response
        })

    },

    retrieveUser(userToken) {
       
        if (typeof userToken !== 'string') throw Error(`userToken is not a string`)
        if (!userToken.trim().length) throw Error(`userToken is empty`)

        return fetch(`${this.__url__}/user/get/`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${userToken}` 
            }
        
        })
        
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return response
        })
    },

    updateUser(userToken, userData) {
        
        if (typeof userToken !== 'string') throw Error(`userToken is not a string`)
        if (!userToken.trim().length) throw Error(`userToken is empty`)
        
        if (userData.constructor !== Object) throw TypeError(`userData is not an Object`)

        return fetch(`${this.__url__}/user/update/`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${userToken}` 
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return 
        })
    },

    searchCongresses(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return fetch(`${this.__url__}/congress/search?q=${query}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return response.results
        })
    },

    searchArtist(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return fetch(`${this.__url__}/artist/search?q=${query}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return response.results
        })
    },

    searchItems(query) {

        if (typeof query !== 'string') throw Error(`query is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return fetch(`${this.__url__}/search/items?q=${query}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return response.results
        })
    },

    createArtist(artistData, token ) {
        
        if (artistData.constructor !== Object) throw TypeError(`artistData is not an Object`)

        if (typeof token !== 'string') throw Error(`token is not a string`)
        if (!token.trim().length) throw Error(`token is empty`)

        return fetch(`${this.__url__}/artist/create/`, {
            method: 'POST',
            headers: { 
                'authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(artistData)
        })
        .then(response => response.json())
        .then(response => {
            
            if (response.error) throw Error(response.error)
            return 
        })

    },


    retrieveArtists() {

        return fetch(`${this.__url__}/artist/list`, {
            method: 'GET',
            headers: { 'Content-Type' : 'application/json'},
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return response.artists
        })
    },


    createCongress(data, token) {

        if (data.constructor !== Object) throw TypeError(`data is not an Object`)

        if (typeof token !== 'string') throw Error(`token is not a string`)
        if (!token.trim().length) throw Error(`token is empty`)

        return fetch(`${this.__url__}/congress/create`, {
            method: 'POST',
            headers: { 
                'authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            
            if (response.error) throw Error(response.error)
            return 
        })

    },

    toggleFavorites(userId, token) {

        if (typeof token !== 'string') throw Error(`token is not a string`)
        if (!token.trim().length) throw Error(`token is empty`)

        return fetch(`${this.__url__}/favorites/${userId}`, {
            method: 'POST',
            headers: { 
                'authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return 
        })

    },

    itemDetail(itemId) {
        // todo

    
        return fetch(`${this.__url__}/item/detail/${itemId}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)
            return response
        })
    }

}

export default userApi