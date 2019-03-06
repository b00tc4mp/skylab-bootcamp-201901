'use strict'
// import RegisterSection from '../components/Register/index'

const userApi = {

    register(name, surname, username, password) {


        return fetch('https://skylabcoders.herokuapp.com/api/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, username: username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return response.data
                else throw Error(response.error)
            })
    },

    authentification(username, password) {

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('http://skylabcoders.herokuapp.com/api/auth', {


            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username: username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response
                if (status === 'OK') return response.data

                else throw Error(response.error)
            })

    },

    retrieve(token, id) {

        return fetch(`http://skylabcoders.herokuapp.com/api/user/${id}`, {


            method: 'GET',
            headers: {
                'bearer-token': `${token}`
            },
            body: JSON.stringify({ username: username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response
                if (status === 'OK') return response.data

                else throw Error(response.error)
            })

    },



    // delete(username, password, token, id) {

    //     return fetch(`http://skylabcoders.herokuapp.com/api/user/${id}`, {

    //         method: 'DELETE',
    //         headers: {
    //             'content-type': 'application/json',
    //             'bearer-token': `${token}`
    //         },
    //         body: JSON.stringify({ username: username, password })
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             const { status } = response
    //             if (status === 'OK') return response.data

    //             else throw Error(response.error)
    //         })

    // }

}






export default userApi