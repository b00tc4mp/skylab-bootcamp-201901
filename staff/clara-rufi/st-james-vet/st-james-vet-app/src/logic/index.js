'use strict'


/**
 * Abstraction of business logic.
 */
const logic = {
    url: null,
    __userToken__: null,
    __userAdmin__: null,
    __updateToken__() {
        this.__userToken__ = sessionStorage.getItem('__userToken__')
    },

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname
    * @param {string} surname
    * @param {string} idCard
    * @param {string} phone
    * @param {string} adress
    * @param {string} city 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof idCard !== 'string') throw TypeError(idCard + ' is not a string')

        if (!idCard.trim().length) throw Error('idCard cannot be empty')

        if (typeof phone !== 'string') throw TypeError(phone + ' is not a string')

        if (!phone.trim().length) throw Error('phone cannot be empty')

        if (typeof adress !== 'string') throw TypeError(adress + ' is not a string')

        if (!adress.trim().length) throw Error('adress cannot be empty')

        if (typeof city !== 'string') throw TypeError(city + ' is not a string')

        if (!city.trim().length) throw Error('city cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },

            body: JSON.stringify({ name, surname, idCard, phone, adress, city, email, password, passwordConfirmation })
        })
            .then(response => response.json())
            .then(({ message, error }) => {
                if (error) throw Error(error)

                return message
            })
    },

    /**
    * Registers a owner's pet.
    * 
    * @param {string} owner 
    * @param {string} name 
    * @param {string} specie
    * @param {string} breed
    * @param {string} color
    * @param {string} gender
    * @param {string} birthdate
    * @param {string} microchip
    * @param {string} petlicence
    * @param {string} neutered
    * @param {string} vaccionations
    * @param {string} controls
    * @param {string} details
    */
    registerPet(owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details) {

        if (typeof owner !== 'string') throw TypeError(owner + ' is not a string')

        if (!owner.trim().length) throw Error('owner cannot be empty')

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof specie !== 'string') throw TypeError(specie + ' is not a string')

        if (!specie.trim().length) throw Error('specie cannot be empty')

        if (typeof breed !== 'string') throw TypeError(breed + ' is not a string')

        if (!breed.trim().length) throw Error('breed cannot be empty')

        if (typeof color !== 'string') throw TypeError(color + ' is not a string')

        if (!color.trim().length) throw Error('color cannot be empty')

        if (typeof gender !== 'string') throw TypeError(gender + ' is not a string')

        if (!gender.trim().length) throw Error('gender cannot be empty')

        if (typeof birthdate != 'string') throw TypeError(birthdate + ' is not a string')

        if (!birthdate.trim().length) throw Error('birthdate cannot be empty')

        if (typeof microchip != 'string') throw TypeError(microchip + ' is not a string')

        if (!microchip.trim().length) throw Error('microchip cannot be empty')

        if (typeof petlicence != 'string') throw TypeError(petlicence + ' is not a string')

        if (!petlicence.trim().length) throw Error('petlicence cannot be empty')

        if (typeof vaccionations != 'string') throw TypeError(vaccionations + ' is not a string')

        if (!vaccionations.trim().length) throw Error('vaccionations cannot be empty')

        if (typeof neutered != 'string') throw TypeError(neutered + ' is not a string')

        if (!neutered.trim().length) throw Error('neutered cannot be empty')

        if (typeof controls != 'string') throw TypeError(controls + ' is not a string')

        if (!controls.trim().length) throw Error('controls cannot be empty')

        if (typeof details != 'string') throw TypeError(details + ' is not a string')

        if (!details.trim().length) throw Error('details cannot be empty')

        return fetch(`${this.url}/pet`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details })
        })
            .then(response => response.json())
            .then(({ message, error }) => {
                if (error) throw Error(error)

                return message
            })
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

                this.__userToken__ = response.token
                this.__userAdmin__ = (response.role === 'admin')
                return response.token
            })
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userAdmin__ = null
        this.__userToken__ = null
        this.removeStorage()
        window.location.reload()
    },

    /**
     * Remove session storage
     */
    removeStorage() {
        sessionStorage.clear()
    },

    /**
     * Check if the user logged is adnim
     */
    get isAdmin() {
        return this.__userAdmin__ === 'true'
    },

    /**
     * Retrieve all users registered
     */
    retrieveUsers() {

        this.__updateToken__()
        return fetch(`${this.url}/users`, {

            headers: {
                authorization: `Bearer ${this.__userToken__}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Retrieve owner's appointments
     */
    retrieveAppointmentsOwner() {
       
        this.__updateToken__()
        return fetch(`${this.url}/appointmentsOwner`, {

            headers: {
                authorization: `Bearer ${this.__userToken__}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                response.forEach(appointment => appointment.date = new Date(appointment.date))

                return response
            })
    },

    /**
     * Retrieve month's appointments
     * 
     * @param {string} year 
     * @param {string} month 
     */
    retrieveAppointments(year, month) {

        this.__updateToken__()
        return fetch(`${this.url}/appointments/${year}/${month}`, {

            method: 'GET',
            headers: {
                authorization: `Bearer ${this.__userToken__}`,
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                response.forEach(appointment => appointment.date = new Date(appointment.date))

                return response
            })
    },

    /**
     * Retrieve pet's information
     * 
     * @param {string} userId 
     */
    retrievePets(userId) {

        this.__updateToken__()
        return fetch(`${this.url}/pets/${userId}`, {

            headers: {
                authorization: `Bearer ${this.__userToken__}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Assing appointments
     * 
     * @param {string} owner 
     * @param {string} pet 
     * @param {string} date 
     */
    assignAppointment(owner, pet, date) {
        if (typeof owner !== 'string') throw TypeError(owner + ' is not a string')

        if (!owner.trim().length) throw Error('owner cannot be empty')

        if (typeof pet !== 'string') throw TypeError(pet + ' is not a string')

        if (!pet.trim().length) throw Error('pet cannot be empty')

        if (typeof date !== 'string') throw TypeError(date + ' is not a string')


        this.__updateToken__()
        return fetch(`${this.url}/appointment`, {
            method: 'POST',
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify({ owner, pet, date })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error("Please, select date higher than today and a correct hour. Check if the date has been assigned")

                return response
            })
    },

    /**
     * Delete appointment
     * 
     * @param {string} Id 
     */
    deleteAppointment(Id) {

        if (typeof Id !== 'string') throw TypeError(Id + ' is not a string')

        if (!Id.trim().length) throw Error('Id cannot be empty')

        this.__updateToken__()
        return fetch(`${this.url}/appointment`, {
            method: 'DELETE',
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify({ Id })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * 
     * Retrieve all users
     */
    retrieveUser() {

        this.__updateToken__()
        return fetch(`${this.url}/user/`, {

            headers: {
                authorization: `Bearer ${this.__userToken__}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Retrieve user's information
     * 
     * @param {string} userSelectedId 
     */
    retrieveUserSelected(userSelectedId) {

        this.__updateToken__()
        return fetch(`${this.url}/user/${userSelectedId}`, {

            headers: {
                authorization: `Bearer ${this.__userToken__}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Retrieve pet's information
     * 
     * @param {string} petsId 
     */
    retrievePet(petsId) {

        this.__updateToken__()
        return fetch(`${this.url}/pet/${petsId}`, {
            headers: {
                authorization: `Bearer ${this.__userToken__}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Retrieve appointment information depending on user logged
     * 
     * @param {string} petsId 
     */
    retrievePetVisit(petsId) {

        this.__updateToken__()
        return fetch(`${this.url}/visit/${petsId}`, {
            headers: {
                authorization: `Bearer ${this.__userToken__}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Update user's information
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} idCard 
     * @param {string} phone 
     * @param {string} adress 
     * @param {string} city 
     * @param {string} email 
     */
    updateUser(name, surname, idCard, phone, adress, city, email) {

        this.__updateToken__()
        return fetch(`${this.url}/user`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this.__userToken__}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, idCard, phone, adress, city, email })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },


    /**
     * Update pet's information
     * 
     * @param {string} petsId 
     * @param {string} name 
     * @param {string} microchip 
     * @param {sgring} petlicence 
     */
    updatePet(petsId, name, microchip, petlicence) {

        this.__updateToken__()
        return fetch(`${this.url}/pet`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this.__userToken__}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ petsId, name, microchip, petlicence })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Update visit's information
     * 
     * @param {string} petsId 
     * @param {string} vaccionations 
     * @param {string} controls 
     * @param {string} details 
     */
    updateVisit(petsId, vaccionations, controls, details) {

        this.__updateToken__()
        return fetch(`${this.url}/visit`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this.__userToken__}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ petsId, vaccionations, controls, details })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    }

}

export default logic