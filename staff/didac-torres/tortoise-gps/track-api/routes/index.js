const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    handleErrors(async () => {
        await logic.registerUser(name, surname, email, password)
        res.status(201).json({ message: 'Ok, user registered.' })
    },
        res)
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () => {
        const sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '47m' })

        res.json({ token })

    },
        res)
})

router.get('/users', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const user = await logic.retrieveUser(userId)
        return res.json(user)
    },
        res)
})

router.put('/users/update', jsonParser, auth, (req, res) => {
    const { userId, body: { name, surname, email } } = req

    handleErrors(async () => {
        await logic.updateUser(userId, { name, surname, email })
        res.status(201).json({ message: 'Ok, user updated.' })
    },
        res)
})

router.delete('/users/delete', jsonParser, auth, (req, res) => {
    const { userId } = req

    handleErrors(async () => {
        await logic.deleteUser(userId)
        res.status(201).json({ message: 'Ok, user removed.' })
    },
        res)
})

router.post('/pois/add', jsonParser, auth, (req, res) => {
    handleErrors(async () => {
        const { userId, body: { title, color, latitude, longitude } } = req

        await logic.addPOI(userId, { title, color, latitude, longitude })
        res.status(201).json({ message: 'Ok, POI added.' })
    },
        res)
})

router.get('/pois', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const pois = await logic.retrieveAllPOI(userId)
        return res.json(pois)
    },
        res)
})

router.get('/pois/:id', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id } } = req

        const poi = await logic.retrieveOnePOI(userId, id)
        return res.json(poi)
    },
        res)
})

router.put('/pois/:id/update', jsonParser, auth, (req, res) => {
    const { userId, params: { id }, body: { title, color, latitude, longitude } } = req

    handleErrors(async () => {
        await logic.updatePOI(userId, id, { title, color, latitude, longitude })
        res.status(201).json({ message: 'Ok, POI updated.' })
    },
        res)
})

router.delete('/pois/:id/delete', auth, (req, res) => {
    const { userId, params: { id } } = req

    handleErrors(async () => {
        await logic.deletePOI(userId, id)
        res.status(201).json({ message: 'Ok, POI removed.' })
    },
        res)
})

router.post('/trackers/add', jsonParser, auth, (req, res) => {
    handleErrors(async () => {
        const { userId, body: { serialNumber, licensePlate } } = req

        await logic.addTracker(userId, { serialNumber, licensePlate })
        res.status(201).json({ message: 'Ok, Tracker added.' })
    },
        res)
})

router.get('/trackers', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const trackers = await logic.retrieveAllTrackers(userId)
        return res.json(trackers)
    },
        res)
})

router.get('/trackers/id/:id', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id } } = req

        const poi = await logic.retrieveTracker(userId, id)
        return res.json(poi)
    },
        res)
})

router.get('/trackers/sn/:sn', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { sn } } = req

        const poi = await logic.retrieveTrackerBySN(userId, sn)
        return res.json(poi)
    },
        res)
})

router.get('/trackers/lp/:lp', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { lp } } = req

        const poi = await logic.retrieveTrackerByLicense(userId, lp)
        return res.json(poi)
    },
        res)
})

router.put('/trackers/:id/update', jsonParser, auth, (req, res) => {
    const { userId, params: { id }, body: { serialNumber, licensePlate } } = req

    handleErrors(async () => {
        await logic.updateTracker(userId, id, { serialNumber, licensePlate })
        res.status(201).json({ message: 'Ok, Tracker updated.' })
    },
        res)
})

router.delete('/trackers/:id/delete', auth, (req, res) => {
    const { userId, params: { id } } = req

    handleErrors(async () => {
        await logic.deleteTracker(userId, id)
        res.status(201).json({ message: 'Ok, Tracker removed.' })
    },
        res)
})

router.post('/tracks/add', jsonParser, auth, (req, res) => {
    handleErrors(async () => {
        const { userId, body: { serialNumber, latitude, longitude, speed, status } } = req

        await logic.addTrack(userId, { serialNumber, latitude, longitude, speed, status })
        res.status(201).json({ message: 'Ok, Track added.' })
    },
        res)
})

router.post('/tracks/TCP/add', jsonParser, (req, res) => {
    handleErrors(async () => {
        const { body: { serialNumber, latitude, longitude, speed, status } } = req
        await logic.addTrackTCP({ serialNumber, latitude, longitude, speed, status })
        res.status(201).json({ message: 'Ok, Track added.' })
    },
        res)
})

router.get('/tracks', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const poi = await logic.retrieveAllLastTracks(userId)
        return res.json(poi)
    },
        res)
})

router.get('/tracks/:id', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id } } = req

        const poi = await logic.retrieveLastTrack(userId, id)
        return res.json(poi)
    },
        res)
})

router.get('/tracks/:id/from/:start/to/:end', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id, start, end } } = req

        const range = await logic.retrieveRangeOfTracks(userId, id, start, end)
        return res.json(range)
    },
        res)
})

// TODO other routes (update, delete...)

module.exports = router