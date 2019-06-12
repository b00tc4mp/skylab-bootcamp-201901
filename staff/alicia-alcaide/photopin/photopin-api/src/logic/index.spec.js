require('dotenv').config()

const { mongoose, models: { User, PMap, Pin } } = require('photopin-data')
const expect = require('chai').expect
const logic = require('.')
const bcrypt = require('bcrypt')
const { LogicError, RequirementError, ValueError } = require('photopin-errors')


const { env: { MONGODB_URL_API_LOGIC_TEST: url } } = process


describe('logic', () => {
    before(async () => {
        try {
            await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })
            console.log(`connected to ${url} database`)
        } catch (error) {
            console.log(error, error.message)
        }
    })

    let name, surname, email, password, map01, pinData01, pinData02

    beforeEach(async () => {
        const users = new Array(10).fill().map(item => item = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@mail.com`,
            password: `password-${Math.random()}`
        })

        const user = users[Math.floor(Math.random() * users.length)]
        name = user.name
        surname = user.surname
        email = user.email
        password = user.password

        map01 =
            {
                title: "Beautiful Iceland",
                description: "My favorite locations from Iceland",
                coverImage: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2327&q=80",
                author: null,
                isPublic: false,
                collections: [
                    {
                        title: "Waterfalls",
                        pins: []
                    },
                    {
                        title: "South",
                        pins: []
                    }
                ]
            }

        pinData01 =
            {
                mapId: null,
                author: null,
                title: "Skogafoss",
                description: "My favorite waterfall",
                urlImage: "https://images.unsplash.com/photo-1523302348819-ffd5c0521796?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                bestTimeOfYear: "All",
                bestTimeOfDay: "All",
                photographyTips: "Don't leave your camera at home",
                travelInformation: "Need car",
                coordinates: {
                    latitude: 63.53331,
                    longitude: -19.51168
                }
            }
        pinData02 =
            {
                mapId: null,
                author: null,
                title: "Jökulsárlón",
                description: "My favorite glacier lagoon",
                urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRet38OOXJmShkrdm9eRuKkG6GK48Zti6ZlLgetlE1txrrRkYaGTf9Xnua2",
                bestTimeOfYear: "All",
                bestTimeOfDay: "All",
                photographyTips: "Don't leave your camera at home",
                travelInformation: "Need car",
                coordinates: {
                    latitude: 64.04845,
                    longitude: -16.19887
                }
            }

        await User.deleteMany()
        await PMap.deleteMany()
        await Pin.deleteMany()
    })


    describe('users', () => {

        describe('register user', () => {
            it('should succeed on correct data', async () => {

                await logic.registerUser(name, surname, email, password)

                const user = await User.findOne({ email })

                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

                const match = await bcrypt.compare(password, user.password)
                expect(match).to.be.true
            })

            it('should fail on retrying to register an already existing user', async () => {
                try {
                    await User.create({ name, surname, email, password })
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email ${email} already exists`)
                }
            })

            it('should fail on undefined email', () => {

                expect(() => logic.registerUser(name, surname, undefined, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {

                expect(() => logic.registerUser(name, surname, null, password)).to.throw(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                expect(() => logic.registerUser(name, surname, '', password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                expect(() => logic.registerUser(name, surname, ' \t    \n', password)).to.throw(ValueError, 'email is empty')
            })
        })

        describe('authenticate user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) }))

            it('should succeed on correct credentials', async () => {

                const id = await logic.authenticateUser(email, password)

                expect(id).to.exist
                expect(id).to.be.a('string')
                expect(id).to.equal(user.id)
            })

            it('should fail on non-existing user', async () => {
                const _email = 'unexisting-user@mail.com'
                try {
                    await logic.authenticateUser(_email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with email ${_email} doesn't exists`)
                }
            })

            it('should fail on wrong credentials', async () => {
                try {
                    await logic.authenticateUser(email, 'incorrect password')
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`wrong credentials`)
                }
            })

        })

        describe('retrieve user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) }))

            it('should succeed on correct id from existing user', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)

                expect(_user.password).to.be.undefined
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '342452654635'
                try {
                    await logic.retrieveUser(wrongId)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

        })

        describe('update user', () => {
            let user, _name, _surname, _email, _avatar, _language, userUp, userId

            beforeEach(async () => {
                user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
                userId = user.id
                _name = user.name + '-MOD'
                _surname = user.surname + '-MOD'
                _email = user.email + '-MOD'
                _avatar = 'newAvatar'
                _language = 'ES'
                userUp = { name: _name, surname: _surname, email: _email, avatar: _avatar, language: _language }
            })

            it('should succeed on correct data', async () => {

                await logic.updateUser(userId, userUp)

                const userMod = logic.retrieveUser(userId)

                expect(userMod.name).to.equal(userUp._name)
                expect(userMod.surname).to.equal(userUp._surname)
                expect(userMod.email).to.equal(userUp._email)
                expect(userMod.avatar).to.equal(userUp._avatar)
                expect(userMod.language).to.equal(userUp._language)
                expect(userMod.password).to.be.undefined

            })

            it('should fail on incorrect id user', async () => {

                const wrongId = '342452654635'

                try {
                    await logic.updateUser(wrongId, userUp)
                    throw Error('should not reach this point')
                } catch (error) {

                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on undefined id', () => {
                expect(() => logic.updateUser(undefined, userUp)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on null id', () => {
                expect(() => logic.updateUser(null, userUp)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                expect(() => logic.updateUser('', userUp)).to.throw(ValueError, 'id is empty')
            })

            it('should fail on blank id', () => {
                expect(() => logic.updateUser(' \t    \n', userUp)).to.throw(ValueError, 'id is empty')
            })

            it('should fail on a not string id', () => {
                expect(() => logic.updateUser(123, userUp)).to.throw(TypeError, `id 123 is not a string`)
            })

            it('should fail on undefined user data', () => {
                expect(() => logic.updateUser(userId, undefined)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on null user data', () => {
                expect(() => logic.updateUser(userId, null)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on a not object data', () => {
                expect(() => logic.updateUser(userId, 'data')).to.throw(TypeError, 'data data is not a object')
            })

        })

        describe('remove user', () => {
            let user, userId

            beforeEach(async () => {
                user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
                userId = user.id
            })

            it('should succeed on correct credentials', async () => {
                try {
                    await logic.removeUser(userId)
                }
                catch (error) {
                    throw Error('should not reach this point')
                }

                let _user
                try {
                    _user = logic.retrieveUser(userId)
                }
                catch (error) {
                    expect(_user).to.be.undefined
                }
            })

            it('should fail on incorrect id user', async () => {

                const wrongId = '342452654635'

                try {
                    await logic.removeUser(wrongId)
                    throw Error('should not reach this point')
                } catch (error) {

                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`user with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on undefined id', () => {
                expect(() => logic.removeUser(undefined)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on null id', () => {
                expect(() => logic.removeUser(null)).to.throw(RequirementError, `id is not optional`)
            })

            it('should fail on empty id', () => {
                expect(() => logic.removeUser('')).to.throw(ValueError, 'id is empty')
            })

            it('should fail on blank id', () => {
                expect(() => logic.removeUser(' \t    \n')).to.throw(ValueError, 'id is empty')
            })

        })

    })

    describe('retrieve maps and pins', () => {
        let user, userId, map, mapId, pin01, pin01Id, pin02, pin02Id

        beforeEach(async () => {
            user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
            userId = user.id

            map = await PMap.create({
                title: map01.title,
                description: map01.description,
                coverImage: map01.coverImage,
                author: userId,
                collections: [
                    {
                        title: map01.collections[0].title,
                        pins: []
                    },
                    {
                        title: map01.collections[1].title,
                        pins: []
                    }
                ]
            })
            mapId = map.id

            pin01 = await Pin.create({
                mapId,
                author: userId,
                title: pinData01.title,
                description: pinData01.description,
                urlImage: pinData01.urlImage,
                bestTimeOfYear: pinData01.bestTimeOfYear,
                bestTimeOfDay: pinData01.bestTimeOfDay,
                photographyTips: pinData01.photographyTips,
                travelInformation: pinData01.travelInformation,
                coordinates: {
                    latitude: pinData01.coordinates.latitude,
                    longitude: pinData01.coordinates.longitude
                }
            })
            pin01Id = pin01.id

            pin02 = await Pin.create({
                mapId,
                author: userId,
                title: pinData02.title,
                description: pinData02.description,
                urlImage: pinData02.urlImage,
                bestTimeOfYear: pinData02.bestTimeOfYear,
                bestTimeOfDay: pinData02.bestTimeOfDay,
                photographyTips: pinData02.photographyTips,
                travelInformation: pinData02.travelInformation,
                coordinates: {
                    latitude: pinData02.coordinates.latitude,
                    longitude: pinData02.coordinates.longitude
                }
            })
            pin02Id = pin02.id

            map.collections[0].pins.push(pin01Id)
            map.collections[1].pins.push(pin02Id)
            await map.save()

        })

        describe('retrieve user maps', () => {


            it('should succeed on correct id from existing user', async () => {
                const pmaps = await logic.retrieveUserMaps(userId)
                expect(pmaps).to.be.an('array')
                expect(pmaps).to.have.lengthOf(1)
                expect(pmaps[0].id).to.exist
                expect(pmaps[0].title).to.equal(map01.title)
                expect(pmaps[0].description).to.equal(map01.description)
                expect(pmaps[0].coverImage).to.equal(map01.coverImage)
                expect(pmaps[0].collections).to.exist
                expect(pmaps[0].collections).to.have.lengthOf(2)
            })

            it('should fail on incorrect user id', async () => {
                const wrongId = '342452654635'
                try {
                    const pmaps = await logic.retrieveUserMaps(wrongId)
                    expect(pmaps).to.have.lengthOf(0)
                } catch (error) {
                    throw Error('should not reach this point')
                }
            })

            it('should fail on undefined id', () => {
                expect(() => logic.retrieveUserMaps(undefined)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on null id', () => {
                expect(() => logic.retrieveUserMaps(null)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on empty id', () => {
                expect(() => logic.retrieveUserMaps('')).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on blank id', () => {
                expect(() => logic.retrieveUserMaps(' \t    \n')).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on a not string id', () => {
                expect(() => logic.retrieveUserMaps(123)).to.throw(TypeError, `userId 123 is not a string`)
            })
        })

        describe('retrieve user map', () => {
            it('should succeed on correct id from existing user and map', async () => {
                const pmap = await logic.retrieveUserMap(userId, mapId)
                expect(pmap).to.be.an('object')
                expect(pmap.title).to.equal(map01.title)
                expect(pmap.description).to.equal(map01.description)
                expect(pmap.coverImage).to.equal(map01.coverImage)
                expect(pmap.collections).to.exist
                expect(pmap.collections).to.have.lengthOf(2)
            })

            it('should fail on incorrect map id', async () => {
                const wrongId = '342452654635'
                try {
                    const pmap = await logic.retrieveUserMap(userId, wrongId)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`no maps for user with id ${wrongId}`)
                }
            })

            it('should fail on undefined user id', () => {
                expect(() => logic.retrieveUserMap(undefined, mapId)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on null user id', () => {
                expect(() => logic.retrieveUserMaps(null, mapId)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on empty user id', () => {
                expect(() => logic.retrieveUserMaps('', mapId)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on blank user id', () => {
                expect(() => logic.retrieveUserMaps(' \t    \n', mapId)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on a not string user id', () => {
                expect(() => logic.retrieveUserMaps(123, mapId)).to.throw(TypeError, `userId 123 is not a string`)
            })

        })
    })


    describe('CRUD maps', () => {
        let user, userId

        beforeEach(async () => {
            user = await User.create({ name, surname, email, password: await bcrypt.hash(password, 10) })
            userId = user.id
        })

        describe('create map', () => {

            it('should succeed on correct data', async () => {

                await logic.createMap(userId, map01.title, map01.description, map01.coverImage)

                const newMap = await PMap.findOne({ title: map01.title })

                expect(newMap.id).to.exist
            })

            it('should fail on undefined user id', () => {
                expect(() => logic.createMap(undefined, map01.title, map01.description, map01.coverImage)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on null user id', () => {
                expect(() => logic.createMap(null, map01.title, map01.description, map01.coverImage)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on empty user id', () => {
                expect(() => logic.createMap('', map01.title, map01.description, map01.coverImage)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on blank user id', () => {
                expect(() => logic.createMap(' \t    \n', map01.title, map01.description, map01.coverImage)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on a not string user id', () => {
                expect(() => logic.createMap(123, map01.title, map01.description, map01.coverImage)).to.throw(TypeError, `userId 123 is not a string`)
            })

            it('should fail on undefined title', () => {
                expect(() => logic.createMap(userId, undefined, map01.description, map01.coverImage)).to.throw(RequirementError, `title is not optional`)
            })

            it('should fail on null title', () => {
                expect(() => logic.createMap(userId, null, map01.description, map01.coverImage)).to.throw(RequirementError, `title is not optional`)
            })

            it('should fail on empty title', () => {
                expect(() => logic.createMap(userId, '', map01.description, map01.coverImage)).to.throw(ValueError, 'title is empty')
            })

            it('should fail on blank title', () => {
                expect(() => logic.createMap(userId, ' \t    \n', map01.description, map01.coverImage)).to.throw(ValueError, 'title is empty')
            })

            it('should fail on a not string title', () => {
                expect(() => logic.createMap(userId, 123, map01.description, map01.coverImage)).to.throw(TypeError, `title 123 is not a string`)
            })
        })

        describe('update map', () => {

            let map, mapId, pin01, pin01Id, pin02, pin02Id
            const descMod = "description modified"
            const descTitle = "description modified"
            const descCoverImg = "description modified"
            const data = { description: descMod, title: descTitle, coverImage: descCoverImg }

            beforeEach(async () => {
                map = await PMap.create({
                    title: map01.title,
                    description: map01.description,
                    coverImage: map01.coverImage,
                    author: userId,
                    collections: [
                        {
                            title: map01.collections[0].title,
                            pins: []
                        },
                        {
                            title: map01.collections[1].title,
                            pins: []
                        }
                    ]
                })
                mapId = map.id

                pin01 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData01.title,
                    description: pinData01.description,
                    urlImage: pinData01.urlImage,
                    bestTimeOfYear: pinData01.bestTimeOfYear,
                    bestTimeOfDay: pinData01.bestTimeOfDay,
                    photographyTips: pinData01.photographyTips,
                    travelInformation: pinData01.travelInformation,
                    coordinates: {
                        latitude: pinData01.coordinates.latitude,
                        longitude: pinData01.coordinates.longitude
                    }
                })
                pin01Id = pin01.id

                pin02 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData02.title,
                    description: pinData02.description,
                    urlImage: pinData02.urlImage,
                    bestTimeOfYear: pinData02.bestTimeOfYear,
                    bestTimeOfDay: pinData02.bestTimeOfDay,
                    photographyTips: pinData02.photographyTips,
                    travelInformation: pinData02.travelInformation,
                    coordinates: {
                        latitude: pinData02.coordinates.latitude,
                        longitude: pinData02.coordinates.longitude
                    }
                })
                pin02Id = pin02.id

                map.collections[0].pins.push(pin01Id)
                map.collections[1].pins.push(pin02Id)
                await map.save()

            })

            it('should succeed on correct data', async () => {
                await logic.updateMap(userId, mapId, data)
                const mapUpdated = await PMap.findById(mapId)
                expect(mapUpdated.id).to.exist
                expect(mapUpdated.description).to.equal(descMod)
            })

            it('should fail on wrong map id', async () => {
                const wrongId = '342452654635'
                try {
                    const mapUpdated = await logic.updateMap(userId, wrongId, data)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`no map with id ${wrongId}`)
                }
            })

            it('should fail on wrong author id', async () => {
                const wrongId = '342452654635'
                try {
                    const mapUpdated = await logic.updateMap(wrongId, mapId, data)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map ${mapId} is not from user ${wrongId}`)
                }
            })

            it('should fail on undefined user id', () => {
                expect(() => logic.updateMap(undefined, mapId, data)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on null user id', () => {
                expect(() => logic.updateMap(null, mapId, data)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on empty user id', () => {
                expect(() => logic.updateMap('', mapId, data)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on blank user id', () => {
                expect(() => logic.updateMap(' \t    \n', mapId, data)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on a not string user id', () => {
                expect(() => logic.updateMap(123, mapId, data)).to.throw(TypeError, `userId 123 is not a string`)
            })

            it('should fail on undefined mapId', () => {
                expect(() => logic.updateMap(userId, undefined, data)).to.throw(RequirementError, `mapId is not optional`)
            })

            it('should fail on null mapId', () => {
                expect(() => logic.updateMap(userId, null, data)).to.throw(RequirementError, `mapId is not optional`)
            })

            it('should fail on empty mapId', () => {
                expect(() => logic.updateMap(userId, '', data)).to.throw(ValueError, 'mapId is empty')
            })

            it('should fail on blank mapId', () => {
                expect(() => logic.updateMap(userId, ' \t    \n', data)).to.throw(ValueError, 'mapId is empty')
            })

            it('should fail on a not string mapId', () => {
                expect(() => logic.updateMap(userId, 123, data)).to.throw(TypeError, `mapId 123 is not a string`)
            })

            it('should fail on undefined data', () => {
                expect(() => logic.updateMap(userId, mapId, undefined)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on null data', () => {
                expect(() => logic.updateMap(userId, mapId, null)).to.throw(RequirementError, `data is not optional`)
            })

            it('should fail on empty data', () => {
                expect(() => logic.updateMap(userId, mapId, '')).to.throw(TypeError, 'data  is not a object')
            })

            it('should fail on blank data', () => {
                expect(() => logic.updateMap(userId, mapId, ' \t    \n')).to.throw(TypeError, 'data  \t    \n is not a object')
            })

            it('should fail on a not object data', () => {
                expect(() => logic.updateMap(userId, mapId, 123)).to.throw(TypeError, `data 123 is not a object`)
            })
        })

        describe('create a map collection', () => {

            let map, mapId, pin01, pin01Id, pin02, pin02Id
            const collectionTitle = "New Collection"

            beforeEach(async () => {
                map = await PMap.create({
                    title: map01.title,
                    description: map01.description,
                    coverImage: map01.coverImage,
                    author: userId,
                    collections: [
                        {
                            title: map01.collections[0].title,
                            pins: []
                        },
                        {
                            title: map01.collections[1].title,
                            pins: []
                        }
                    ]
                })
                mapId = map.id

                pin01 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData01.title,
                    description: pinData01.description,
                    urlImage: pinData01.urlImage,
                    bestTimeOfYear: pinData01.bestTimeOfYear,
                    bestTimeOfDay: pinData01.bestTimeOfDay,
                    photographyTips: pinData01.photographyTips,
                    travelInformation: pinData01.travelInformation,
                    coordinates: {
                        latitude: pinData01.coordinates.latitude,
                        longitude: pinData01.coordinates.longitude
                    }
                })
                pin01Id = pin01.id

                pin02 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData02.title,
                    description: pinData02.description,
                    urlImage: pinData02.urlImage,
                    bestTimeOfYear: pinData02.bestTimeOfYear,
                    bestTimeOfDay: pinData02.bestTimeOfDay,
                    photographyTips: pinData02.photographyTips,
                    travelInformation: pinData02.travelInformation,
                    coordinates: {
                        latitude: pinData02.coordinates.latitude,
                        longitude: pinData02.coordinates.longitude
                    }
                })
                pin02Id = pin02.id

                map.collections[0].pins.push(pin01Id)
                map.collections[1].pins.push(pin02Id)
                await map.save()

            })

            it('should succeed on correct collection title from existing user and map', async () => {
                const newCol = await logic.createCollection(userId, mapId, collectionTitle)
                expect(newCol).to.equals(3)
            })

            it('should fail on incorrect map id', async () => {
                const wrongId = '342452654635'
                try {
                    const pmap = await logic.createCollection(userId, wrongId, collectionTitle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`no maps with id ${wrongId}`)
                }
            })

            it('should fail on wrong author id', async () => {
                const wrongId = '342452654635'
                try {
                    const mapUpdated = await logic.createCollection(wrongId, mapId, collectionTitle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map ${mapId} is not from user ${wrongId}`)
                }
            })

            it('should fail on undefined user id', () => {
                expect(() => logic.createCollection(undefined, mapId, collectionTitle)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on null user id', () => {
                expect(() => logic.createCollection(null, mapId, collectionTitle)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on empty user id', () => {
                expect(() => logic.createCollection('', mapId, collectionTitle)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on blank user id', () => {
                expect(() => logic.createCollection(' \t    \n', mapId, collectionTitle)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on a not string user id', () => {
                expect(() => logic.createCollection(123, mapId, collectionTitle)).to.throw(TypeError, `userId 123 is not a string`)
            })

            it('should fail on undefined mapId', () => {
                expect(() => logic.createCollection(userId, undefined, collectionTitle)).to.throw(RequirementError, `mapId is not optional`)
            })

            it('should fail on null mapId', () => {
                expect(() => logic.createCollection(userId, null, collectionTitle)).to.throw(RequirementError, `mapId is not optional`)
            })

            it('should fail on empty mapId', () => {
                expect(() => logic.createCollection(userId, '', collectionTitle)).to.throw(ValueError, 'mapId is empty')
            })

            it('should fail on blank mapId', () => {
                expect(() => logic.createCollection(userId, ' \t    \n', collectionTitle)).to.throw(ValueError, 'mapId is empty')
            })

            it('should fail on a not string mapId', () => {
                expect(() => logic.createCollection(userId, 123, collectionTitle)).to.throw(TypeError, `mapId 123 is not a string`)
            })

            it('should fail on undefined collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, undefined)).to.throw(RequirementError, `collectionTitle is not optional`)
            })

            it('should fail on null collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, null)).to.throw(RequirementError, `collectionTitle is not optional`)
            })

            it('should fail on empty collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, '')).to.throw(Error, 'collectionTitle is empty')
            })

            it('should fail on blank collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, ' \t    \n')).to.throw(Error, 'collectionTitle is empty')
            })

            it('should fail on a not string collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, 123)).to.throw(TypeError, `collectionTitle 123 is not a string`)
            })
        })

        describe('modify the title of a collection', () => {

            let map, mapId, pin01, pin01Id, pin02, pin02Id
            let newTitle = "New Collection Title"
            let collectionTitle

            beforeEach(async () => {
                collectionTitle = map01.collections[0].title
                newTitleDup = map01.collections[1].title
                newTitle = "New collection title"

                map = await PMap.create({
                    title: map01.title,
                    description: map01.description,
                    coverImage: map01.coverImage,
                    author: userId,
                    collections: [
                        {
                            title: map01.collections[0].title,
                            pins: []
                        },
                        {
                            title: map01.collections[1].title,
                            pins: []
                        }
                    ]
                })
                mapId = map.id

                pin01 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData01.title,
                    description: pinData01.description,
                    urlImage: pinData01.urlImage,
                    bestTimeOfYear: pinData01.bestTimeOfYear,
                    bestTimeOfDay: pinData01.bestTimeOfDay,
                    photographyTips: pinData01.photographyTips,
                    travelInformation: pinData01.travelInformation,
                    coordinates: {
                        latitude: pinData01.coordinates.latitude,
                        longitude: pinData01.coordinates.longitude
                    }
                })
                pin01Id = pin01.id

                pin02 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData02.title,
                    description: pinData02.description,
                    urlImage: pinData02.urlImage,
                    bestTimeOfYear: pinData02.bestTimeOfYear,
                    bestTimeOfDay: pinData02.bestTimeOfDay,
                    photographyTips: pinData02.photographyTips,
                    travelInformation: pinData02.travelInformation,
                    coordinates: {
                        latitude: pinData02.coordinates.latitude,
                        longitude: pinData02.coordinates.longitude
                    }
                })
                pin02Id = pin02.id

                map.collections[0].pins.push(pin01Id)
                map.collections[1].pins.push(pin02Id)
                await map.save()

            })

            it('should succeed on correct id from existing user and map', async () => {
                const res = await logic.updateCollection(userId, mapId, collectionTitle, newTitle)
                expect(res).to.be.undefined
            })

            it('should fail on a new title that alredy exists', async () => {
                try {
                    const res = await logic.updateCollection(userId, mapId, collectionTitle, newTitleDup)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`error updating, collection ${newTitleDup} already exist on map ${mapId}`)
                }
            })

            it('should fail on incorrect map id', async () => {
                const wrongId = '342452654635'
                try {
                    const res = await logic.updateCollection(userId, wrongId, collectionTitle, newTitle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`no maps with id ${wrongId}`)
                }
            })

            it('should fail on wrong author id', async () => {
                const wrongId = '342452654635'
                try {
                    const res = await logic.updateCollection(wrongId, mapId, collectionTitle, newTitle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map ${mapId} is not from user ${wrongId}`)
                }
            })

            it('should fail on undefined user id', () => {
                expect(() => logic.createCollection(undefined, mapId, collectionTitle, newTitle)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on null user id', () => {
                expect(() => logic.createCollection(null, mapId, collectionTitle, newTitle)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on empty user id', () => {
                expect(() => logic.createCollection('', mapId, collectionTitle, newTitle)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on blank user id', () => {
                expect(() => logic.createCollection(' \t    \n', mapId, collectionTitle, newTitle)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on a not string user id', () => {
                expect(() => logic.createCollection(123, mapId, collectionTitle, newTitle)).to.throw(TypeError, `userId 123 is not a string`)
            })

            it('should fail on undefined mapId', () => {
                expect(() => logic.createCollection(userId, undefined, collectionTitle, newTitle)).to.throw(RequirementError, `mapId is not optional`)
            })

            it('should fail on null mapId', () => {
                expect(() => logic.createCollection(userId, null, collectionTitle, newTitle)).to.throw(RequirementError, `mapId is not optional`)
            })

            it('should fail on empty mapId', () => {
                expect(() => logic.createCollection(userId, '', collectionTitle, newTitle)).to.throw(ValueError, 'mapId is empty')
            })

            it('should fail on blank mapId', () => {
                expect(() => logic.createCollection(userId, ' \t    \n', collectionTitle, newTitle)).to.throw(ValueError, 'mapId is empty')
            })

            it('should fail on a not string mapId', () => {
                expect(() => logic.createCollection(userId, 123, collectionTitle, newTitle)).to.throw(TypeError, `mapId 123 is not a string`)
            })

            it('should fail on undefined collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, undefined, newTitle)).to.throw(RequirementError, `collectionTitle is not optional`)
            })

            it('should fail on null collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, null, newTitle)).to.throw(RequirementError, `collectionTitle is not optional`)
            })

            it('should fail on empty collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, '', newTitle)).to.throw(Error, 'collectionTitle is empty')
            })

            it('should fail on blank collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, ' \t    \n', newTitle)).to.throw(Error, 'collectionTitle is empty')
            })

            it('should fail on a not string collectionTitle', () => {
                expect(() => logic.createCollection(userId, mapId, 123, newTitle)).to.throw(TypeError, `collectionTitle 123 is not a string`)
            })
        })

        describe('create a new pin', () => {

            let map, mapId, pin01, pin01Id
            let collectionTitle

            beforeEach(async () => {
                collectionTitle = map01.collections[1].title
                map = await PMap.create({
                    title: map01.title,
                    description: map01.description,
                    coverImage: map01.coverImage,
                    author: userId,
                    collections: [
                        {
                            title: map01.collections[0].title,
                            pins: []
                        },
                        {
                            title: map01.collections[1].title,
                            pins: []
                        }
                    ]
                })
                mapId = map.id
                pin01 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData01.title,
                    description: pinData01.description,
                    urlImage: pinData01.urlImage,
                    bestTimeOfYear: pinData01.bestTimeOfYear,
                    bestTimeOfDay: pinData01.bestTimeOfDay,
                    photographyTips: pinData01.photographyTips,
                    travelInformation: pinData01.travelInformation,
                    coordinates: {
                        latitude: pinData01.coordinates.latitude,
                        longitude: pinData01.coordinates.longitude
                    }
                })
                pin01Id = pin01.id
                map.collections[0].pins.push(pin01Id)
                await map.save()
            })

            it('should succeed on correct data for existing user and map', async () => {
                const newPinId = await logic.createPin(userId, mapId, collectionTitle, pinData02)
                expect(newPinId).to.exist
            })

            it('should fail on incorrect collection', async () => {
                const wrongCollection = 'Wrong collection'
                try {
                    const res = await logic.createPin(userId, mapId, wrongCollection, pinData02)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`collection ${wrongCollection} not found`)
                }
            })

            it('should fail on incorrect user Id', async () => {
                const wrongUser = 'Wrong user'
                try {
                    const res = await logic.createPin(wrongUser, mapId, collectionTitle, pinData02)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map ${mapId} is not from user ${wrongUser}`)
                }
            })

            it('should fail on undefined user id', () => {
                expect(() => logic.createPin(undefined, mapId, collectionTitle, pinData02)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on null user id', () => {
                expect(() => logic.createPin(null, mapId, collectionTitle, pinData02)).to.throw(RequirementError, `userId is not optional`)
            })

            it('should fail on empty user id', () => {
                expect(() => logic.createPin('', mapId, collectionTitle, pinData02)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on blank user id', () => {
                expect(() => logic.createPin(' \t    \n', mapId, collectionTitle, pinData02)).to.throw(ValueError, 'userId is empty')
            })

            it('should fail on a not string user id', () => {
                expect(() => logic.createPin(123, mapId, collectionTitle, pinData02)).to.throw(TypeError, `userId 123 is not a string`)
            })

            it('should fail on undefined mapId', () => {
                expect(() => logic.createPin(userId, undefined, collectionTitle, pinData02)).to.throw(RequirementError, `mapId is not optional`)
            })

            it('should fail on null mapId', () => {
                expect(() => logic.createPin(userId, null, collectionTitle, pinData02)).to.throw(RequirementError, `mapId is not optional`)
            })

            it('should fail on empty mapId', () => {
                expect(() => logic.createPin(userId, '', collectionTitle, pinData02)).to.throw(ValueError, 'mapId is empty')
            })

            it('should fail on blank mapId', () => {
                expect(() => logic.createPin(userId, ' \t    \n', collectionTitle, pinData02)).to.throw(ValueError, 'mapId is empty')
            })

            it('should fail on a not string mapId', () => {
                expect(() => logic.createPin(userId, 123, collectionTitle, pinData02)).to.throw(TypeError, `mapId 123 is not a string`)
            })

            it('should fail on undefined collectionTitle', () => {
                expect(() => logic.createPin(userId, mapId, undefined, pinData02)).to.throw(RequirementError, `collectionTitle is not optional`)
            })

            it('should fail on null collectionTitle', () => {
                expect(() => logic.createPin(userId, mapId, null, pinData02)).to.throw(RequirementError, `collectionTitle is not optional`)
            })

            it('should fail on empty collectionTitle', () => {
                expect(() => logic.createPin(userId, mapId, '', pinData02)).to.throw(Error, 'collectionTitle is empty')
            })

            it('should fail on blank collectionTitle', () => {
                expect(() => logic.createPin(userId, mapId, ' \t    \n', pinData02)).to.throw(Error, 'collectionTitle is empty')
            })

            it('should fail on a not string collectionTitle', () => {
                expect(() => logic.createPin(userId, mapId, collectionTitle, 123)).to.throw(TypeError, `newPin 123 is not a object`)
            })
        })

        describe('update pin', () => {

            let map, mapId, pin01, pin01Id, pin02, pin02Id, pinId, data

            beforeEach(async () => {
                map = await PMap.create({
                    title: map01.title,
                    description: map01.description,
                    coverImage: map01.coverImage,
                    author: userId,
                    collections: [
                        {
                            title: map01.collections[0].title,
                            pins: []
                        },
                        {
                            title: map01.collections[1].title,
                            pins: []
                        }
                    ]
                })
                mapId = map.id

                pin01 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData01.title,
                    description: pinData01.description,
                    urlImage: pinData01.urlImage,
                    bestTimeOfYear: pinData01.bestTimeOfYear,
                    bestTimeOfDay: pinData01.bestTimeOfDay,
                    photographyTips: pinData01.photographyTips,
                    travelInformation: pinData01.travelInformation,
                    coordinates: {
                        latitude: pinData01.coordinates.latitude,
                        longitude: pinData01.coordinates.longitude
                    }
                })
                pin01Id = pin01.id
                pinId = pin01Id

                pin02 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData02.title,
                    description: pinData02.description,
                    urlImage: pinData02.urlImage,
                    bestTimeOfYear: pinData02.bestTimeOfYear,
                    bestTimeOfDay: pinData02.bestTimeOfDay,
                    photographyTips: pinData02.photographyTips,
                    travelInformation: pinData02.travelInformation,
                    coordinates: {
                        latitude: pinData02.coordinates.latitude,
                        longitude: pinData02.coordinates.longitude
                    }
                })
                pin02Id = pin02.id

                map.collections[0].pins.push(pin01Id)
                map.collections[1].pins.push(pin02Id)
                await map.save()

                data =
                    {
                        title: "Skogafoss 2",
                        description: "My favorite waterfall2",
                        urlImage: "https://images.unsplash.com/photo-1523302348819-ffd5c0521796?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=602",
                        bestTimeOfYear: "All2",
                        bestTimeOfDay: "All2",
                        photographyTips: "Don't leave your camera at home2",
                        travelInformation: "Need car2",
                    }
            })

            it('should succeed on correct data', async () => {
                await logic.updatePin(userId, pinId, data)
                const pinUpdated = await Pin.findById(pinId).lean()
                expect(pinUpdated.title).to.equal(data.title)
                expect(pinUpdated.description).to.equal(data.description)
                expect(pinUpdated.urlImage).to.equal(data.urlImage)
                expect(pinUpdated.bestTimeOfYear).to.equal(data.bestTimeOfYear)
                expect(pinUpdated.bestTimeOfDay).to.equal(data.bestTimeOfDay)
                expect(pinUpdated.photographyTips).to.equal(data.photographyTips)
                expect(pinUpdated.travelInformation).to.equal(data.travelInformation)
            })

            it('should fail on wrong pin id', async () => {
                const wrongId = '342452654635'
                try {
                    const pinUpdated = await logic.updatePin(userId, wrongId, data)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`no pin with id ${wrongId}`)
                }
            })

            it('should fail on wrong author id', async () => {
                const wrongId = '342452654635'
                try {
                    const pinUpdated = await logic.updatePin(wrongId, pinId, data)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`pin ${pinId} is not from user ${wrongId}`)
                }
            })
        })

        describe('remove map', () => {

            let map, mapId, pin01, pin01Id, pin02, pin02Id, pinId, data

            beforeEach(async () => {
                map = await PMap.create({
                    title: map01.title,
                    description: map01.description,
                    coverImage: map01.coverImage,
                    author: userId,
                    collections: [
                        {
                            title: map01.collections[0].title,
                            pins: []
                        },
                        {
                            title: map01.collections[1].title,
                            pins: []
                        }
                    ]
                })
                mapId = map.id

                pin01 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData01.title,
                    description: pinData01.description,
                    urlImage: pinData01.urlImage,
                    bestTimeOfYear: pinData01.bestTimeOfYear,
                    bestTimeOfDay: pinData01.bestTimeOfDay,
                    photographyTips: pinData01.photographyTips,
                    travelInformation: pinData01.travelInformation,
                    coordinates: {
                        latitude: pinData01.coordinates.latitude,
                        longitude: pinData01.coordinates.longitude
                    }
                })
                pin01Id = pin01.id
                pinId = pin01Id

                pin02 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData02.title,
                    description: pinData02.description,
                    urlImage: pinData02.urlImage,
                    bestTimeOfYear: pinData02.bestTimeOfYear,
                    bestTimeOfDay: pinData02.bestTimeOfDay,
                    photographyTips: pinData02.photographyTips,
                    travelInformation: pinData02.travelInformation,
                    coordinates: {
                        latitude: pinData02.coordinates.latitude,
                        longitude: pinData02.coordinates.longitude
                    }
                })
                pin02Id = pin02.id

                map.collections[0].pins.push(pin01Id)
                map.collections[1].pins.push(pin02Id)
                await map.save()
            })

            it('should succeed on correct data', async () => {
                await logic.removeMap(userId, mapId)

                try {
                    const map = await PMap.findById(mapId).lean()
                    expect(map).to.be.null
                    const pins = await Pin.find().lean()
                    expect(pins).to.have.lengthOf(0)
                } catch (error) {
                    throw Error('should not reach this point')
                }
            })

            it('should fail on wrong map id', async () => {
                const wrongId = '342452654635'
                try {
                    await logic.removeMap(userId, wrongId)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on wrong author id', async () => {
                const wrongId = '342452654635'
                try {
                    await logic.removeMap(wrongId, mapId)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map ${mapId} is not from user ${wrongId}`)
                }
            })
        })

        describe('remove collection', () => {

            let map, mapId, pin01, pin01Id, pin02, pin02Id, collectionTitle

            beforeEach(async () => {
                collectionTitle = map01.collections[0].title

                map = await PMap.create({
                    title: map01.title,
                    description: map01.description,
                    coverImage: map01.coverImage,
                    author: userId,
                    collections: [
                        {
                            title: map01.collections[0].title,
                            pins: []
                        },
                        {
                            title: map01.collections[1].title,
                            pins: []
                        }
                    ]
                })
                mapId = map.id

                pin01 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData01.title,
                    description: pinData01.description,
                    urlImage: pinData01.urlImage,
                    bestTimeOfYear: pinData01.bestTimeOfYear,
                    bestTimeOfDay: pinData01.bestTimeOfDay,
                    photographyTips: pinData01.photographyTips,
                    travelInformation: pinData01.travelInformation,
                    coordinates: {
                        latitude: pinData01.coordinates.latitude,
                        longitude: pinData01.coordinates.longitude
                    }
                })
                pin01Id = pin01.id
                pinId = pin01Id

                pin02 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData02.title,
                    description: pinData02.description,
                    urlImage: pinData02.urlImage,
                    bestTimeOfYear: pinData02.bestTimeOfYear,
                    bestTimeOfDay: pinData02.bestTimeOfDay,
                    photographyTips: pinData02.photographyTips,
                    travelInformation: pinData02.travelInformation,
                    coordinates: {
                        latitude: pinData02.coordinates.latitude,
                        longitude: pinData02.coordinates.longitude
                    }
                })
                pin02Id = pin02.id

                map.collections[0].pins.push(pin01Id)
                map.collections[1].pins.push(pin02Id)
                await map.save()
            })

            it('should succeed on correct data', async () => {
                await logic.removeCollection(userId, mapId, collectionTitle)

                try {
                    const map = await PMap.findById(mapId).lean()
                    expect(map.collections).to.have.lengthOf(1)
                } catch (error) {
                    throw Error('should not reach this point')
                }
            })

            it('should fail on wrong map id', async () => {
                const wrongId = '342452654635'
                try {
                    await logic.removeCollection(userId, wrongId, collectionTitle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map with id ${wrongId} doesn't exists`)
                }
            })

            it('should fail on wrong author id', async () => {
                const wrongId = '342452654635'
                try {
                    await logic.removeCollection(wrongId, mapId, collectionTitle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map ${mapId} is not from user ${wrongId}`)
                }
            })

            it('should fail on wrong collection title', async () => {
                const wrongCollectionTitle = 'Wrong collection title'
                try {
                    await logic.removeCollection(userId, mapId, wrongCollectionTitle)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`map ${mapId} doesn't have a collection with title ${wrongCollectionTitle}`)
                }
            })
        })

        describe('remove pin', () => {

            let map, mapId, pin01, pin01Id, pin02, pin02Id, pinId

            beforeEach(async () => {
                collectionTitle = map01.collections[0].title

                map = await PMap.create({
                    title: map01.title,
                    description: map01.description,
                    coverImage: map01.coverImage,
                    author: userId,
                    collections: [
                        {
                            title: map01.collections[0].title,
                            pins: []
                        },
                        {
                            title: map01.collections[1].title,
                            pins: []
                        }
                    ]
                })
                mapId = map.id

                pin01 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData01.title,
                    description: pinData01.description,
                    urlImage: pinData01.urlImage,
                    bestTimeOfYear: pinData01.bestTimeOfYear,
                    bestTimeOfDay: pinData01.bestTimeOfDay,
                    photographyTips: pinData01.photographyTips,
                    travelInformation: pinData01.travelInformation,
                    coordinates: {
                        latitude: pinData01.coordinates.latitude,
                        longitude: pinData01.coordinates.longitude
                    }
                })
                pin01Id = pin01.id
                pinId = pin01Id

                pin02 = await Pin.create({
                    mapId,
                    author: userId,
                    title: pinData02.title,
                    description: pinData02.description,
                    urlImage: pinData02.urlImage,
                    bestTimeOfYear: pinData02.bestTimeOfYear,
                    bestTimeOfDay: pinData02.bestTimeOfDay,
                    photographyTips: pinData02.photographyTips,
                    travelInformation: pinData02.travelInformation,
                    coordinates: {
                        latitude: pinData02.coordinates.latitude,
                        longitude: pinData02.coordinates.longitude
                    }
                })
                pin02Id = pin02.id

                map.collections[0].pins.push(pin01Id)
                map.collections[1].pins.push(pin02Id)
                await map.save()
            })

            it('should succeed on correct data', async () => {
                await logic.removePin(userId, pinId)

                try {
                    const pin = await Pin.findById(pinId).lean()
                    expect(pin).to.be.null
                } catch (error) {
                    throw Error('should not reach this point')
                }
            })

            it('should fail on wrong pin id', async () => {
                const wrongId = '342452654635'
                try {
                    await logic.removePin(userId, wrongId)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`No pin with id ${wrongId} was found for user ${userId}`)
                }
            })

            it('should fail on wrong author id', async () => {
                const wrongId = '342452654635'
                try {
                    await logic.removePin(wrongId, pinId)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(LogicError)
                    expect(error.message).to.equal(`No pin with id ${pinId} was found for user ${wrongId}`)
                }
            })
        })
    })


    after(() => mongoose.disconnect())

})