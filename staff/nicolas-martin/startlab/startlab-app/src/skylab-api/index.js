require("dotenv").config()
const { env: { URL_API } } = process

const skylabApi = {
    url: 'https://mighty-brushlands-87259.herokuapp.com/api/',
    // url: 'http://localhost:8000/api', 

    registerUser(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('password confirm cannot be empty')

        if (password !== passwordConfirm) throw Error('passwords do not match')

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
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password cannot be empty')

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

    exerciseList(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

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

    deleteExercise(id, token) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/exercise/delete/${id}`, {
            method: 'DELETE',
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

    retrieveExercise(exerciseId, token) {
        if (typeof exerciseId !== 'string') throw TypeError(`${exerciseId} is not a string`)
        if (!exerciseId.trim().length) throw Error('exerciseId cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/exercise/${exerciseId}`, {
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

    updateExercise(exercise, token) {
        if (exercise.constructor !== Object) throw TypeError(`${exercise} is not an object`)

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/exercise/update`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(exercise)
        })
            .then(response => response.json())
            .then(({ error, message }) => {
                if (error) throw Error(error)

                return message
            })
    },

    createExercise(exercise, token) {
        if (exercise.constructor !== Object) throw TypeError(`${exercise} is not an object`)

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/exercise/create`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(exercise)
        })
            .then(response => response.json())
            .then(({ error, message }) => {
                if (error) throw Error(error)

                return message
            })

    },

    checkCode(answer, exerciseId, token) {
        if (typeof answer !== 'string') throw TypeError(`${answer} is not a string`)
        if (!answer.trim().length) throw Error('answer cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        if (typeof exerciseId !== 'string') throw TypeError(`${exerciseId} is not a string`)
        if (!exerciseId.trim().length) throw Error('exerciseId cannot be empty')

        return fetch(`${this.url}/checkanswer`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ answer, exerciseId })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.error) throw Error(response.error)

                return response
            })

    },

    updateExerciseFromUser(historicalId, answer, token) {
        if (typeof historicalId !== 'string') throw TypeError(historicalId + ' is not a string')
        if (!historicalId.trim().length) throw Error('historicalId cannot be empty')

        if (typeof answer !== 'string') throw TypeError(answer + ' is not a string')
        if (!answer.trim().length) throw Error('answer cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/user/historical/update`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ historicalId, answer })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)
                return response
            })

    },

    invitationList(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/invitation/list`, {
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

    deleteInvitation(id, token) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('invitationId cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/invitation/delete/${id}`, {
            method: 'DELETE',
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

    exerciseFromUser(token) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/student/start`, {
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

    getInvitation(invitationId, token) {
        if (typeof invitationId !== 'string') throw TypeError(`${invitationId} is not a string`)
        if (!invitationId.trim().length) throw Error('invitationId cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/invitation/${invitationId}`, {
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

    updateInvitation(invitation, token) {
        if (invitation.constructor !== Object) throw TypeError(`${invitation} is not an object`)

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/invitation/update`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(invitation)
        })
            .then(response => response.json())
            .then(({ error, message }) => {
                if (error) throw Error(error)

                return message
            })
    },

    createInvitation(invitation, token) {
        if (invitation.constructor !== Object) throw TypeError(`${invitation} is not an object`)

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/admin/invitation/create`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(invitation)
        })
            .then(response => response.json())
            .then(({ error, message }) => {
                if (error) throw Error(error)

                return message
            })

    },

    sendEmailInvitation(token, invitation) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        if (invitation.constructor !== Object) throw TypeError(`${invitation} is not an object`)

        return fetch(`${this.url}/admin/email/invitation`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(invitation)
        })
            .then((response) => response.json())
            .then(({ message }) => message)

    }


}

export default skylabApi