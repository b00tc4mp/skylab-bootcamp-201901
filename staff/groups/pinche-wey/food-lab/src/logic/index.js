import normalize from '../common/normalize'
import validate from '../common/validate'
import userApi from '../data/user-api'
import recipeApi from '../data/recipe-api'
import { LogicError, RequirementError } from '../common/errors'


const logic = {
    set __userId__(id) {
        sessionStorage.userId = id
    },

    get __userId__() {
        return normalize.undefinedOrNull(sessionStorage.userId)
    },

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userId__ && this.__userToken__)
    },

    registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'confirmEmail', value: confirmEmail, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'confirmPassword', value: confirmPassword, type: 'string', notEmpty: true },
            { name: 'confirmAge', value: confirmAge, type: 'boolean', notEmpty: true },
            { name: 'confirmConditions', value: confirmConditions, type: 'boolean', notEmpty: true },
        ])

        validate.email(email)

        if (password.length < 6) throw new RequirementError('Password too short!')
        if (password !== confirmPassword) throw new RequirementError('Password do not match!')
        if (email !== confirmEmail) throw new RequirementError('Email do not match!')
        if (!confirmAge) throw new RequirementError('Age is not confirmed!')
        if (!confirmConditions) throw new RequirementError('Conditions are not confirmed')

        return userApi.create(email, password, { name, surname })
            .then(response => {
                if (response.status === 'OK') return

                throw new LogicError(response.error)
            })
    },


    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return userApi.authenticate(email, password)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { id, token } } = response

                    this.__userId__ = id
                    this.__userToken__ = token
                } else throw new LogicError(response.error)
            })
    },

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { name, surname, username: email } } = response

                    return { name, surname, email }
                } else throw new LogicError(response.error)
            })
    },

    updateUser(data){
        validate.arguments([
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])
        return userApi.update(this.__userId__, this.__userToken__, data)
            .then(response => {
                if(response.status === 'OK') {
                    return response
                } else throw new LogicError(response.error)
            })
    },

    logoutUser() {
        sessionStorage.clear()
    },

    searchRecipes(query, selector) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' },
            { name: 'selector', value: selector, type: 'string' }
        ])

        return recipeApi.searchRecipes(query, selector)
    },

    retrieveRecipe(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return recipeApi.retrieveRecipe(id)
    },

    retrieveRandomRecipes() {
        return recipeApi.searchRecipes("", 'random.php')
    },

    updateBook(id, _done) { // Para hace favorito una receta , quitarla y para pasarla a hecha
        validate.arguments([
            { name: 'id', value: id, type: 'string' },
            { name: 'done', value: _done, type: 'boolean', optional: true }
        ])

        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response
                const { wanted = [], done = [], notes = [], forks = [] } = data

                if (status === 'OK' && !_done) { //Esto sirve de toggle para Wanted
                    const indexWanted = wanted.indexOf(id)
                    const indexDone = done.indexOf(id)

                    if (indexWanted < 0 && indexDone < 0) wanted.push(id)
                    else if (indexDone < 0) wanted.splice(indexWanted, 1)

                    return userApi.update(this.__userId__, this.__userToken__, { wanted })
                        .then(() => { })

                } else if (status === 'OK') { //Esto sirve para pasarlo de wanted a done y añadirle una nota 
                    const indexWanted = wanted.indexOf(id)

                    if (indexWanted > -1) {
                        wanted.splice(indexWanted, 1)
                        done.push(id)
                        notes.push("")
                        forks.push(0)


                        return userApi.update(this.__userId__, this.__userToken__, { wanted, done, notes, forks })
                            .then(() => { })

                    } else throw new RequirementError("To mark it as done it has to be on the waiting list")

                }

                throw new LogicError(response.error)
            })

    },

    retrieveBook(print) {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { wanted = [], done = [], notes = [], forks = [] } = data

                    if (!print) return [wanted, done, notes, forks]

                    let calls

                    if (print[0] === wanted[0]) calls = wanted.map(recipe => recipeApi.retrieveRecipe(recipe))
                    else if (print[0] === done[0]) calls = done.map(recipe => recipeApi.retrieveRecipe(recipe))
                    else throw new RequirementError("You should send Wanted or Done as a argument")

                    return Promise.all(calls)
                        .then(printing => {

                            const toshow = printing.map(({ meals }) => meals)
                            return toshow
                        })

                } else throw new LogicError(response.error)
            })
    },

    updatingNotes(index, changes, notes) {

        notes[index] = changes

        return userApi.update(this.__userId__, this.__userToken__, { notes })
            .then(() => { })
    }

}

export default logic