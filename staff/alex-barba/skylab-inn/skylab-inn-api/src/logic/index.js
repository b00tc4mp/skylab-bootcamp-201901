'use strict'

const { models: { User, Work, Language, Education, Technology, EmailWhitelist } } = require('skylab-inn-data')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { createToken, verifyToken } = require('../token-helper')


/**
 * Abstraction of business logic.
 */
const logic = {

    /**
     * Register a user.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirm
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty or password and password confirm do not match or email is already registered,
     *
     * @returns {String} - id. 
     */
    registerUser(name, surname, email, password, passwordConfirm, role) {

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
            debugger

            if (role === 'Admin') {

                const hashAdmin = await bcrypt.hash(password, 11)

                const admin = await User.create({ name, surname, email, password: hashAdmin, role })

                return admin.id
            }

            const preUser = await EmailWhitelist.findOneAndUpdate({ email }, { state: 'registered' })
            if (!preUser) throw new Error(`The email ${email} is not authorised to sign up`)

            const hash = await bcrypt.hash(password, 11)

            const status = await createToken(email)

            const { id } = await User.create({ name, surname, email, password: hash, status })

            // const transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'skylabinn@gmail.com',
            //         pass: 'Skylabinn123'
            //     }
            // })

            // const mailOptions = {
            //     from: 'skylabinn@gmail.com',
            //     to: `${email}`,
            //     subject: 'Welcome to the Skylab Universe!',
            //     html: `<h1>Thanks for signing up ${name}!</h1>
            //         <p>We just need you to verify you email to complete registration.<p>
            //         <p>Please click on the following <a href='http://localhost:8000/api/user/${status}/verify'>link</a>.</p>
            //         <p>Thanks</p>
            //         <p>Skylab Inn</p>
            //     `
            // }

            // transporter.sendMail(mailOptions, function (error, info) {
            //     if (error) throw new Error(`email could not be sent`)
            //     else ('Email sent: ' + info.response)
            // })

            return id
        })()
    },

    /**
     * Authenticate a user.
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
     * Retrieve user information.
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
     * Update user information.
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
     * Search for skylabers.
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

            const resContact = await User.find({ $and: [{ role: "User" }, { $or: [{ name: { "$regex": `${query}`, "$options": "i" } }, { surname: { "$regex": `${query}`, "$options": "i" } }, { email: { "$regex": `${query}`, "$options": "i" } }, { git: { "$regex": `${query}`, "$options": "i" } }, { linkedin: { "$regex": `${query}`, "$options": "i" } }, { slack: { "$regex": `${query}`, "$options": "i" } }] }] })
            const resTechs = await User.find({ $and: [{ role: "User" }, { 'technology.tech': { "$regex": `${query}`, "$options": "i" } }] })
            const resLang = await User.find({ $and: [{ role: "User" }, { 'language.language': { "$regex": `${query}`, "$options": "i" } }] })
            const resEdu = await User.find({ $and: [{ role: "User" }, { $or: [{ 'education.college': { "$regex": `${query}`, "$options": "i" } }, { 'education.degree': { "$regex": `${query}`, "$options": "i" } }] }] })
            const resWork = await User.find({ $and: [{ role: "User" }, { $or: [{ 'workExperience.company': { "$regex": `${query}`, "$options": "i" } }, { 'workExperience.position': { "$regex": `${query}`, "$options": "i" } }] }] })

            let results = {}

            resContact && (results.resContact = resContact)
            resTechs && (results.resTechs = resTechs)
            resLang && (results.resLang = resLang)
            resEdu && (results.resEdu = resEdu)
            resWork && (results.resWork = resWork)

            if (!resContact.length && !resTechs.length && !resLang.length && !resEdu.length && !resWork.length) throw new Error('No matches found!')

            return results
        })()
    },

    /**
     * Advance search of skylabers.
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
                        adSearch.push({ $and: [{ role: "User" }, { $or: [{ name: { "$regex": `${query}`, "$options": "i" } }, { surname: { "$regex": `${query}`, "$options": "i" } }, { email: { "$regex": `${query}`, "$options": "i" } }, { git: { "$regex": `${query}`, "$options": "i" } }, { linkedin: { "$regex": `${query}`, "$options": "i" } }, { slack: { "$regex": `${query}`, "$options": "i" } }] }] })
                        break;
                    case 'Technology':
                        adSearch.push({ $and: [{ role: "User" }, { 'technology.tech': { "$regex": `${query}`, "$options": "i" } }] })
                        break;
                    case 'Language':
                        adSearch.push({ $and: [{ role: "User" }, { 'language.language': { "$regex": `${query}`, "$options": "i" } }] })
                        break;
                    case 'Education':
                        adSearch.push({ $and: [{ role: "User" }, { $or: [{ 'education.college': { "$regex": `${query}`, "$options": "i" } }, { 'education.degree': { "$regex": `${query}`, "$options": "i" } }] }] })
                        break;
                    case 'Work':
                        adSearch.push({ $and: [{ role: "User" }, { $or: [{ 'workExperience.company': { "$regex": `${query}`, "$options": "i" } }, { 'workExperience.position': { "$regex": `${query}`, "$options": "i" } }] }] })
                        break;
                }
            })

            let match = await User.find({ $and: adSearch })

            if (!match.length) throw new Error('No matches found!')

            return match
        })()
    },

    /**
    * Retrieve a skylaber information.
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

    /**
     * Add skylaber to the whitelist.
     * 
     * @param {String} userId 
     * @param {Object} data 
     * 
     * @throws {TypeError} - if userId is not a string or data is not an object.
     * @throws {Error} - if any param is empty, user is not found or role does not match, email is already added to the whitelist or registered, 
     *                   or email could not be sent.
     *
     * @returns {String} - id.  
     */
    addSkylaber(userId, data) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return (async () => {

            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)
            if (user.role !== 'Admin') throw new Error(`Acces denied`)

            const { name, surname, email } = data

            const preUser = await EmailWhitelist.findOne({ email })
            if (preUser) throw new Error(`skylaber with email ${email} already added to the Whitelist`)

            const skylaber = await User.findOne({ email })
            if (skylaber) throw new Error(`skylaber with email ${email} already exists`)


            const { id } = await EmailWhitelist.create({ name, surname, email })

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'skylabinn@gmail.com',
                    pass: 'Skylabinn123'
                }
            })

            const mailOptions = {
                from: 'skylabinn@gmail.com',
                to: `${email}`,
                subject: 'Join de Skylab Universe!',
                html: `<h1>Welcome to Skylab Inn ${name}</h1>
                    <p>We would like to thank you once again for joining the Skylab Academy.<p>
                    <p>We would like you to register in the following <a href='http://localhost:3000/#/signup'>link</a> to join Skylab Inn.</p>
                    <p>We ask you to update your created profile in order to offer you the best job opportunities matching the company needs with your skills and experience.</p>
                    <p>This network will also allow you to se all Skylabers information, so that you can get in touch with any of them if you may ever need it.</p>
                    <p>See you soon!</p>
                    <p>Skylab Inn</p>
                `
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) throw new Error(`email could not be sent`)
                else ('Email sent: ' + info.response)
            })

            return id
        })()
    },

    /**
     * Retrieve whitelist skylabers with pending status.
     * 
     * @param {String} userId 
     * 
     * @throws {TypeError} - if userId is not a string.
     * @throws {Error} - if userId is empty or user is not found or user role does not match.
     *
     * @returns {Object} - users pending sign up.  
     */
    retrievePendingSkylabers(userId) {

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new Error('userId is empty')

        return (async () => {
            const user = await User.findById(userId).select('-__v -password').lean()
            if (!user) throw new Error(`user with userId ${userId} not found`)
            if (user.role !== 'Admin') throw new Error(`Acces denied`)

            const preUsers = await EmailWhitelist.find({ state: 'pending' })

            return preUsers
        })()
    },

    /**
   * Update user information.
   * 
   * @param {String} userId 
   * @param {String} url 
   * 
   * @throws {TypeError} - if userId is not a string or data is not an object.
   * @throws {Error} - if any param is empty or user is not found.
   *
   * @returns {Object} - user.  
   */
    updateUserPhoto(userId, url) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof url !== 'string') throw TypeError(`${url} is not a string`)
        if (!url.trim().length) throw Error('url is empty')

        return (async () => {
            const user = await User.findByIdAndUpdate(userId, { image: url }, { new: true, runValidators: true }).select('-__v -password').lean()
            if (!user) throw new Error(`user with userId ${userId} not found`)

            user.id = user._id.toString()
            delete user._id

            return user
        })()
    },

    /**
     * Verifies user email address.
     * 
     * @param {String} emailToken 
     * 
     * @throws {TypeError} - if emailToken is not a string.
     * @throws {Error} - if emailToken is empty or user is not found.
     *
     * @returns {Object} - user.  
     */
    verifyEmail(emailToken) {

        if (typeof emailToken !== 'string') throw new TypeError(`${emailToken} is not a string`)
        if (!emailToken.trim().length) throw new Error('emailToken is empty')

        return (async () => {
            const user = await User.findOne({ status: emailToken }).select('-__v -password').lean()

            if (!user) throw new Error(`user not found`)

            await User.findByIdAndUpdate(user._id, { status: 'verified' })

            return 'Thanks for confirming your email address. Skylab Inn.'
        })()
    },

    /**
     * Retrieve skylabers with unverified emails.
     * 
     * @param {String} userId 
     * 
     * @throws {TypeError} - if userId is not a string.
     * @throws {Error} - if userId is empty or user is not found or user role does not match.
     *
     * @returns {Object} - users with unverified emails.  
     */
    retrieveUnverifiedEmails(userId) {

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new Error('userId is empty')

        return (async () => {
            const user = await User.findById(userId).select('-__v -password').lean()
            if (!user) throw new Error(`user with userId ${userId} not found`)
            if (user.role !== 'Admin') throw new Error(`Acces denied`)

            const unverified = await User.find({ $and: [{ status: { $ne: 'verified' } }, { role: 'User' }] })

            return unverified
        })()
    },

    /**
     * Create a hashed url with skylaberIds.
     * 
     * @param {String} userId 
     * @param {Array} skylaberIds
     * 
     * @throws {TypeError} - if userId is not a string or skylaberIds is not an array.
     * @throws {Error} - if any param is empty or user is not found or is not admin.
     *
     * @returns {Object} - hashed url with skylabers ids. 
     */
    createHashedUrl(userId, skylaberIds) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (skylaberIds instanceof Array === false) throw new TypeError(`${skylaberIds} is not an array`)
        if (!skylaberIds.length) throw new Error('skylaberIds is empty')

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)
            if (user.role !== 'Admin') throw new Error(`Acces denied`)

            const results = await createToken(skylaberIds)

            const hashedUrl = `http://localhost:3000/#/skylabers/${results}`

            return hashedUrl
        })()
    },

    /**
    * Retrieve encrypted skylabers.
    * 
    * @param {String} encryptedIds
    * 
    * @throws {TypeError} - if encryptedIds is not a string.
    * @throws {Error} - if encryptedIds is empty.
    *
    * @returns {Array} - skylabers encrypted.  
    */
   retrieveEncryptedIds(encryptedIds) {

    if (typeof encryptedIds !== 'string') throw new TypeError(`${encryptedIds} is not a string`)
    if (!encryptedIds.trim().length) throw new Error('encryptedIds is empty')

    return (async () => {
        const ids = await verifyToken(encryptedIds)

        var skylabers = await User.find({_id :{$in : ids}}).lean() 

        return skylabers
    })()
},
}

module.exports = logic