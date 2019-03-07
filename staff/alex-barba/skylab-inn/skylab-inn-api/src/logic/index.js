'use strict'

const { models: { User, Admin, Work, Language, Education, Technology } } = require('skylab-inn-data')
const bcrypt = require('bcrypt')

/**
 * Abstraction of business logic.
 */
const logic = {

    /**
     * Registers a user.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirm
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty or password and password confirm do not match.
     *
     * @returns {String} - id. 
     */
    registerUser(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw new TypeError(`${name} is not a string`)
        if (!name.trim().length) throw new Error('name is empty')

        if (typeof surname !== 'string') throw new TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw new Error('surname is empty')

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw new TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw new Error('password confirmation is empty')

        if (password !== passwordConfirm) throw new Error('passwords do not match')

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw new Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 11)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },

    /**
     * Authenticates a user.
     * 
     * @param {String} email 
     * @param {String} password
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, email is not found or password does not match.
     *
     * @returns {String} - id.  
     */
    authenticateUser(email, password) {

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        return (async () => {

            const user = await User.findOne({ email })
            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)
            if (!match) throw Error('wrong credentials')

            const { id } = user

            return id
        })()
    },

    /**
     * Retrieves user information
     * 
     * @param {String} userId 
     * 
     * @throws {TypeError} - if userId is not a string.
     * @throws {Error} - if userId is empty or user is not found.
     *
     * @returns {Object} - user.  
     */
    retrieveUser(userId) {

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new Error('userId is empty')

        return (async () => {
            const user = await User.findById(userId).select('-__v -password').lean()

            if (!user) throw new Error(`user with userId ${userId} not found`)

            user.id = user._id.toString()
            delete user._id

            return user
        })()
    },

    /**
     * Updates user information.
     * 
     * @param {String} userId 
     * @param {Object} data 
     * 
     * @throws {TypeError} - if userId is not a string or data is not an object.
     * @throws {Error} - if any param is empty or user is not found.
     *
     * @returns {Object} - user.  
     */
    updateUser(userId, data) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return (async () => {
            const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true }).select('-__v -password').lean()
            if (!user) throw new Error(`user with userId ${userId} not found`)

            user.id = user._id.toString()
            delete user._id

            return user
        })()
    },

    /**
     * Search fro a skylaber.
     * 
     * @param {String} userId 
     * @param {String} query
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty or user is not found.
     *
     * @returns {Object} - results matching the query. 
     */
    searchSkylaber(userId, query) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)

            const resContact = await User.find({ $or: [{ name: { "$regex": `${query}`, "$options": "i" } }, { surname: { "$regex": `${query}`, "$options": "i" } }, { email: { "$regex": `${query}`, "$options": "i" } }, { git: { "$regex": `${query}`, "$options": "i" } }, { linkedin: { "$regex": `${query}`, "$options": "i" } }, { slack: { "$regex": `${query}`, "$options": "i" } }] })
            const resTechs = await User.find({ 'technology.tech': { "$regex": `${query}`, "$options": "i" } })
            const resLang = await User.find({ 'language.language': { "$regex": `${query}`, "$options": "i" } })
            const resEdu = await User.find({ $or: [{ 'education.college': { "$regex": `${query}`, "$options": "i" } }, { 'education.degree': { "$regex": `${query}`, "$options": "i" } }] })
            const resWork = await User.find({ $or: [{ 'workExperience.company': { "$regex": `${query}`, "$options": "i" } }, { 'workExperience.position': { "$regex": `${query}`, "$options": "i" } }] })

            let results = {}

            resContact && (results.resContact = resContact)
            resTechs && (results.resTechs = resTechs)
            resLang && (results.resLang = resLang)
            resEdu && (results.resEdu = resEdu)
            resWork && (results.resWork = resWork)

            return results
        })()
    },

    /**
     * Search for a skylaber.
     * 
     * @param {String} userId 
     * @param {Array} param
     * 
     * @throws {TypeError} - if userId is not a string or param is not an array.
     * @throws {Error} - if any param is empty or user is not found.
     *
     * @returns {Object} - results matching the query. 
     */
    adSearchSkylaber(userId, param) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (param instanceof Array === false) throw new TypeError(`${param} is not an array`)
        if (!param.length) throw new Error('param is empty')

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)


            let adSearch = []

            param.map(search => {
                const filter = search[0]
                const query = search[1]

                switch (filter) {
                    case 'Contact Information':
                        adSearch.push({ $or: [{ name: { "$regex": `${query}`, "$options": "i" } }, { surname: { "$regex": `${query}`, "$options": "i" } }, { email: { "$regex": `${query}`, "$options": "i" } }, { git: { "$regex": `${query}`, "$options": "i" } }, { linkedin: { "$regex": `${query}`, "$options": "i" } }, { slack: { "$regex": `${query}`, "$options": "i" } }] })
                        break;
                    case 'Technology':
                        adSearch.push({ 'technology.tech': { "$regex": `${query}`, "$options": "i" } })
                        break;
                    case 'Language':
                        adSearch.push({ 'language.language': { "$regex": `${query}`, "$options": "i" } })
                        break;
                    case 'Education':
                        adSearch.push({ $or: [{ 'education.college': { "$regex": `${query}`, "$options": "i" } }, { 'education.degree': { "$regex": `${query}`, "$options": "i" } }] })
                        break;
                    case 'Work':
                        adSearch.push({ $or: [{ 'workExperience.company': { "$regex": `${query}`, "$options": "i" } }, { 'workExperience.position': { "$regex": `${query}`, "$options": "i" } }] })
                        break;
                }
            })

            let match = await User.find({ $and: adSearch })

            return match
        })()
    },

    /**
    * Retrieves skylaber information
    * 
    * @param {String} userId 
    * @param {String} skylaberId
    * 
    * @throws {TypeError} - if any param is not a string.
    * @throws {Error} - if any param is empty or user or skylaber is not found.
    *
    * @returns {Object} - user.  
    */
    retrieveSkylaber(userId, skylaberId) {

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new Error('userId is empty')

        if (typeof skylaberId !== 'string') throw new TypeError(`${skylaberId} is not a string`)
        if (!skylaberId.trim().length) throw new Error('skylaberId is empty')

        return (async () => {

            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)

            const skylaber = await User.findById(skylaberId).select('-__v -password').lean()
            if (!skylaber) throw new Error(`skylaber with userId ${skylaberId} not found`)

            skylaber.id = skylaber._id.toString()
            delete skylaber._id

            return skylaber
        })()
    },

    /**
     * Add user information.
     * 
     * @param {String} userId 
     * @param {String} type  
     * @param {Object} data
     * 
     * @throws {TypeError} - if userId or type are not a string or data is not an object.
     * @throws {Error} - if any param is empty or userId is not found.
     *
     * @returns {String} - added information id.  
     */
    addUserInformation(userId, type, data) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)

            let id

            switch (type) {
                case 'Work':
                    const newWork = new Work(data)

                    user.workExperience.push(newWork)

                    await user.save()

                    newWork.id = newWork._id.toString()
                    delete newWork._id

                    id = newWork.id
                    break;
                case 'Tech':
                    const newTech = new Technology(data)

                    user.technology.push(newTech)

                    await user.save()

                    newTech.id = newTech._id.toString()
                    delete newTech._id

                    id = newTech.id
                    break;
                case 'Language':
                    const newLanguage = new Language(data)

                    user.language.push(newLanguage)

                    await user.save()

                    newLanguage.id = newLanguage._id.toString()
                    delete newLanguage._id

                    id = newLanguage.id
                    break;
                case 'Education':
                    const newEducation = new Education(data)

                    user.education.push(newEducation)

                    await user.save()

                    newEducation.id = newEducation._id.toString()
                    delete newEducation._id

                    id = newEducation.id
                    break;
            }

            return id

        })()
    },

    /**
     * Update user informationr.
     * 
     * @param {String} userId
     * @param {String} infoId
     * @param {String} type   
     * @param {Object} data 
     * 
     * @throws {TypeError} - if userId, infoId or type are not a string or data is not an object.
     * @throws {Error} - if any param is empty and user or userId or infoId are not found.
     *
     * @returns {String} - updated user information id.  
     */
    updateUserInformation(userId, infoId, type, data) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof infoId !== 'string') throw TypeError(`${infoId} is not a string`)
        if (!infoId.trim().length) throw Error('infoId is empty')

        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)

            let id
            
            switch (type) {
                case 'Work':
                    const work = user.workExperience.id(infoId)
                    if (!work) throw new Error(`work with id ${infoId} not found`)

                    data.company && (work.company = data.company)
                    data.position && (work.position = data.position)
                    data.startDate && (work.startDate = data.startDate)
                    data.endDate && (work.endDate = data.endDate)
                    work.current = data.current

                    await user.save()

                    id = work.id
                    break;
                case 'Tech':
                    const technology = user.technology.id(infoId)
                    if (!technology) throw new Error(`technology with id ${infoId} not found`)

                    data.tech && (technology.tech = data.tech)
                    data.level && (technology.level = data.level)

                    await user.save()

                    id = technology.id
                    break;
                case 'Language':
                    const language = user.language.id(infoId)
                    if (!language) throw new Error(`language with id ${infoId} not found`)

                    data.language && (language.language = data.language)
                    data.level && (language.level = data.level)

                    await user.save()

                    id = language.id
                    break;
                case 'Education':
                    const education = user.education.id(infoId)
                    if (!education) throw new Error(`education with id ${infoId} not found`)

                    data.college && (education.college = data.college)
                    data.degree && (education.degree = data.degree)

                    await user.save()

                    id = education.id
                    break;
            }

            return id
        })()
    },

    /**
     * Remove user information.
     * 
     * @param {String} userId
     * @param {String} infoId
     * @param {String} type   
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty and userId or infoId are not found.
     *
     * @returns {Promise} resolves or rejects  
     */
    removeUserInformation(userId, infoId, type) {
        

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof infoId !== 'string') throw TypeError(`${infoId} is not a string`)
        if (!infoId.trim().length) throw Error('infoId is empty')

        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')


        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)

            let index

            switch (type) {
                case 'Work':
                    const work = user.workExperience.id(infoId)
                    if (!work) throw new Error(`work with id ${infoId} not found`)

                    index = user.workExperience.findIndex(work => work.id === infoId)

                    user.workExperience.splice(index, 1)

                    await user.save()

                    break;
                case 'Tech':
                    const technology = user.technology.id(infoId)
                    if (!technology) throw new Error(`technology with id ${infoId} not found`)

                    index = user.technology.findIndex(tech => tech.id === infoId)

                    user.technology.splice(index, 1)

                    await user.save()

                    break;
                case 'Language':
                    const language = user.language.id(infoId)
                    if (!language) throw new Error(`language with id ${infoId} not found`)

                    index = user.language.findIndex(lang => lang.id === infoId)

                    user.language.splice(index, 1)

                    await user.save()

                    break;
                case 'Education':
                    const education = user.education.id(infoId)
                    if (!education) throw new Error(`education with id ${infoId} not found`)

                    index = user.education.findIndex(edu => edu.id === infoId)

                    user.education.splice(index, 1)

                    await user.save()

                    break;
            }
        })()
    },
}

module.exports = logic