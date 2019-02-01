

/**
 * Users API client.
 * 
 * @version 0.0.1
 */
const userApi = {
   
    register(name, surname, email, password) {
        return fetch(`http://skylabcoders.herokuapp.com/api/user`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'},
            body: JSON.stringify({name, surname, username: email, password, favorites: []})
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response
                
                if (status === 'OK') return response.data.id
                else throw Error(response.error)
            })
    },

    login(username, password){
        return fetch (`http://skylabcoders.herokuapp.com/api/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })

        .then (response => response.json())
        .then (response => {
            const { status, data } = response
                
                if (status === 'OK') return data
                else throw Error(response.error)

        })
    },

    retrieve(id, token) {
        return fetch (`http://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'GET',
            headers: { 
                authorization: `Bearer ${token}`}
        })

        .then (response => response.json())
        .then (response => {
            const { status, data } = response
                
                if (status === 'OK') return data
                else throw Error(response.error)

        })
    },

    update(id, token, addedItem) {
         return fetch (`http://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'PUT',
            headers: { 
                authorization: `Bearer ${token}`},
            body: JSON.stringify({addedItem})

        })

        .then (response => response.json())
        .then (response => {
            const { status } = response
                
                if (status === 'OK') return 
                else throw Error(response.error)

        })
    },

    remove(id, token, username, password) {
        return fetch (`http://skylabcoders.herokuapp.com/api/user/${id}`, {
            method: 'DELETEyarn ',
            headers: { 
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({username, password})
        })

        .then (response => response.json())
        .then (response => {
            const { status } = response
                
                if (status === 'OK') return true
                else throw Error(response.error)

        })
    }
}

export default userApi