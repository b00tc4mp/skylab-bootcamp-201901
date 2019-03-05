const userApi = {
    url: 'http://localhost:8000/final-proyect/api',

    register(name, surname, age, description, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof age !== 'string') throw TypeError(`${age} is not a string`)
        if (!age.trim().length) throw Error('age is empty')

        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error('description is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, age, description, email, password ,passwordConfirmation })
        })
            .then(response => response.json())
            .then(response => {
                const { id  } = response

                 return id

                //throw Error(response.error)
            })
    },

    authenticate(email, password) {
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
                const {token} = response

                return token

            })
    },

    createEventUser(title, description, date, ubication, category,token){
        
        if (typeof title !== 'string') throw TypeError(title + ' is not a string')
        
        if (!title.trim().length) throw Error('title cannot be empty')
        
        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        
        if (!description.trim().length) throw Error('description cannot be empty')
        
        if (typeof date !== 'string') throw TypeError(date + ' is not a string')
        
        if (!date.trim().length) throw Error('date cannot be empty')
        
        if (typeof ubication !== 'string') throw TypeError(ubication + ' is not a string')
        
        if (!ubication.trim().length) throw Error('ubication cannot be empty')
        
        debugger
        
        if (typeof category !== 'string') throw TypeError(category + ' is not a string')
        
        if (!category.trim().length) throw Error('category cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/create-event/:id`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${this.token}`

            },
            body: JSON.stringify({ title, description, date, ubication, category })
        })
        .then(response => response.json())
        .then(response => {
            const {data:{id}, status} = response
            if(status === "OK") return id

            throw Error(response.Error)
        })
    }
}

export default userApi