import logic from '.'
import restApi from '../data/rest-api'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import { mongoose, models } from 'breedingseason-data'

jest.setTimeout(100000)

const url = 'mongodb://localhost/breeding-test'

describe.only('user data', () => {
    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    let users_

    beforeEach(async () => {

        await models.User.deleteMany()

        users_ = new Array(15).fill().map(() => ({
            nickname: `Pepe${Math.random() * 121215}`,
            age: Math.ceil(Math.random() * 15 + 13),
            email: `grillo-${Math.random() * 54124512}@mail.com`,
            password: `123-${Math.random()}`
        }))

    })

    describe('create', () => {
        it('should succeed on correct data', async () => {

            await logic.registerUser(users_[0].nickname, users_[0].age, users_[0].email, users_[0].password)

            let user = await models.User.findOne({ email: users_[0].email })

            expect(user._id).toBeDefined()
            expect(user.nickname).toBe(users_[0].nickname)
            expect(user.email).toBe(users_[0].email)
            expect(user.password).toBe(users_[0].password)
            expect(user.age).toBe(users_[0].age)

        })

        it('should fail on already used Nickname', async () => {

            await models.User.create({ nickname: users_[0].nickname, age: users_[0].age, email: users_[0].email, password: users_[0].password, avatar: "hellomotto" })

            try {
                await logic.registerUser(users_[0].nickname, users_[1].age, users_[1].email, users_[1].password)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
            }
        })

        it('should fail on already used Email', async () => {
            await models.User.create({ nickname: users_[1].nickname, age: users_[0].age, email: users_[0].email, password: users_[0].password, avatar: "hellomotto" })

            try {
                await logic.registerUser(users_[0].nickname, users_[0].age, users_[0].email, users_[1].password)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                // expect(err.message).toBe(`User with ${users_[0].email} already exist`)
            }
        })

        it('should fail on an empty or lowe of the minimun Age ', async () => {
            try {
                await logic.registerUser(users_[0].nickname, 5, users_[0].email, users_[1].password)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe(`You have to be older than 13`)
            }
        })

        it('should fail on an empty Email', async () => {

            try {
                await logic.registerUser(users_[0].nickname, users_[0].age, "", users_[1].password)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("That is not a proper e-mail")
            }
        })

        it('should fail on an empty Nickname', async () => {
        
            try {
                await logic.registerUser("", users_[0].age, users_[0].email, users_[1].password)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe(`Nickname can not be empty`)
            }
        })

        it('should fail an empty password', async () => {
            try {
                await logic.registerUser(users_[0].nickname, users_[0].age, users_[0].email, "")

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe(`Password can't be empty`)
            }
        })
    })

    describe('auth', () => {
        let authUser

        beforeEach(async () => {
            authUser = new models.User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await authUser.save()
        })

        it('should succeed on correct data user Nickname and Password', async () => {
            await logic.loginUser(users_[2].nickname, users_[2].password)

            const { __userToken__ } = logic

            expect(typeof __userToken__).toBe('string')
            expect(__userToken__.length).toBeGreaterThan(0)

            expect(logic.isUserLoggedIn).toBeTruthy()

            logic.logoutUser()
            expect(logic.isUserLoggedIn).toBeFalsy()
        })

        it('should succeed on correct data user Email and Password', async () => {
            await logic.loginUser(users_[2].email, users_[2].password)

            const { __userToken__ } = logic

            expect(typeof __userToken__).toBe('string')
            expect(__userToken__.length).toBeGreaterThan(0)

            // const [, payloadB64,] = __userToken__.split('.')
            // const payloadJson = atob(payloadB64)
            // const payload = JSON.parse(payloadJson)

            // expect(typeof payload.id).toBe('string')
            // expect(payload.id.length).toBeGreaterThan(0)

            // expect(logic.isUserLoggedIn).toBeTruthy()

            // expect(authUserId).toEqual(authUser._id)=> hay que parear el token
        })

        it('should fail on not matching Email and Password', async () => {
            try {
                await logic.loginUser(users_[3].email, users_[4].password)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Email and Password do not match")
            }
        })

        it('should fail on an empty Email or Nickname', async () => {
            try {
                logic.loginUser("", users_[4].password)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Nickname or Email required")
            }
        })

        it('should fail on an empty Password', async () => {
            try {
                await logic.loginUser(users_[3].nickname, "")

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Password can not be empty")
            }
        })
    })

    describe('retrieve', () => {
        let retrievedUser

        beforeEach(async () => {
            retrievedUser = new models.User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await retrievedUser.save()
        })


        it('should succeed on an already existing user', async () => {
            await logic.loginUser(retrievedUser.nickname, retrievedUser.password)

            const _user = await logic.retrieveUser()

            expect(_user.id).toBeUndefined()
            expect(_user.nickname).toEqual(retrievedUser.nickname)
            expect(_user.age).toEqual(retrievedUser.age)
            expect(_user.email).toEqual(retrievedUser.email)
            expect(_user.avatar).toEqual(retrievedUser.avatar)
        })

        it('should fail on not bad token', async () => {
            try {
                await logic.retrieveUser()

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Bad Way")
            }
        })
    })

    describe('retrieveGameData', () => {
        let retrievedUserGame, newHistory
        let GameId

        beforeEach(async () => {
            GameId = `Jhaken-${Math.floor(Math.random() * 89)}`

            retrievedUserGame = new models.User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await retrievedUserGame.save()

            newHistory = new models.GameRecord({ gameId: GameId, players: [retrievedUserGame._id] })

            await newHistory.save()

            let newResults = new models.Result({
                player: retrievedUserGame._id,
                missionCards: [],
                OneEggNestAmount: 0,
                OneEggNestLvL: 0,
                TwoEggNestAmount: 0,
                TwoEggNestLvL: 0,
                ThreeEggNestAmount: 0,
                ThreeEggNestLvL: 0,
                FourEggNestAmount: 0,
                FourEggNestLvL: 0,
                ToolsUsed: 0,
                ToolsPuntuation: 0,
                SecurityLvL: {},
                SecurityPuntuation: 0,
                FishingRodUsed: 0,
                StrikeLvL: 0,
                puntuation: 7
            })

            newHistory.gameHistory.push(newResults)

            await newHistory.save()

            retrievedUserGame.gameHistory.push(newHistory._id)

            await retrievedUserGame.save()
        })

        it('should succeed on retrieve the game data on an existing user with data asociated', async () => {
            await logic.loginUser(retrievedUserGame.nickname, retrievedUserGame.password)

            const gameHistoric = await logic.retrieveUserGameHistory()

            expect(gameHistoric).toBeDefined
            expect(gameHistoric.length).toBe(1)
            expect(gameHistoric[0].players.length).toBe(1)
            expect(gameHistoric[0].players[0].toString()).toBe(retrievedUserGame._id.toString())
            expect(gameHistoric[0].gameId).toBe(GameId)
            expect(gameHistoric[0].gameHistory.length).toBe(1)
            expect(gameHistoric[0].gameHistory[0]).toBeDefined
            expect(gameHistoric[0].gameHistory[0].player.toString()).toBe(retrievedUserGame._id.toString())
            expect(gameHistoric[0].gameHistory[0].puntuation).toBe(7)
            expect(gameHistoric[0].date).toBeDefined
        })

        it('should succeed on retrieve the game data on an existing user with data asociated', async () => {
            retrievedUserGame.gameHistory.push(newHistory._id)
            retrievedUserGame.gameHistory.push(newHistory._id)
            retrievedUserGame.gameHistory.push(newHistory._id)
            retrievedUserGame.gameHistory.push(newHistory._id)
            retrievedUserGame.gameHistory.push(newHistory._id)

            await retrievedUserGame.save()

            await logic.loginUser(retrievedUserGame.nickname, retrievedUserGame.password)

            const gameHistoric = await logic.retrieveUserGameHistory()

            expect(gameHistoric).toBeDefined
            expect(gameHistoric.length).toBe(5)
            expect(gameHistoric[0].players.length).toBe(1)
            expect(gameHistoric[0].players[0].toString()).toBe(retrievedUserGame._id.toString())
            expect(gameHistoric[0].gameId).toBe(GameId)
            expect(gameHistoric[0].gameHistory.length).toBe(1)
            expect(gameHistoric[0].gameHistory[0]).toBeDefined
            expect(gameHistoric[0].gameHistory[0].player.toString()).toBe(retrievedUserGame._id.toString())
            expect(gameHistoric[0].gameHistory[0].puntuation).toBe(7)
            expect(gameHistoric[0].date).toBeDefined

            expect(gameHistoric[1].players.length).toBe(1)
            expect(gameHistoric[1].players[0].toString()).toBe(retrievedUserGame._id.toString())
            expect(gameHistoric[1].gameId).toBe(GameId)
            expect(gameHistoric[1].gameHistory.length).toBe(1)
            expect(gameHistoric[1].gameHistory[0]).toBeDefined
            expect(gameHistoric[1].gameHistory[0].player.toString()).toBe(retrievedUserGame._id.toString())
            expect(gameHistoric[1].gameHistory[0].puntuation).toBe(7)
            expect(gameHistoric[1].date).toBeDefined

        })

        it('should fail on not existing iD', async () => {
            try {
                await logic.loginUser(retrievedUserGame.nickname, retrievedUserGame.password)
                await retrievedUserGame.remove()
                await logic.retrieveUserGameHistory()

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Bad Way")
            }
        })
    })

    describe('newGame', () => {
        let UserGame

        beforeEach(async () => {
            UserGame = new models.User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await UserGame.save()
        })

        it("Should work on creating a solo player game instance", async () => {
            await logic.loginUser(UserGame.nickname, UserGame.password)

            const gameRef = await logic.newGame({ mode: "solo", playersNumber: 1 }, true)

            expect(gameRef).toBeDefined
        })

        it("Should work on creating a multiplayer public player game instance", async () => {
            await logic.loginUser(UserGame.nickname, UserGame.password)

            const gameRef = await logic.newGame({ mode: "multiplayer", playersNumber: 3 }, false)

            expect(gameRef).toBeDefined
        })

        it('should fail on not existing iD', async () => {
            await logic.loginUser(UserGame.nickname, UserGame.password)
            await UserGame.remove()

            try {
                await logic.newGame({ mode: "multiplayer", playersNumber: 3 }, false)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Bad Way")
            }
        })
    })

    describe('startGame', () => {
        let random9 = Math.floor(Math.random() * 6)
        let random8 = Math.floor(Math.random() * 7)
        let UserGame

        beforeEach(async () => {
            UserGame = new models.User({ nickname: users_[3].nickname, age: users_[3].age, email: users_[3].email, password: users_[3].password, avatar: "hellomotto" })
            await UserGame.save()

            const { error, token } = await restApi.authenticate(UserGame.nickname, UserGame.password)
            logic.__userToken__ = token

            let response = await restApi.newGame(logic.__userToken__, { mode: "solo", playersNumber: 1 }, true)

            const { gameId: gameidresponse } = response
            logic.__ActualGame__ = gameidresponse
        })

        it('Should return the initialpackage for a Solo mode player', async () => {

            const initialpackage = await logic.startGame()

            expect(initialpackage).toBeDefined()
            expect(initialpackage).not.toBe("Waiting other players to start")

            const { player, round, missionCards, turnCards, mapStatus, userPuntuation } = initialpackage

            //Initial Package toop level elemnts
            expect(round).toBe(1)
            expect(missionCards).toBeDefined

            expect(missionCards[0]).toBeInstanceOf(Object)
            expect(missionCards[0]._id).toBeDefined
            expect(missionCards[0]).toBeDefined
            expect(typeof missionCards[0][1]).toBe("string")
            expect(missionCards[0][1].length).toBeGreaterThan(0)
            expect(missionCards[0].first).toBeDefined
            expect(missionCards[0].first).toBeGreaterThan(0)

            expect(turnCards).toBeDefined

            expect(turnCards).toBeInstanceOf(Object)
            expect(turnCards[1]).toBeInstanceOf(Object)
            expect(turnCards[2]).toBeInstanceOf(Object)
            expect(turnCards[3]).toBeInstanceOf(Object)
            expect(turnCards[1].A).toBeGreaterThan(0)
            expect(turnCards[2].A).toBeGreaterThan(0)
            expect(turnCards[3].A).toBeGreaterThan(0)
            expect(typeof turnCards[1].B).toBe("string")
            expect(typeof turnCards[2].B).toBe("string")
            expect(typeof turnCards[3].B).toBe("string")

            expect(mapStatus).toBeDefined

            expect(mapStatus).toBeInstanceOf(Object)
            expect(mapStatus[1]).toBeInstanceOf(Array)
            expect(mapStatus[2]).toBeInstanceOf(Array)
            expect(mapStatus[3]).toBeInstanceOf(Array)
            expect(mapStatus[1].length).toBe(6)
            expect(mapStatus[2].length).toBe(6)
            expect(mapStatus[3].length).toBe(7)
            expect(mapStatus[1][random9]).toBeInstanceOf(Array)
            expect(mapStatus[2][random9]).toBeInstanceOf(Array)
            expect(mapStatus[3][random8]).toBeInstanceOf(Array)
            expect(mapStatus[1][random9][0]).toBe(0)
            expect(mapStatus[2][random9][0]).toBe(0)
            expect(mapStatus[3][random8][0]).toBe(0)
            expect(mapStatus[1][random9][1]).toBeFalsy()
            expect(mapStatus[2][random9][1]).toBeFalsy()
            expect(mapStatus[3][random8][1]).toBeFalsy()

            expect(userPuntuation).toBeDefined

            const { missionCards: playerMission, OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount, } = userPuntuation
            const { OneEggNestLvL, TwoEggNestLvL, ThreeEggNestLvL, FourEggNestLvL, ToolsUsed, ToolsPuntuation, SecurityLvL, SecurityPuntuation, StrikeLvL, puntuationSchema } = userPuntuation

            //Inside User Puntuation
            expect(playerMission).toBeInstanceOf(Array)

            expect(playerMission[0]).toBeInstanceOf(Object)
            expect(playerMission[0].complted).toBeFalsy()
            expect(playerMission[0].points).toBe(0)

            expect(playerMission[1]).toBeInstanceOf(Object)
            expect(playerMission[1].complted).toBeFalsy()
            expect(playerMission[1].points).toBe(0)

            expect(playerMission[2]).toBeInstanceOf(Object)
            expect(playerMission[2].complted).toBeFalsy()
            expect(playerMission[2].points).toBe(0)

            expect(OneEggNestAmount).toBe(0)
            expect(TwoEggNestAmount).toBe(0)
            expect(ThreeEggNestAmount).toBe(0)
            expect(FourEggNestAmount).toBe(0)

            expect(OneEggNestLvL).toBe(0)
            expect(TwoEggNestLvL).toBe(0)
            expect(ThreeEggNestLvL).toBe(0)
            expect(FourEggNestLvL).toBe(0)

            expect(ToolsUsed).toBe(0)
            expect(ToolsPuntuation).toBe(7)

            expect(SecurityLvL).toBeInstanceOf(Object)
            expect(SecurityLvL[1]).toBe(0)
            expect(SecurityLvL[2]).toBe(0)
            expect(SecurityLvL[3]).toBe(0)
            expect(SecurityLvL[4]).toBe(0)

            expect(SecurityPuntuation).toBe(0)
            expect(StrikeLvL).toBe(0)


            //Inside Puntuation Schema
            expect(puntuationSchema).toBeDefined()

            const { OneEggNestLvL: OneLvL, TwoEggNestLvL: TwoLvL, ThreeEggNestLvL: ThreeLvL, FourEggNestLvL: FourLvL, ToolsPuntuation: ToolsLvL, SecurityLvL: ScLvL, StrikeLvL: StLvL } = puntuationSchema

            expect(OneLvL).toBeInstanceOf(Array)
            expect(OneLvL[0]).toBe(1)
            expect(OneLvL[1]).toBe(2)

            expect(TwoLvL).toBeInstanceOf(Array)
            expect(TwoLvL[0]).toBe(2)
            expect(TwoLvL[1]).toBe(3)
            expect(TwoLvL[2]).toBe(4)

            expect(ThreeLvL).toBeInstanceOf(Array)
            expect(ThreeLvL[0]).toBe(3)
            expect(ThreeLvL[1]).toBe(4)
            expect(ThreeLvL[2]).toBe(5)
            expect(ThreeLvL[3]).toBe(6)

            expect(FourLvL).toBeInstanceOf(Array)
            expect(FourLvL[0]).toBe(4)
            expect(FourLvL[1]).toBe(5)
            expect(FourLvL[2]).toBe(6)
            expect(FourLvL[3]).toBe(7)

            expect(ToolsLvL).toBeInstanceOf(Array)
            expect(ToolsLvL[0]).toBe(0)
            expect(ToolsLvL[1]).toBe(3)
            expect(ToolsLvL[2]).toBe(5)
            expect(ToolsLvL[3]).toBe(7)

            expect(ScLvL).toBeInstanceOf(Object)
            expect(ScLvL[1]).toBeInstanceOf(Array)
            expect(ScLvL[2]).toBeInstanceOf(Array)
            expect(ScLvL[3]).toBeInstanceOf(Array)
            expect(ScLvL[4]).toBeInstanceOf(Array)

            expect(ScLvL[1][0]).toBe(0)
            expect(ScLvL[1][1]).toBe(1)
            expect(ScLvL[1][2]).toBe(2)

            expect(ScLvL[2][0]).toBe(0)
            expect(ScLvL[2][1]).toBe(1)
            expect(ScLvL[2][2]).toBe(3)
            expect(ScLvL[2][3]).toBe(5)

            expect(ScLvL[3][0]).toBe(0)
            expect(ScLvL[3][1]).toBe(1)
            expect(ScLvL[3][2]).toBe(2)
            expect(ScLvL[3][3]).toBe(5)

            expect(ScLvL[4][0]).toBe(0)
            expect(ScLvL[4][1]).toBe(1)
            expect(ScLvL[4][2]).toBe(2)
            expect(ScLvL[4][3]).toBe(5)
            expect(ScLvL[4][4]).toBe(6)

            expect(StLvL).toBeInstanceOf(Array)
            expect(StLvL[0]).toBe(0)
            expect(StLvL[1]).toBe(0)
            expect(StLvL[2]).toBe(-1)
            expect(StLvL[3]).toBe(-3)
        })

        it('should fail on not existing GameId', async () => {
            logic.__ActualGame__ = "gjhklñkjh"
            try {
                await logic.startGame()

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Bad Way")
            }
        })
    })

    describe('continueGame', () => {
        let randomRow = Math.ceil(Math.random() * 2)
        let randomColumn = Math.ceil(Math.random() * 4)
        let UserGame


        beforeEach(async () => {
            UserGame = new models.User({ nickname: users_[3].nickname, age: users_[3].age, email: users_[3].email, password: users_[3].password, avatar: "hellomotto" })
            await UserGame.save()

            const { error, token } = await restApi.authenticate(UserGame.nickname, UserGame.password)
            logic.__userToken__ = token

            let response = await restApi.newGame(logic.__userToken__, { mode: "solo", playersNumber: 1 }, true)

            const { gameId: gameidresponse } = response
            logic.__ActualGame__ = gameidresponse

            await restApi.startGame(logic.__userToken__, logic.__ActualGame__)
        })


        it("Should success on retriving the next round for a solo game", async () => {
            const nextGameByCont = await logic.nextGame({

                resource: {
                    type: "tool",
                    row: 0,
                    column: 0,
                    nest: ""
                },
                map: {
                    status: true,
                    position: {
                        row: (randomRow),
                        column: (randomColumn)
                    }
                },
                missions: [false, false, false]

            }, { One: 1, Two: 0, Three: 0, Four: 0 })

            logic.finishedGame()

            expect(nextGameByCont).toBeDefined()

            const { round: _round, turnCards, missionStatus } = nextGameByCont

            expect(_round).toBe(2)

            expect(turnCards).toBeDefined()

            //Be
            expect(turnCards[0]).toBeDefined()
            expect(turnCards[1]).toBeDefined()
            expect(turnCards[2]).toBeDefined()

            expect(missionStatus[0]).toBeFalsy
            expect(missionStatus[1]).toBeFalsy
            expect(missionStatus[2]).toBeFalsy
        })

        it("Should success on retriving the final score after game is ended", async () => {
            
            await restApi.gameAction( logic.__userToken__, logic.__ActualGame__, { resource: { type: "strike", row: 0, column: 0, nest: ""}, map: { status: false, position: { row: (randomRow), column: (randomColumn)}}, missions: [false, false, false]}, { One: 1, Two: 0, Three: 0, Four: 0 })
            await restApi.gameAction( logic.__userToken__, logic.__ActualGame__, { resource: { type: "strike", row: 0, column: 0, nest: ""}, map: { status: false, position: { row: (randomRow), column: (randomColumn)}}, missions: [false, false, false]}, { One: 1, Two: 0, Three: 0, Four: 0 })

            const finalscore = await logic.nextGame({

                resource: {
                    type: "strike",
                    row: 0,
                    column: 0,
                    nest: ""
                },
                map: {
                    status: false,
                    position: {
                        row: (randomRow),
                        column: (randomColumn)
                    }
                },
                missions: [false, false, false]

            }, { One: 1, Two: 0, Three: 0, Four: 0 })

            expect(finalscore).toBeDefined()
        })

        it('should fail on not existing GameId', async () => {
            try {
                logic.__ActualGame__ = "dgfhjklñ"

                await logic.nextGame({

                    resource: {
                        type: "tool",
                        row: 0,
                        column: 0,
                        nest: ""
                    },
                    map: {
                        status: true,
                        position: {
                            row: (randomRow),
                            column: (randomColumn)
                        }
                    },
                    missions: [false, false, false]

                }, { One: 1, Two: 0, Three: 0, Four: 0 })

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Not response from the server")
            }
        })
    })

    describe('__updateValues__', () => {
        it('Should return true on an a penguin that can be clicked for build a nest with that amount of rocks', () => {
            const map = {
                1: [[0, 0, false], [1, 0, false], [1, 5, false], [2, 5, false]],
                2: [[3, 0, false], [2, 0, false], [2, 5, false], [3, 5, false]],
                3: [[4, 0, false], [2, 0, false], [1, 5, false], [3, 5, false], [7845, 5, false]]
            }

            const { One, Two, Three, Four } = logic.__updatedValues__(map)

            expect(One).toBe(3)
            expect(Two).toBe(4)
            expect(Three).toBe(3)
            expect(Four).toBe(1)
        })
    })

    describe('__isBreedable__', () => {
        it('Should return true on an a penguin that can be clicked for build a nest with that amount of rocks', () => {
            const map = { 0: [[0, 0, false], [0, 0, false]] }
            const position = [0, 0]
            let rocks = 3

            const clickable = logic.__isBreedable__(map, position, rocks)

            expect(clickable).toBeTruthy()
        })

        it('Should return false on an a penguin that can be clicked for build a nest with that amount of rocks', () => {
            const map = { 0: [[0, 0, false], [1, 3, false]] }
            const position = [0, 0]
            let rocks = 3

            const clickable = logic.__isBreedable__(map, position, rocks)

            expect(clickable).toBeFalsy()
        })

        it('Should return false on an a penguin that can be clicked for build a nest with that amount of rocks', () => {
            const map = { 0: [[1, 3, false], [0, 0, false]] }
            const position = [0, 1]
            let rocks = 3

            const clickable = logic.__isBreedable__(map, position, rocks)

            expect(clickable).toBeFalsy()
        })

        it('Should return false on an a penguin that can not be clicked for build a nest because already done it', () => {
            const map = { 0: [[1, 5, true]] }
            const position = [0, 0]
            let rocks = 3

            const clickable = logic.__isBreedable__(map, position, rocks)

            expect(clickable).toBeFalsy()
        })

        it('Should return false on no rocks', () => {
            const map = { 0: [[1, 5, true]] }
            const position = [0, 0]
            let rocks = 0

            const clickable = logic.__isBreedable__(map, position, rocks)

            expect(clickable).toBeFalsy()
        })
    })

    describe('__isUsable__', () => {
        it('Should return true on an a penguin that can be clicked for use a love resource on', () => {
            const map = { 0: [[1, 5, false]] }
            const position = [0, 0]
            let resource = "love"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeTruthy()
        })

        it('Should return false on an a penguin that can not be clicked for use a love resource on', () => {
            const map = { 0: [[1, 5, true]] }
            const position = [0, 0]
            let resource = "love"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeFalsy()
        })


        it('Should return true on an a penguin that can be clicked for use a glue resource on', () => {
            const map = { 0: [[1, 3, false], [1, 5, false], [1, 7, false], [1, 8, false], [1, 9, false]] }
            const position = [0, 1]
            let resource = "glue"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeTruthy()
        })

        it('Should return false on an a penguin that can not be clicked for use a glue resource on', () => {
            const map = { 0: [[1, 1, false]] }
            const position = [0, 0]
            let resource = "glue"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeFalsy()
        })

        it('Should return false on an a penguin that can not be clicked for use a glue resource on because the number would be repeated', () => {
            const map = { 0: [[1, 1, false], [1, 2, false]] }
            const position = [0, 1]
            let resource = "glue"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeFalsy()
        })

        it('Should return false on an a penguin that has no nested for any resource on', () => {
            const map = { 0: [[0, 1, false]] }
            const position = [0, 0]
            let resource = "glue"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeFalsy()
        })

        it('Should return true on an a penguin that can be clicked for use a pick resource on', () => {
            const map = { 0: [[1, 3, false], [1, 5, false], [1, 7, false], [1, 8, false], [1, 9, false]] }
            const position = [0, 1]
            let resource = "pick"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeTruthy()
        })

        it('Should return false on an a penguin that can not be clicked for use a pick resource on', () => {
            const map = { 0: [[1, 1, false], [1, 2, false]] }
            const position = [0, 0]
            let resource = "pick"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeFalsy()
        })

        it('Should return false on an bad value of resource', () => {
            const map = { 0: [[1, 1, false]] }
            const position = [0, 0]
            let resource = "glutamato"

            const clickable = logic.__isUsable__(map, position, resource)

            expect(clickable).toBeFalsy()
        })

    })

    describe('__isComplete__', () => {

        it('Should return toComplete: true & type: "tools" on a completed tool mission', () => {
            const map = {}
            const puntuation = { ToolsUsed: 5 }
            let mission = { 0: ["tools", 5] }

            const { toComplete, type } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeTruthy()
            expect(type).toBe("tools")
        })

        it('Should return toComplete: false on an incompleted tool mission', () => {
            const map = {}
            const puntuation = { ToolsUsed: 4 }
            let mission = { 0: ["tools", 5] }

            const { toComplete } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeFalsy()
        })

        it('Should return toComplete: true & type: "security" on a completed security row 1 mission', () => {
            const map = {}
            const puntuation = { SecurityLvL: { 1: 5 } }
            let mission = { 0: ["Security[1]", 5] }

            const { toComplete, type } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeTruthy()
            expect(type).toBe("security")
        })

        it('Should return toComplete: false on an incompleted row1 mission', () => {
            const map = {}
            const puntuation = { SecurityLvL: { 1: 4 } }
            let mission = { 0: ["Security[1]", 5] }

            const { toComplete } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeFalsy()
        })

        it('Should return toComplete: true & type: "security" on a completed security row 2 mission', () => {
            const map = {}
            const puntuation = { SecurityLvL: { 2: 5 } }
            let mission = { 0: ["Security[2]", 5] }

            const { toComplete, type } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeTruthy()
            expect(type).toBe("security")
        })

        it('Should return toComplete: false on an incompleted row2 mission', () => {
            const map = {}
            const puntuation = { SecurityLvL: { 2: 4 } }
            let mission = { 0: ["Security[2]", 5] }

            const { toComplete } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeFalsy()
        })

        it('Should return toComplete: true & type: "security" on a completed security row 3 mission', () => {
            const map = {}
            const puntuation = { SecurityLvL: { 3: 5 } }
            let mission = { 0: ["Security[3]", 5] }

            const { toComplete, type } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeTruthy()
            expect(type).toBe("security")
        })

        it('Should return toComplete: false on an incompleted row3 mission', () => {
            const map = {}
            const puntuation = { SecurityLvL: { 3: 4 } }
            let mission = { 0: ["Security[3]", 5] }

            const { toComplete } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeFalsy()
        })

        it('Should return toComplete: true, a toHatch that is an array abs && type: "love" on a completed 1EGG NEST mission', () => {
            const map = { 1: [[1], [2], [1], [1]], 2: [[1], [2], [3]], 3: [[3], [4], [4]] }
            const puntuation = { OneEggNestAmount: 4 }
            let mission = { 0: ["1EGG", 4] }

            const { toComplete, toHatch, type } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeTruthy()
            expect(toHatch).toBeDefined()
            expect(type).toBe("love")
        })

        it('Should return toComplete: false on an incompleted 1EGG NEST mission', () => {
            const map = { 1: [[1], [2], [1]], 2: [[1], [2], [3]], 3: [[3], [4], [4]] }
            const puntuation = { OneEggNestAmount: 3 }
            let mission = { 0: ["1EGG", 4] }

            const { toComplete, toHatch } = logic.__isCompleted__(map, puntuation, mission)
            expect(toHatch).toBeUndefined()
            expect(toComplete).toBeFalsy()
        })

        it('Should return toComplete: true, a toHatch that is an array abs && type: "love" on a completed 2EGG NEST mission', () => {
            const map = { 1: [[1], [2], [1], [1]], 2: [[1], [2], [3]], 3: [[3], [4], [4]] }
            const puntuation = { TwoEggNestAmount: 2 }
            let mission = { 0: ["2EGG", 2] }

            const { toComplete, toHatch, type } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeTruthy()
            expect(toHatch).toBeDefined()
            expect(type).toBe("love")
        })

        it('Should return toComplete: false on an incompleted 2EGG NEST mission', () => {
            const map = { 1: [[1], [2], [1]], 2: [[1], [2], [3]], 3: [[3], [4], [4]] }
            const puntuation = { TwoEggNestAmount: 2 }
            let mission = { 0: ["2EGG", 3] }

            const { toComplete, toHatch } = logic.__isCompleted__(map, puntuation, mission)
            expect(toHatch).toBeUndefined()
            expect(toComplete).toBeFalsy()
        })

        it('Should return toComplete: true, a toHatch that is an array abs && type: "love" on a completed 3EGG NEST mission', () => {
            const map = { 1: [[1], [2], [1], [1]], 2: [[1], [2], [3]], 3: [[3], [4], [4]] }
            const puntuation = { ThreeEggNestAmount: 2 }
            let mission = { 0: ["3EGG", 2] }

            const { toComplete, toHatch, type } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeTruthy()
            expect(toHatch).toBeDefined()
            expect(type).toBe("love")
        })

        it('Should return toComplete: false on an incompleted 3EGG NEST mission', () => {
            const map = { 1: [[1], [2], [1]], 2: [[1], [2], [3]], 3: [[3], [4], [4]] }
            const puntuation = { ThreeEggNestAmount: 2 }
            let mission = { 0: ["3EGG", 3] }

            const { toComplete, toHatch } = logic.__isCompleted__(map, puntuation, mission)
            expect(toHatch).toBeUndefined()
            expect(toComplete).toBeFalsy()
        })

        it('Should return toComplete: true, a toHatch that is an array abs && type: "love" on a completed 4EGG NEST mission', () => {
            const map = { 1: [[1], [2], [1], [1]], 2: [[1], [2], [3]], 3: [[3], [4], [4]] }
            const puntuation = { FourEggNestAmount: 2 }
            let mission = { 0: ["4EGG", 2] }

            const { toComplete, toHatch, type } = logic.__isCompleted__(map, puntuation, mission)

            expect(toComplete).toBeTruthy()
            expect(toHatch).toBeDefined()
            expect(type).toBe("love")
        })

        it('Should return toComplete: false on an incompleted 4EGG NEST mission', () => {
            const map = { 1: [[1], [2], [1]], 2: [[1], [2], [3]], 3: [[3], [4], [4]] }
            const puntuation = { FourEggNestAmount: 2 }
            let mission = { 0: ["4EGG", 3] }

            const { toComplete, toHatch } = logic.__isCompleted__(map, puntuation, mission)
            expect(toHatch).toBeUndefined()
            expect(toComplete).toBeFalsy()
        })
    })
    describe('__isSecurityAvailable__', () => {

        it('Should return true when toCompare index of Number is lower than the maximum on the same index length -1', () => {
            const number = 4
            const toCompare = { 4: [4] }
            let maximum = { 4: [1, 2, 3, 4, 5, 6] }

            const did = logic.__isSecurityAvailable__(number, toCompare, maximum)

            expect(did).toBeTruthy()
        })

        it('Should return false when toCompare is the same or bigger than the maximum length -1', () => {
            const number = 4
            const toCompare = { 4: [4] }
            let maximum = { 4: [1, 2, 3, 4] }

            const did = logic.__isSecurityAvailable__(number, toCompare, maximum)

            expect(did).toBeFalsy()
        })
    })

    describe('__isUpgradeAvailable', () => {

        it('Should return true when toCompare is lower than the maximum length -1', () => {
            const toCompare = Math.floor(Math.random() * 50)
            let maximum = new Array(toCompare + 2).fill(0)

            const did = logic.__isUpgradeAvailable__(toCompare, maximum)

            expect(did).toBeTruthy()
        })

        it('Should return false when toCompare is the same or bigger than the maximum length -1', () => {
            const toCompare = Math.floor(Math.random() * 50)
            let maximum = new Array(toCompare).fill(0)

            const did = logic.__isUpgradeAvailable__(toCompare, maximum)

            expect(did).toBeFalsy()
        })

    })

    afterAll(async () => {
        await models.GameRecord.deleteMany({})
        await models.User.deleteMany({})
        await mongoose.disconnect()
    })
})