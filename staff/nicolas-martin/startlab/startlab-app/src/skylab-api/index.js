const skylabApi = {
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

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(({ id, error }) => {
                if (error) throw Error(error)

                return id
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

                return response
            })
    },

    isAdmin(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/isadmin`, {
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

    exerciseList(token){
        // /admin/exercise/list
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/admin/exercise/list`, {
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

    checkCode(token, code, test) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof code !== 'string') throw TypeError(`${code} is not a string`)
        if (!code.trim().length) throw Error('code is empty')

        if (typeof test !== 'string') throw TypeError(`${test} is not a string`)
        if (!test.trim().length) throw Error('test is empty')

        return fetch(`${this.url}/testing`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ code, test })
        })
          .then(response => response.json()) 
          .then(response => {
              if (response.error) throw Error(response.error)

              return response
          })

    }

    // retrieveUser(token) {
    //     if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
    //     if (!token.trim().length) throw Error('token is empty')

    //     return fetch(`${this.url}/user`, {
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // },

    // updateUser(token, data) {
    //     if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
    //     if (!token.trim().length) throw Error('token is empty')

    //     if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

    //     return fetch(`${this.url}/user`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // },

    // removeUser(token, email, password) {
    //     if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
    //     if (!token.trim().length) throw Error('token is empty')

    //     if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
    //     if (!email.trim().length) throw Error('email is empty')

    //     if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
    //     if (!password.trim().length) throw Error('password is empty')

    //     return fetch(`${this.url}/user`, {
    //         method: 'DELETE',
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ email, password })
    //     })
    //         .then(response => response.json())
    //         .then(response => {
    //             if (response.error) throw Error(response.error)

    //             return response
    //         })
    // }
}

export default skylabApi