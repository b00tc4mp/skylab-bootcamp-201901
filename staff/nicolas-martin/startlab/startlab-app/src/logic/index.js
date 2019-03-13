import skylabApi from '../skylab-api'

/**
 * Abstraction of business logic.
 */
const logic = {
    __userApiToken__: null,
    __isAdmin__: null,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')
        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')
        if (password !== passwordConfirmation) throw Error('passwords do not match')

        if (email.match(/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/) === null) throw Error(`${email} is not an email`)

        return skylabApi.registerUser(name, surname, email, password, passwordConfirmation)
            .then(() => { })
    },

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return skylabApi.authenticateUser(email, password)
            .then(response => {
                this.__userApiToken__ = response.token
                this.__isAdmin__ = response.isAdmin
            })
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userApiToken__ = null
        this.__isAdmin__ = null
    },

    /**
     * Checks if an user is admin
     */
    get isAdmin() {
        return this.__isAdmin__ === 'true'
    },

    exerciseList() {
        return skylabApi.exerciseList(this.__userApiToken__)
            .then(exercises => exercises)
    },

    deleteExercise(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return skylabApi.deleteExercise(id, this.__userApiToken__)
    },

    retrieveExercise(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return skylabApi.retrieveExercise(id, this.__userApiToken__)
    },

    updateExercise(exercise) {
        //Todo validate input data

        return skylabApi.updateExercise(exercise, this.__userApiToken__)
    },

    newExercise(exercise) {
        //Todo validate input data

        return skylabApi.createExercise(exercise, this.__userApiToken__)
    },

    checkCode(answer, exerciseId) {
        if (typeof answer !== 'string') throw TypeError(answer + ' is not a string')
        if (!answer.trim().length) throw Error('answer cannot be empty')

        if (typeof exerciseId !== 'string') throw TypeError(exerciseId + ' is not a string')
        if (!exerciseId.trim().length) throw Error('exerciseId cannot be empty')

        return skylabApi.checkCode(answer, exerciseId, this.__userApiToken__)
            .then(result => {
                if (!result.tests.length) throw Error('there was an error checking the answer. Please try again')
                return { passes: result.passes, failures: result.failures }
            })
    },

    retrieveExercisesFromUser() {
        return skylabApi.getExercisesFromUser(this.__userApiToken__)
            .then(exercises => exercises)
    },

    invitationList() {
        return skylabApi.invitationList(this.__userApiToken__)
            .then(invitations => invitations)
    },

    deleteInvitation(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return skylabApi.deleteInvitation(id, this.__userApiToken__)
    },

    retrieveInvitation(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return skylabApi.getInvitation(id, this.__userApiToken__)
    },

    updateInvitation(invitation) {
        //Todo validate input data

        return skylabApi.updateInvitation(invitation, this.__userApiToken__)
    },

    newInvitation(invitation) {
        //Todo validate input data

        return skylabApi.createInvitation(invitation, this.__userApiToken__)
    },

    sendEmailInvitation(invitation) {

        //todo

        return skylabApi.sendEmailInvitation(this.__userApiToken__, invitation)
    }
}

export default logic