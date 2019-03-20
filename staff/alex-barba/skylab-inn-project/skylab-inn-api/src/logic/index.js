'use strict'

const { models: { User, Work, Language, Education, Technology, EmailWhitelist } } = require('skylab-inn-data')
const validate = require('skylab-inn-validation')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { createToken, verifyToken } = require('../token-helper')
const streamifier = require('streamifier')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

/**
 * Abstraction of business logic.
 */
const logic = {

    appUrl: null,
    apiUrl: null,
    cloud_name: null,
    api_key: null,
    api_secret: null,

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

        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirm', value: passwordConfirm, type: String }, { key: 'role', value: role, type: String, optional: true }])

        if (password !== passwordConfirm) throw new Error('passwords do not match')

        return (async () => {
            const user = await User.findOne({ email })
            if (user) throw new Error(`user with email ${email} already exists`)

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
                subject: 'Welcome to the Skylab Universe!',
                html: `<h1>Thanks for signing up ${name}!</h1>
                    <p>We just need you to verify you email to complete registration.<p>
                    <p>Please click on the following <a href='${this.apiUrl}/user/${status}/verify'>link</a>.</p>
                    <p>Thanks</p>
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

        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

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

        validate([{ key: 'userId', value: userId, type: String }])

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

        validate([{ key: 'userId', value: userId, type: String }, { key: 'data', value: data, type: Object }])

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

        validate([{ key: 'userId', value: userId, type: String }, { key: 'query', value: query, type: String }])

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

            return results
        })()
    },

    /**
     * Advance search of skylabers.
     * 
     * @param {String} userId 
     * @param {Array} filters
     * 
     * @throws {TypeError} - if userId is not a string or filters is not an array.
     * @throws {Error} - if any filters is empty or user is not found.
     *
     * @returns {Object} - results matching the query. 
     */
    adSearchSkylaber(userId, filters) {

        validate([{ key: 'userId', value: userId, type: String }, { key: 'filters', value: filters, type: Array }])

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)

            let adSearch = []

            filters.map(search => {
                const filter = search[0]
                const query = search[1]

                switch (filter) {
                    case 'Contact Information':
                        adSearch.push({ $and: [{ role: "User" }, { $or: [{ name: { "$regex": `${query}`, "$options": "i" } }, { surname: { "$regex": `${query}`, "$options": "i" } }, { email: { "$regex": `${query}`, "$options": "i" } }, { git: { "$regex": `${query}`, "$options": "i" } }, { linkedin: { "$regex": `${query}`, "$options": "i" } }, { slack: { "$regex": `${query}`, "$options": "i" } }] }] })
                        break
                    case 'Technology':
                        adSearch.push({ $and: [{ role: "User" }, { 'technology.tech': { "$regex": `${query}`, "$options": "i" } }] })
                        break
                    case 'Language':
                        adSearch.push({ $and: [{ role: "User" }, { 'language.language': { "$regex": `${query}`, "$options": "i" } }] })
                        break
                    case 'Education':
                        adSearch.push({ $and: [{ role: "User" }, { $or: [{ 'education.college': { "$regex": `${query}`, "$options": "i" } }, { 'education.degree': { "$regex": `${query}`, "$options": "i" } }] }] })
                        break
                    case 'Work':
                        adSearch.push({ $and: [{ role: "User" }, { $or: [{ 'workExperience.company': { "$regex": `${query}`, "$options": "i" } }, { 'workExperience.position': { "$regex": `${query}`, "$options": "i" } }] }] })
                        break
                }
            })

            let match = await User.find({ $and: adSearch })

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
    * @returns {Object} - skylaber information.  
    */
    retrieveSkylaber(userId, skylaberId) {

        validate([{ key: 'userId', value: userId, type: String }, { key: 'skylaberId', value: skylaberId, type: String }])

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

        validate([{ key: 'userId', value: userId, type: String }, { key: 'type', value: type, type: String }, { key: 'data', value: data, type: Object }])

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
                    break
                case 'Tech':
                    const newTech = new Technology(data)

                    user.technology.push(newTech)

                    await user.save()

                    newTech.id = newTech._id.toString()
                    delete newTech._id

                    id = newTech.id
                    break
                case 'Language':
                    const newLanguage = new Language(data)

                    user.language.push(newLanguage)

                    await user.save()

                    newLanguage.id = newLanguage._id.toString()
                    delete newLanguage._id

                    id = newLanguage.id
                    break
                case 'Education':
                    const newEducation = new Education(data)

                    user.education.push(newEducation)

                    await user.save()

                    newEducation.id = newEducation._id.toString()
                    delete newEducation._id

                    id = newEducation.id
                    break
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

        validate([{ key: 'userId', value: userId, type: String }, { key: 'infoId', value: infoId, type: String }, { key: 'type', value: type, type: String }, { key: 'data', value: data, type: Object }])

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
                    break
                case 'Tech':
                    const technology = user.technology.id(infoId)
                    if (!technology) throw new Error(`technology with id ${infoId} not found`)

                    data.tech && (technology.tech = data.tech)
                    data.level && (technology.level = data.level)

                    await user.save()

                    id = technology.id
                    break
                case 'Language':
                    const language = user.language.id(infoId)
                    if (!language) throw new Error(`language with id ${infoId} not found`)

                    data.language && (language.language = data.language)
                    data.level && (language.level = data.level)

                    await user.save()

                    id = language.id
                    break
                case 'Education':
                    const education = user.education.id(infoId)
                    if (!education) throw new Error(`education with id ${infoId} not found`)

                    data.college && (education.college = data.college)
                    data.degree && (education.degree = data.degree)

                    await user.save()

                    id = education.id
                    break
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

        validate([{ key: 'userId', value: userId, type: String }, { key: 'infoId', value: infoId, type: String }, { key: 'type', value: type, type: String }])

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

                    break
                case 'Tech':
                    const technology = user.technology.id(infoId)
                    if (!technology) throw new Error(`technology with id ${infoId} not found`)

                    index = user.technology.findIndex(tech => tech.id === infoId)

                    user.technology.splice(index, 1)

                    await user.save()

                    break
                case 'Language':
                    const language = user.language.id(infoId)
                    if (!language) throw new Error(`language with id ${infoId} not found`)

                    index = user.language.findIndex(lang => lang.id === infoId)

                    user.language.splice(index, 1)

                    await user.save()

                    break
                case 'Education':
                    const education = user.education.id(infoId)
                    if (!education) throw new Error(`education with id ${infoId} not found`)

                    index = user.education.findIndex(edu => edu.id === infoId)

                    user.education.splice(index, 1)

                    await user.save()

                    break
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
     * @returns {String} - id of the skylaber added.  
     */
    addSkylaber(userId, data) {

        validate([{ key: 'userId', value: userId, type: String }, { key: 'data', value: data, type: Object }])

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
                    <p>We would like you to register in the following <a href='${this.appUrl}/signup'>link</a> to join Skylab Inn.</p>
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
     * @returns {Object} - skylabers pending to sign up.  
     */
    retrievePendingSkylabers(userId) {

        validate([{ key: 'userId', value: userId, type: String }])

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
   * @param {Buffer} buffer 
   * 
   * @throws {TypeError} - if userId is not a string or buffer is not a buffer.
   * @throws {Error} - if any param is empty, user is not found or image could not be uploaded.
   *
   * @returns {Object} - user.  
   */
    updateUserPhoto(userId, buffer) {

        validate([{ key: 'userId', value: userId, type: String }, { key: 'buffer', value: buffer, type: Buffer }])

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)

            cloudinary.config({
                cloud_name: this.cloud_name,
                api_key: this.api_key,
                api_secret: this.api_secret
            })

            const image = await new Promise((resolve, reject) => {

                const upload_stream = cloudinary.uploader.upload_stream((err,image) => {

                    if (err) return reject (`Image could not be uploaded: ${err}`)
    
                    resolve(image)
                })
                streamifier.createReadStream(buffer).pipe(upload_stream)
            })

            let _user = await User.findByIdAndUpdate(userId, { image: image.secure_url }, { new: true, runValidators: true }).select('-__v -password').lean()
            
            _user.id = user._id.toString()
            delete _user._id

            return _user
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

        validate([{ key: 'emailToken', value: emailToken, type: String }])

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
     * @returns {Object} - skylabers with unverified emails.  
     */
    retrieveUnverifiedEmails(userId) {

        validate([{ key: 'userId', value: userId, type: String }])

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
     * @returns {String} - hashed url with skylabers ids. 
     */
    createHashedUrl(userId, skylaberIds) {

        validate([{ key: 'userId', value: userId, type: String }, { key: 'skylaberIds', value: skylaberIds, type: Array }])

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new Error(`user with userId ${userId} not found`)
            if (user.role !== 'Admin') throw new Error(`Acces denied`)

            const results = await createToken(skylaberIds)

            const hashedUrl = `${this.appUrl}/skylabers/${results}`

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

        validate([{ key: 'encryptedIds', value: encryptedIds, type: String }])

        return (async () => {
            const ids = await verifyToken(encryptedIds)

            var skylabers = await User.find({ _id: { $in: ids } }).lean()

            return skylabers
        })()
    },
}

module.exports = logic