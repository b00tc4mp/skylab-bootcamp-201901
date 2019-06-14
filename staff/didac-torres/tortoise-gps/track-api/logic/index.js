const bcrypt = require('bcryptjs')
const { models: { User, Point, Tracker, Track } } = require('track-data')
const { errors: { LogicError, InputError } } = require('track-utils')
const { validate } = require('track-utils')


const logic = {
    //USERS
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: String, notEmpty: true },
            { name: 'surname', value: surname, type: String, notEmpty: true },
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw new LogicError(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const newUser = await User.create({ name, surname, email, password: hash })

            return newUser.id
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: String, notEmpty: true },
            { name: 'password', value: password, type: String, notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw new LogicError(`user with email ${email} doesn't exists`)
            if (await bcrypt.compareSync(password, user.password)) return user.id
            else throw new LogicError('wrong credentials')
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(id).select('-_id name surname email pois trackers').lean()

            if (!user) throw new LogicError(`user with id ${id} doesn't exists`)

            return user
        })()
    },

    updateUser(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'data', value: data, type: Object, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            let mail
            if (data.email) mail = await User.findOne({ email: data.email })
            if (mail) throw new LogicError(`email ${data.email} already registered`)
            if (user) {
                user = user
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }


            await User.findByIdAndUpdate(id, {
                pois: user.pois,
                trackers: user.trackers,
                name: data.name || user.name,
                surname: data.surname || user.surname,
                email: data.email || user.email
            })

        })()
    },

    deleteUser(id) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
        ])

        return (async () => {
            let user = await User.findById(id)
            if (user) {
                await User.findByIdAndRemove(id)
                return 'user deleted'
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }


        })()
    },

    //POIS
    addPOI(id, poiData) {

        if (!poiData) throw new InputError('incorrect poi info')

        let { title, color, latitude, longitude } = poiData

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'title', value: title, type: String, notEmpty: true, optional: true },
            { name: 'color', value: color, type: String, notEmpty: true, optional: true },
            { name: 'latitude', value: latitude, type: Number, notEmpty: true },
            { name: 'longitude', value: longitude, type: Number, notEmpty: true }
        ])

        title ? title = title : title = 'Kripton-' + ((Math.random() * 1000).toFixed(0)).toString()
        color ? color = color : color = '#89c800' //default: ugly-fluor-green
        return (async () => {

            let user = await User.findById(id)

            if (user) {
                user = user
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

            user.pois.push({ title, color, latitude, longitude })

            await user.save()

        })()
    },

    retrieveAllPOI(id) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            if (user) {
                user = await User.findById(id).lean()
                if (user.pois.length != 0) {
                    return user.pois
                } else {
                    throw new LogicError(`user without POIs`)
                }

            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    retrieveOnePOI(id, poiID) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'poiID', value: poiID, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            if (user) {
                poi = user.pois.id(poiID)
                if (poi) {
                    return poi
                } else {
                    throw new LogicError(`POI with id ${poiID} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }


        })()
    },

    updatePOI(id, poiID, poiData) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'poiID', value: poiID, type: String, notEmpty: true },
            { name: 'poiData', value: poiData, type: Object, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            if (user) {
                let index = user.pois.findIndex(item => item._id.toString() == poiID)

                if (index >= 0) {

                    user.pois[index].title = poiData.title || user.pois[index].title,
                    user.pois[index].color = poiData.color || user.pois[index].color,
                    user.pois[index].latitude = poiData.latitude || user.pois[index].latitude,
                    user.pois[index].longitude = poiData.longitude || user.pois[index].longitude

                    await user.save()
                }
                else {
                    throw new LogicError(`POI with id ${poiID} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    deletePOI(id, poiID) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'poiID', value: poiID, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            if (user) {
                let index = user.pois.findIndex(item => item._id.toString() == poiID)

                if (index >= 0) {

                    user.pois.splice(index, 1)

                    await user.save()

                }
                else {
                    throw new LogicError(`POI with id ${poiID} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    //TRACKERS
    addTracker(id, trackerData) {

        if (!trackerData) throw new InputError('incorrect tracker info')

        let { serialNumber, licensePlate = '#IS-' + (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString() + '-FAKE' } = trackerData

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'serialNumber', value: serialNumber, type: String, notEmpty: true },
            { name: 'licensePlate', value: licensePlate, type: String, notEmpty: true, optional: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            if (user) {
                user = user
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

            let plate = 0
            if (licensePlate[0] != '#') plate = await User.findOne({ "trackers.licensePlate": licensePlate })
            if (plate) throw new LogicError(`License Plate ${licensePlate} already registered`)

            let serial = await User.findOne({ "trackers.serialNumber": serialNumber })
            if (serial) throw new LogicError(`Serial Number ${serialNumber} already registered`)

            user.trackers.push({ serialNumber, licensePlate })

            await user.save()

        })()
    },

    retrieveAllTrackers(id) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            if (user) {
                user = await User.findById(id).lean()
                if (user.trackers.length != 0) {
                    return user.trackers
                } else {
                    throw new LogicError(`user without Trackers`)
                }

            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    retrieveTracker(id, trackerID) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'trackerID', value: trackerID, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            if (user) {
                tracker = user.trackers.id(trackerID)
                if (tracker) {
                    return tracker
                } else {
                    throw new LogicError(`Tracker with id ${trackerID} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    retrieveTrackerBySN(id, serialNumber) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'serialNumber', value: serialNumber, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            if (user) {
                let index = user.trackers.findIndex(item => item.serialNumber == serialNumber)
                if (index != -1) {
                    return user.trackers[index]
                } else {
                    throw new LogicError(`Tracker with SN ${serialNumber} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    retrieveTrackerByLicense(id, licensePlate) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'licensePlate', value: licensePlate, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)
            if (user) {
                let index = user.trackers.findIndex(item => item.licensePlate == licensePlate)
                if (index != -1) {
                    return user.trackers[index]
                } else {
                    throw new LogicError(`Tracker with License Plate ${licensePlate} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    updateTracker(id, trackerID, trackerData) {


        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'trackerID', value: trackerID, type: String, notEmpty: true },
            { name: 'trackerData', value: trackerData, type: Object, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            if (user) {
                let index = user.trackers.findIndex(item => item._id.toString() == trackerID)

                if (index >= 0) {
                    let plate = 0
                    if (trackerData.licensePlate && trackerData.licensePlate[0] != '#') plate = await User.findOne({ "trackers.licensePlate": trackerData.licensePlate })
                    if (plate) throw new LogicError(`License Plate ${trackerData.licensePlate} already registered`)

                    let serial = await User.findOne({ "trackers.serialNumber": trackerData.serialNumber })
                    if (serial) throw new LogicError(`Serial Number ${trackerData.serialNumber} already registered`)

                    user.trackers[index].serialNumber= trackerData.serialNumber || user.trackers[index].serialNumber
                    user.trackers[index].licensePlate= trackerData.licensePlate || user.trackers[index].licensePlate

                    await user.save()
                }
                else {
                    throw new LogicError(`Tracker with id ${trackerID} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()

    },

    deleteTracker(id, trackerID) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'trackerID', value: trackerID, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            if (user) {
                let index = user.trackers.findIndex(item => item._id.toString() == trackerID)

                if (index >= 0) {

                    user.trackers.splice(index, 1)

                    await user.save()

                }
                else {
                    throw new LogicError(`Tracker with id ${trackerID} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    //TRACK
    addTrack(id, trackData) {

        if (!trackData) throw new InputError('incorrect track info')
        if (typeof trackData.speed == 'undefined') trackData.speed = 0
        if (typeof trackData.status == 'undefined') trackData.status = 'ON'

        let { serialNumber, latitude, longitude, speed, status, date } = trackData

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'serialNumber', value: serialNumber, type: String, notEmpty: true },
            { name: 'latitude', value: latitude, type: Number, notEmpty: true },
            { name: 'longitude', value: longitude, type: Number, notEmpty: true },
            { name: 'speed', value: speed, type: Number, notEmpty: true, optional: true },
            { name: 'status', value: status, type: String, notEmpty: true, optional: true },
            { name: 'date', value: date, type: String, notEmpty: true, optional:true },
        ])

        return (async () => {

            let user = await User.findById(id)
            if (user) {
                let index = user.trackers.findIndex(item => item.serialNumber == serialNumber)

                if (index >= 0) {
                    user.trackers[index].tracks.push(trackData)
                    await user.save()
                } else {
                    throw new LogicError(`Tracker with SN ${serialNumber} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    addTrackTCP(trackData) {

        if (!trackData) throw new InputError('incorrect track info')
        if (typeof trackData.speed == 'undefined') trackData.speed = 0
        if (typeof trackData.status == 'undefined') trackData.status = 'ON'

        let { serialNumber, latitude, longitude, speed, status, date } = trackData

        validate.arguments([
            { name: 'serialNumber', value: serialNumber, type: String, notEmpty: true },
            { name: 'latitude', value: latitude, type: Number, notEmpty: true },
            { name: 'longitude', value: longitude, type: Number, notEmpty: true },
            { name: 'speed', value: speed, type: Number, notEmpty: true, optional: true },
            { name: 'status', value: status, type: String, notEmpty: true, optional: true },
            { name: 'date', value: date, type: String, notEmpty: true, optional:true },
        ])

        return (async () => {

            let user = await User.findOne({"trackers.serialNumber": serialNumber})
            if (user) {
                let index = user.trackers.findIndex(item => item.serialNumber == serialNumber)
                user.trackers[index].tracks.push(trackData)
                await user.save()
            }
            else {
                throw new LogicError(`User with Tracker SN ${serialNumber} doesn't exists`)
            }

        })()
    },

    retrieveLastTrack(id, trackerID) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'trackerID', value: trackerID, type: String, notEmpty: true },
        ])

        return (async () => {

            let user = await User.findById(id)
            if (user) {
                let index = user.trackers.findIndex(item => item._id.toString() == trackerID)

                if (index >= 0) {

                    const _tracks = user.trackers[index].tracks

                    let lastTrack = []
                    _tracks.forEach((item) => lastTrack.push(item))

                    return lastTrack.pop()

                } else {
                    throw new LogicError(`Tracker with id ${trackerID} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    retrieveAllLastTracks(id) {

        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true }
        ])

        return (async () => {

            let user = await User.findById(id)

            if (user) {
                let lasts = []
                if (user.trackers.length > 0) {

                    user.trackers.forEach(item => {
                        const _tracks = item.tracks

                        let lastTrack = []
                        _tracks.forEach((item) => lastTrack.push(item))
                        /* istanbul ignore else */
                        if(lastTrack.length >=1) lasts.push(lastTrack.pop())
                    })
                    return lasts
                } else {
                    throw new LogicError(`User without trackers`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    },

    retrieveRangeOfTracks(id, trackerID, start, end) {
        validate.arguments([
            { name: 'id', value: id, type: String, notEmpty: true },
            { name: 'trackerID', value: trackerID, type: String, notEmpty: true },
            { name: 'startTime', value: start, type: String, notEmpty: true },
            { name: 'endTime', value: end, type: String, notEmpty: true }
        ])

        const startTime = new Date(start)
        const endTime = new Date(end)

        return (async () => {

            let user = await User.findById(id)
            if (user) {
                let index = user.trackers.findIndex(item => item._id.toString() == trackerID)
                if (index >= 0) {
                    const long = user.trackers[index].tracks.length
                    const tracks = user.trackers[index].tracks
                    let rangeTracks = []
                    /* istanbul ignore else */
                    if (long >= 1) {
                        tracks.forEach(item => {
                            let dateTime = new Date(item.date)
                            if (startTime <= dateTime  && dateTime <= endTime) rangeTracks.push(item)
                        })
                        if (rangeTracks.length >= 1) {
                            return rangeTracks
                        } else {
                            throw new LogicError(`Tracker without tracks between ${startTime.toISOString()} and ${endTime.toISOString()}`)
                        }
                    }
                } else {
                    throw new LogicError(`Tracker with id ${trackerID} doesn't exists`)
                }
            }
            else {
                throw new LogicError(`user with id ${id} doesn't exists`)
            }

        })()
    }
}

module.exports = logic

