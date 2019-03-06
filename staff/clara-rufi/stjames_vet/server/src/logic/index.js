'use strict'

const { models: { User, Pet, Appointment } }= require('../vet-data')
const bcrypt = require('bcrypt')


/**
 * Abstraction of business logic.
 */
const logic = {
   

    /**
    * Registers a user.
    * 
    * @param {string} name 
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
        debugger

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof idCard !== 'string') throw TypeError(idCard + ' is not a string')

        if (!idCard.trim().length) throw Error('idCard cannot be empty')

        if (typeof phone !== 'string') throw TypeError ('phone is not a string')  ///////////////////////

        if (!phone.trim().length) throw Error ('phone cannot be empty')

        if(typeof adress !== 'string') throw TypeError (adress + 'is not a string')

        if (!adress.trim().length) throw Error ('adress cannot be empty')

        if(typeof city !== 'string') throw TypeError (city + 'is not a string')

        if (!city.trim().length) throw Error ('city cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        console.log(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
        // return User.findOne({ email })
        //     .then(user => {
        //         if (user) throw Error(`user with email ${email} already exists`)

        //         return bcrypt.hash(password, 10)
        //     })
        //     .then(hash => User.create({ name, surname, email, password: hash }))
        //     .then(({ id }) => id)


        return (async () => {
            debugger
            let user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            // const { id } = await User.create({ name, surname, id, phone, adress, city, email, password: hash, passwordConfirmation: hash})

            user = new User ({name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash})

            await user.save()
            // return user.id
        })()
    },

     /**
    * Registera a owner's pet.
    * 
    * @param {string} name 
    * @param {string} specie 
    * @param {string} breed 
    * @param {string} color 
    * @param {string} gender 
    * @param {string} birthdate
    * @param {string} microchip
    * @param {string} neutered 
    * @param {string} vaccionations 
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

        if(typeof birthdate != 'string') throw TypeError (birthdate + 'is not a string')

        if (!birthdate.trim().length) throw Error ('birthdate cannot be empty')

        if(typeof microchip != 'string') throw TypeError (microchip + 'is not a string')

        if (!microchip.trim().length) throw Error ('microchip cannot be empty')

        if(typeof petlicence != 'string') throw TypeError (petlicence + 'is not a string')

        if (!microchip.trim().length) throw Error ('microchip cannot be empty')

        if(typeof neutered != 'string') throw TypeError (neutered + 'is not a string')

        if (!neutered.trim().length) throw Error ('neutered cannot be empty')

        if(typeof vaccionations != 'string') throw TypeError (vaccionations + 'is not a string')

        // if (!vaccionations.trim().length) throw Error ('vaccionations cannot be empty')

        if(typeof controls != 'string') throw TypeError (controls + 'is not a string')

        // if (!controls.trim().length) throw Error ('controls cannot be empty')

        if(typeof details != 'string') throw TypeError (details + 'is not a string')

        // if (!details.trim().length) throw Error ('details cannot be empty')

        console.log(owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
       

        return (async () => {
           
        const pet = new Pet ({owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details})

        await pet.save()
        
      })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')

            return user.id
        })()
    },

    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')


        return User.findById(userId)
        
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                const _user = {
                    name: user.name,
                    surname : user.surname,
                    idCard : user.idCard,
                    phone : user.phone,
                    adress: user.adress,
                    city: user.city,
                    email: user.email,
                }
    
                return _user
            })
    },

    // TODO doc
    async retrieveUsers() {
        debugger
        const _users = await User.find({})

        const users = _users.map(user => {
            return {
                name: user.name,
                id: user._id
                
            }
        })

        return users
    },

    async retrievePets(ownerId) {

        const _pets = await Pet.find({owner: ownerId})

        console.log(_pets)

        const pets = _pets.map(pet => {
            return {
                owner: pet.owner,
                name: pet.name,
                id: pet._id
            }
        })

        return pets
    },

    retrievePet(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')


        return Pet.findById(userId)
            .then(pet => {
                if (!pet) throw Error(`user with id ${userId} not found`)

                pet.id = pet._id.toString()

                const pet = {
                    id: pet._id,
                    name: pet.name,
                    specie : pet.specie,
                    breed : pet.breed,
                    color : pet.color,
                    gender: pet.gender,
                    birthdate: pet.birthdate,
                    microchip: pet.microchip,
                    petlicence: pet.petlicence,
                    neutered: pet.neutered,
                    vaccionations:pet.vaccionations,
                    controls: pet.controls,
                    details: pet.details
                }
    
                return user
            })
    },

    
    // const user = {
    //     id: user._id,
    //     name: user.name,
    //     surname : user.surname,
    //     phone : user.phone,
    //     adress : user.adress,
    //     city: user.city,
    //     email: user.email
    // }
   
    // return user

    // updateUser(name, surname, idCard, phone, adress, city, email){
    updateUser(name, surname, idCard, phone, adress, city, email){
        // if (typeof user !== 'string') throw TypeError(`${user} is not a string`)
        
        // if (!user.trim().length) throw new EmptyError('user is empty')
        
        // if (typeof token!== 'string') throw TypeError(`${token} is not a string`)
        return (async () => {
          debugger
            // let user = await User.findOneAndUpdate({email},{name, surname, idCard, phone, adress, city, email},{new: true},)          
            
            const user = await User.findOneAndUpdate({email},{$set:{name, surname, idCard, phone, adress, city, email}},{new: true},)          
            
            return user
        })()

}
}

module.exports = logic