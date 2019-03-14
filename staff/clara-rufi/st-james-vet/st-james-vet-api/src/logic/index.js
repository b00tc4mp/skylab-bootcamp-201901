'use strict'

const { models: { User, Pet, Appointment } }= require('st-james-vet-data')
const bcrypt = require('bcrypt')
const moment = require( 'moment')

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

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof idCard !== 'string') throw TypeError(idCard + ' is not a string')

        if (!idCard.trim().length) throw Error('idCard cannot be empty')

        if (typeof phone !== 'string') throw TypeError ('phone is not a string') 

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

        return (async () => {
           
            let user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            user = new User ({name, surname, idCard, phone, adress, city, email, password: hash, passwordConfirmation: hash})

            await user.save()

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

        if (!petlicence.trim().length) throw Error ('petlicence cannot be empty')

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
            const user = await User.findOne({ email }).lean()

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')
            const _user = {id: user._id, role: user.role} 
            return _user
        })()
    },

    /**
     * 
     * Assign appointment to the owner
     * 
     * @param {string} owner 
     * @param {string} pet 
     * @param {string} dayDb
     */

    assignAppointment(owner, pet, date) {
        // if (typeof owner !== 'string') throw TypeError(owner + ' is not a string')

        // if (!owner.trim().length) throw Error('owner cannot be empty')

        // if (typeof pet !== 'string') throw TypeError(pet + ' is not a string')

        // if (!pet.trim().length) throw Error('pet cannot be empty')

        // if (dayDb instanceof 'date') throw TypeError(dayDb + ' is not a date')

        // if (!dayDb.trim().length) throw Error('dayDb cannot be empty')

        return (async () => {

            let _date = await Appointment.findOne({ date })
    
            if (_date) throw Error(`user with date ${date} already exists`)
            // var date = new Date(dayDb)
            // let date = dayDb.toISOString()
            debugger
            const appointment = new Appointment ({owner, pet, date})
    
            await appointment.save()
            
          })()
    },

    /**
     * 
     * @param {string} appointmentId 
     */
    deleteAppointment(appointmentId) {
        if (typeof appointmentId !== 'string') throw TypeError(appointmentId + ' is not a string')

        if (!appointmentId.trim().length) throw Error('appointmentId cannot be empty')

        return (async () => {
           
            Appointment.deleteOne({_id: appointmentId})
                .then((res) => {
                    if(res.deletedCount !== 1) throw Error (`appointment with id ${appointmentId} not found`)
                
                    return { status: 'ok', message: `appointment with id ${appointmentId} succesfully deleted` }
                })
            })
    },
    
     /**
     * Retrieve an user by its credentials.
     * 
     * @param {string} userId  
     */
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

    /**
     * Retrieve users by its credentials.
     * 
     * @param {string} 
     */

    async retrieveUsers() { 
        
        const _users = await User.find({})

        const users = _users.map(user => {
            return {
                name: user.name,
                id: user._id                
            }
        })

        return users
    },

    /**
     * Retrieve all owner's appointments
     */
    async retrieveAppointments( year, month) { 
        debugger
        //const _appointments = await Appointment.find({}).populate('owner pet')
        // const _appointments = await Appointment.find({$gte:{year, month}, $lte:{year, month}}).populate('user').exec()
        

        // var start = new Date(startOfMonth);
        // var end = new Date(endOfMonth);

        const toDate = new Date(year, month, 0);
        const fromDate = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
        console.log(fromDate, toDate)


        // const _appointments= await Appointment.find({"date": {'$gte': fromDate, '$lt': toDate}});
        const _appointments= await Appointment.find({"date": {'$gte': fromDate, '$lt': toDate}}).populate('owner pet')
        // const _appointments = await Appointment.find({})
        // let toDate = new Date (fromDate.getFullYear(), fromDate.getMonth() + 1, 0)
        // let condition = {date: {'$gte': date, '$lte': lastDay}}
        // const _appointments = await Appointment.find(condition, function(err, response){
        //     if(!err){
        //         console.log(response)
        //     }
        // }
        //const _appointments = await Appointment.find({}).populate('user pet')
        // const _appointments = await Appointment.find({}).populate[{path:'owner', select:'name'}, {path: 'pet', select: 'name'}]
    
        const appointments = _appointments.map(appointment => {
            debugger
            return {
                owner: appointment.owner,
                pet: appointment.pet,
                date : appointment.date,
                id: appointment._id             
            }
        })
        
        console.log(_appointments) 
        return appointments
    },

    /**
     * Retrieve pets by owner's credentials.
     * 
     * @param {string} ownerId
     */

    async retrievePets(ownerId) {

        if (typeof ownerId !== 'string') throw TypeError(ownerId + ' is not a string')

        if (!ownerId.trim().length) throw Error('ownerId cannot be empty')

        const _pets = await Pet.find({owner: ownerId})

        console.log(_pets)
        debugger
        const pets = _pets.map(pet => {
            return {
                owner: pet.owner,
                name: pet.name,
                microchip: pet.microchip,
                petlicence:pet.petlicence,
                neutered: pet.neutered,
                id: pet._id
            }
        })

        return pets
    },

    /**
     * Retrieve user's information
     * 
     * @param {string} userId 
     */
     retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw Error('user id is empty')

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

    /**
     * Retrieve owner's pets information
     * 
     * @param {string} petsId 
     */
    retrievePet(petsId) {
        if (typeof petsId !== 'string') throw TypeError(`${petsId} is not a string`)

        if (!petsId.trim().length) throw new Error('petsId id is empty')

        return Pet.findById(petsId)
        
            .then(pet => {
                if (!pet) throw Error(`user with id ${petsId} not found`)

                pet.id = pet._id.toString()

                const _pet = {
                    name: pet.name,
                    microchip: pet.microchip,
                    petlicence: pet.petlicence,
                    neutered: pet.neutered,
                }
    
                return _pet
            })
    },

    /**
     * Retrieve pet's visit information  
     *
     * @param {string} petsId 
     */
    retrievePetVisit(petsId) {
        if (typeof petsId !== 'string') throw TypeError(`${petsId} is not a string`)

        if (!petsId.trim().length) throw new Error('petsId id is empty')

        return Pet.findById(petsId)
        
            .then(pet => {
                if (!pet) throw Error(`user with id ${petsId} not found`)

                pet.id = pet._id.toString()

                const _pet = {
                    vaccionations:pet.vaccionations,
                    controls: pet.controls,
                    details: pet.details
                }
    
                return _pet
            })
    },
   
    /**
     * Update user information
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} idCard 
     * @param {string} phone 
     * @param {string} adress 
     * @param {string} city 
     * @param {string} email 
     */

    updateUser(name, surname, idCard, phone, adress, city, email){
        
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof idCard !== 'string') throw TypeError(idCard + ' is not a string')

        if (!idCard.trim().length) throw Error('idCard cannot be empty')

        if (typeof phone !== 'string') throw TypeError ('phone is not a string') 

        if (!phone.trim().length) throw Error ('phone cannot be empty')

        if(typeof adress !== 'string') throw TypeError (adress + 'is not a string')

        if (!adress.trim().length) throw Error ('adress cannot be empty')

        if(typeof city !== 'string') throw TypeError (city + 'is not a string')

        if (!city.trim().length) throw Error ('city cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        return (async () => {
         
            const user = await User.findOneAndUpdate({email},{$set:{name, surname, idCard, phone, adress, city, email}},{new: true},)          
            
            return user
        })()

    },

    /**
     * Update pet's information
     * 
     * @param {string} petsId 
     * @param {string} name 
     * @param {string} microchip 
     * @param {string} petlicence 
     */

    updatePet(petsId, name, microchip, petlicence){

        if (typeof petsId !== 'string') throw TypeError(`${petsId} is not a string`)

        if (!petsId.trim().length) throw new Error('petsId id is empty')
        
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if(typeof microchip != 'string') throw TypeError (microchip + 'is not a string')

        if (!microchip.trim().length) throw Error ('microchip cannot be empty')

        if(typeof petlicence != 'string') throw TypeError (petlicence + 'is not a string')

        if (!petlicence.trim().length) throw Error ('petlicence cannot be empty')

        return (async () => {
         
            const pet = await Pet.findOneAndUpdate({_id: petsId},{$set:{name, microchip, petlicence}},{new: true},)          
            
            return pet
        })()
    },

    /**
     * Update pet visit's information
     * 
     * @param {string} petsId 
     * @param {vaccionations} vaccionations 
     * @param {controls} controls 
     * @param {details} details 
     */

    updateVisit(petsId, vaccionations, controls, details){

        if (typeof petsId !== 'string') throw TypeError(`${petsId} is not a string`)

        if (!petsId.trim().length) throw new Error('petsId id is empty')
        
        if(typeof vaccionations != 'string') throw TypeError (vaccionations + 'is not a string')

        // if (!vaccionations.trim().length) throw Error ('vaccionations cannot be empty')

        if(typeof controls != 'string') throw TypeError (controls + 'is not a string')

        // if (!controls.trim().length) throw Error ('controls cannot be empty')

        if(typeof details != 'string') throw TypeError (details + 'is not a string')

        // if (!details.trim().length) throw Error ('details cannot be empty')

        return (async () => {
         
            const visit = await Pet.findOneAndUpdate({_id: petsId},{$set:{vaccionations, controls, details}},{new: true},)          
            
            return visit
        })()
    }
}

module.exports = logic