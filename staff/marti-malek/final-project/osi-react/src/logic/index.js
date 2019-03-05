import osiApi from '../osi-api'

const logic = {

    __userApiToken__: null,

    /**
     * Checks if user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userApiToken__ = null
    },

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

        return osiApi.register(name, surname, email, password, passwordConfirm)
    },

    login(email, password) {

        if (typeof email !== 'string') throw TypeError(`${email} should be a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} should be a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        return osiApi.login(email, password)
            .then(token => this.__userApiToken__ = token)
    },

    retrieve() {
        return osiApi.retrieve(this.__userApiToken__)
    },

    update(data) {
        if (!data) throw Error('data must exist')

        if (data.constructor !== Object) throw TypeError(`${data} should be an object`)

        return osiApi.update(this.__userApiToken__, data)
    },

    remove() {
        return osiApi.remove(this.__userApiToken__)
    }
}

export default logic