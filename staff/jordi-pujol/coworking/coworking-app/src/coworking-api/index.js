'use strict'

const coworkingApi = {
    url: 'http://localhost:8000/api',

    registerUser(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('password confirm is empty')
        debugger

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => {
                
                if (response.error) throw Error(response.error)

                return response.id
            })
    },

    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response.token
            })
    },

    retrieveUser(token) {
        console.log('this is my token' + token)
        if (typeof token == ! 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    removeUser(token, email, password) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ email, password })
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)

                return response
            })
    },

    createWorkspace(name, token){
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/workspace`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)

                return response
            })
    },

    createNewUserLink(token){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/workspace/link`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)
                console.log(response)
                return response.link
            })
    },

    verifyNewUserLink(token, link){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof link !== 'string') throw TypeError(`${link} is not a string`)
        if (!link.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/workspace/link`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ invitationId: link })
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)

                return response.workspaceId
            })
    },

    addUserToWorkspace(token, workspaceId){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof workspaceId !== 'string') throw TypeError(`${workspaceId} is not a string`)
        if (!workspaceId.trim().length) throw Error('workspaceId is empty')

        return fetch(`${this.url}/workspace/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ workspaceId })
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)
                
                if(response.status === 'OK')
                return response.status
            })
    },

    createService(token, title, description){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error('title is empty')

        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error('description is empty')

        return fetch(`${this.url}/service`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, description })
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)
                
                return response.serviceId
            })
    },

    retrieveWorkspaceServices(token, workspaceId){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof workspaceId !== 'string') throw TypeError(`${workspaceId} is not a string`)
        if (!workspaceId.trim().length) throw Error('workspaceId is empty')

        return fetch(`${this.url}/service/workspace/${workspaceId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)
                
                return response.services
            })
    },

    retrieveService(token, serviceId){
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof serviceId !== 'string') throw TypeError(`${serviceId} is not a string`)
        if (!serviceId.trim().length) throw Error('serviceId is empty')

        return fetch(`${this.url}/service/${serviceId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)
                return response.service
            })
    }
}

export default coworkingApi