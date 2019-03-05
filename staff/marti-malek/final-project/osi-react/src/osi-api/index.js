const osiApi = {
    url: 'http://localhost:8000/api/',

    register(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw TypeError(`${name} should be a string`)

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} should be a string`)

        if (!surname.trim().length) throw Error('surname cannot be empty')
    
        if (typeof email !== 'string') throw TypeError(`${email} should be a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} should be a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} should be a string`)

        if (!passwordConfirm.trim().length) throw Error('passwordConfirm cannot be empty')

        return fetch(this.url + '/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw response.error
                else return response
            })
    },

    login(email, password) {

        if (typeof email !== 'string') throw TypeError(`${email} should be a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} should be a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        return fetch(this.url + '/user/auth', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw response.error
                else return response
            })
    },

    retrieve(token) {

        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(this.url + '/user', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw response.error
                else return response
            })
    },

    update(token, data) {

        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!data) throw Error('data must exist')

        if (data.constructor !== Object) throw TypeError(`${data} should be an object`)

        return fetch(this.url + '/user/profile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw response.error
                else return response
            })
    }, 

    remove(token) {

        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(this.url + '/user', {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw response.error
                else return response
            })
    }

}

export default osiApi