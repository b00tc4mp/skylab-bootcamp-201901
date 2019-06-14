const logic = require('.')
require('../common/utils/array-random.polyfill')
const { models: { User, Result, GameRecord, MissionDeck, GameDeck }, mongoose } = require('breedingseason-data')
const { alivePrivateGames, alivePublicGames, Game } = require("./game/game")
const bcrypt = require('bcrypt')
const url = 'mongodb://localhost/breeding-test'

describe('user data', () => {
    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    const names = ['Asereje', 'Asereja', 'Aserejo']

    let users_

    beforeEach(async () => {

        await User.deleteMany()

        users_ = new Array(Math.random(100) +2 * 15).fill().map(() => ({
            nickname: `${names.random()}*sdf${Math.random()}`,
            age: Math.ceil(Math.random() * 15 + 13),
            email: `grillo-${Math.random()}@mail.com`,
            password: `123-${Math.random()}`
        }))

    })

    describe('create', () => {
        it('should succeed on correct data', async () => {
            await logic.registerUser(users_[0].nickname, users_[0].age, users_[0].email, users_[0].password)

            let user = await User.findOne({ email: users_[0].email })

            expect(user._id).toBeDefined()
            expect(user.nickname).toBe(users_[0].nickname)
            expect(user.email).toBe(users_[0].email)
            expect(user.password).toBe(users_[0].password)
            expect(user.age).toBe(users_[0].age)

        })

        it('should fail on already used Nickname', async () => {

            await User.create({ nickname: users_[0].nickname, age: users_[0].age, email: users_[0].email, password: users_[0].password, avatar: "hellomotto" })

            try {
                await logic.registerUser(users_[0].nickname, users_[1].age, users_[1].email, users_[1].password)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe(`User with ${users_[0].nickname} already exist`)
            }
        })

        it('should fail on already used Email', async () => {
            await User.create({ nickname: users_[1].nickname, age: users_[0].age, email: users_[0].email, password: users_[0].password, avatar: "hellomotto" })

            try {
                await logic.registerUser(users_[0].nickname, users_[0].age, users_[0].email, users_[1].password)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe(`User with ${users_[0].email} already exist`)
            }
        })
    })

    describe('retrieve', () => {
        let retrievedUser

        beforeEach(async () => {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(users_[2].password, 10, function (err, hash) {
                    if (err) reject(err)
                    resolve(hash)
                })
            })
            retrievedUser = new User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: hashedPassword, avatar: "hellomotto" })
            await retrievedUser.save()
        })

        it('should succeed on an already existing user', async () => {
            const _user = await logic.retrieveUser(retrievedUser._id.toString())

            expect(_user.id).toBeUndefined()
            expect(_user.nickname).toEqual(retrievedUser.nickname)
            expect(_user.age).toEqual(retrievedUser.age)
            expect(_user.email).toEqual(retrievedUser.email)
            expect(_user.avatar).toEqual(retrievedUser.avatar)
        })

        it('should fail on not existing iD', async () => {
            try {
                await logic.retrieveUser(retrievedUser._id.toString().toUpperCase())

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("No User for that id")
            }
        })
    })

    describe('auth', () => {
        let authUser

        beforeEach(async () => {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(users_[2].password, 10, function (err, hash) {
                    if (err) reject(err)
                    resolve(hash)
                })
            })
            authUser = new User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: hashedPassword, avatar: "hellomotto" })
            await authUser.save()
        })

        it('should succeed on correct data user Nickname and Password', async () => {
            const authUserId = await logic.authenticateUser(users_[2].nickname, users_[2].password)

            expect(authUserId).toBeDefined()

            expect(authUserId).toEqual(authUser._id)
        })

        it('should succeed on correct data user Email and Password', async () => {
            const authUserId = await logic.authenticateUser(users_[2].email, users_[2].password)

            expect(authUserId).toBeDefined()

            expect(authUserId).toEqual(authUser._id)
        })

        it('should fail on not matching Email and Password', async () => {
            try {
                await logic.authenticateUser(users_[2].email, users_[1].password)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe(`Email and Password do not match`)
            }
        })

        it('should fail on not matching Nickname and Password', async () => {
            try {
                await logic.authenticateUser(users_[2].nickname, users_[1].password)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe(`Nickname and Password do not match`)
            }
        })
    })

    describe('retrieveGameData', () => {
        let retrievedUserGame
        let GameId

        beforeEach(async () => {
            GameId = `Jhaken-${Math.floor(Math.random() * 89)}`

            retrievedUserGame = new User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await retrievedUserGame.save()

            newHistory = new GameRecord({ gameId: GameId, players: [retrievedUserGame._id] })

            await newHistory.save()

            newResults = new Result({
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
                StrikeLvL: 0,
                puntuation: 7
            })

            newHistory.gameHistory.push(newResults)

            await newHistory.save()

            retrievedUserGame.gameHistory.push(newHistory._id)

            await retrievedUserGame.save()
        })

        it('should succeed on retrieve the game data on an existing user with data asociated', async () => {

            const gameHistoric = await logic.retrieveUserGameData(retrievedUserGame._id.toString())

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

            const gameHistoric = await logic.retrieveUserGameData(retrievedUserGame._id.toString())

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
                await logic.retrieveUserGameData(retrievedUserGame._id.toString().toUpperCase())

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("No User for that id")
            }
        })
    })

    describe('newGame', () => {
        let retrievedUserGame
        let GameId

        beforeEach(async () => {
            GameId = `Jhaken-${Math.floor(Math.random() * 89)}`

            retrievedUserGame = new User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await retrievedUserGame.save()
        })

        it("Should work on creating a solo player game instance", async () => {

            const gameRef = await logic.newGame(retrievedUserGame._id.toString(), GameId, { mode: "solo", playersNumber: 1 }, privateGame = true)

            expect(gameRef).toBeDefined
            expect(gameRef).toBe(GameId)
            expect(alivePrivateGames).toBeDefined
            expect(alivePrivateGames.length).toBe(1)
            expect(alivePublicGames.length).toBe(0)

            alivePrivateGames.pop()
        })

        it("Should work on creating a multiplayer public player game instance", async () => {

            const gameRef = await logic.newGame(retrievedUserGame._id.toString(), GameId, { mode: "multiplayer", playersNumber: 3 }, privateGame = false)

            expect(gameRef).toBeDefined
            expect(gameRef).toBe(GameId)
            expect(alivePublicGames).toBeDefined
            expect(alivePrivateGames.length).toBe(0)
            expect(alivePublicGames.length).toBe(1)

            alivePublicGames.pop()
        })

        it('should fail on not existing iD', async () => {
            try {
                await logic.newGame(retrievedUserGame._id.toString().toUpperCase(), GameId, { mode: "multiplayer", playersNumber: 3 }, privateGame = false)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("No User for that id")
            }
        })
    })

    describe('startGame', () => {
        let random9 = Math.floor(Math.random() * 6)
        let random8 = Math.floor(Math.random() * 6)

        beforeEach(async () => {
            alivePrivateGames.pop()
            alivePublicGames.pop()

            let creator = new User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await creator.save()

            const GameId = `Jhaken-${Math.floor(Math.random() * 89)}`

            alivePrivateGames.push(new Game(creator._id.toString(), GameId.toUpperCase(), { mode: "solo", playersNumber: 1 }))
            alivePublicGames.push(new Game(creator._id.toString(), GameId, { mode: "multiplayer", playersNumber: 2 }))
        })

        it('Should return the initialpackage for a Solo mode player', async () => {

            const initialpackage = await logic.startGame(alivePrivateGames[0].creator, alivePrivateGames[0].id)

            expect(initialpackage).toBeDefined()
            expect(initialpackage).not.toBe("Waiting other players to start")

            const { player, round, missionCards, turnCards, mapStatus, userPuntuation } = initialpackage

            //Initial Package toop level elemnts
            expect(player).toBe(alivePrivateGames[0].creator)
            expect(round).toBe(1)
            expect(missionCards).toBeDefined

            expect(missionCards[0]).toBeInstanceOf(Object)
            expect(typeof missionCards[0][1]).toBe("string")
            expect(missionCards[0][1].length).toBeGreaterThan(0)
            expect(missionCards[0].first).toBeDefined()
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
            expect(mapStatus[3].length).toBe(6)
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

            const { player: playerPunt, missionCards: playerMission, OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount, } = userPuntuation
            const { OneEggNestLvL, TwoEggNestLvL, ThreeEggNestLvL, FourEggNestLvL, ToolsUsed, ToolsPuntuation, SecurityLvL, SecurityPuntuation, StrikeLvL, puntuationSchema } = userPuntuation

            //Inside User Puntuation
            expect(playerPunt).toBe(alivePrivateGames[0].creator)

            expect(playerMission).toBeInstanceOf(Array)

            expect(playerMission[0]).toBeInstanceOf(Object)
            expect(playerMission[0].complted).toBeFalsy()
            expect(playerMission[0].points).toBe(0)

            expect(playerMission[1]).toBeInstanceOf(Object)
            expect(playerMission[1].completed).toBeFalsy()
            expect(playerMission[1].points).toBe(0)

            expect(playerMission[2]).toBeInstanceOf(Object)
            expect(playerMission[2].completed).toBeFalsy()
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

            if (alivePrivateGames[0].mode === "solo") expect(ToolsPuntuation).toBe(7)
            else expect(ToolsPuntuation).toBe(0)

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

            //Checking changes in game instance
            expect(alivePrivateGames[0].cardsFetched).toBeTruthy()
            expect(alivePrivateGames[0].playersPackages.length).toBe(1)
            expect(alivePrivateGames[0].playersPackages[0].player).toBe(alivePrivateGames[0].creator)
            expect(alivePrivateGames[0].playersPackages[0].userRound).toBe(1)
            expect(alivePrivateGames[0].playersPackages[0].mapStatus).toBeInstanceOf(Object)
            expect(alivePrivateGames[0].playersPackages[0].userPuntuation).toBeInstanceOf(Object)
        })

        it('Should return a message when waiting for a multiplayer game to start', async () => {

            const initialpackage = await logic.startGame(alivePublicGames[0].creator, alivePublicGames[0].id)

            expect(initialpackage).toBeDefined()
            expect(initialpackage).toBe("Waiting for players to join")
            expect(alivePublicGames[0].cardsFetched).toBeFalsy()

        })

        it('Should return a message when cards fetched and game ready to start for a multiplayer game to start', async () => { //Need the join first
            alivePublicGames[0].addPlayer("SecondPlayer")
            await alivePublicGames[0].startFunction("SecondPlayer")

            const initialpackage = await logic.startGame(alivePublicGames[0].creator, alivePublicGames[0].id)

            expect(initialpackage).toBeDefined()
            expect(initialpackage).toBe("Cards Fetched")
            expect(alivePublicGames[0].cardsFetched).toBeTruthy()
        })

        it('should fail on not existing iD', async () => {
            try {
                await logic.startGame(alivePublicGames[0].creator.toUpperCase(), alivePublicGames[0].id)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("No User for that id")
            }
        })

        it('should fail on not existing GameId', async () => {
            try {
                await logic.startGame(alivePublicGames[0].creator, "Hello")

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("That Game Id is not an active game one")
            }
        })
    })

    describe('joinGame', () => {
        let userToAdd, GameId

        beforeEach(async () => {
            alivePrivateGames.pop()
            alivePublicGames.pop()

            let creator = new User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await creator.save()

            userToAdd = new User({ nickname: users_[0].nickname, age: users_[0].age, email: users_[0].email, password: users_[0].password, avatar: "hellomotto" })
            await userToAdd.save()

            GameId = `Jhaken-${Math.floor(Math.random() * 89)}`

            alivePrivateGames.push(new Game(creator._id.toString(), GameId.toUpperCase(), { mode: "multiplayer", playersNumber: 2 }))
            alivePublicGames.push(new Game(creator._id.toString(), GameId, { mode: "multiplayer", playersNumber: 2 }))
        })

        it("Should succes on adding a player on a Public multiplayer game", async () => {
            const responseId = await logic.joinGame(userToAdd._id.toString(), "searching")

            expect(responseId).toBeDefined()
            expect(responseId).toBe(GameId)

        })

        it("Should succes on adding a player on a Public private game whit the GameId", async () => {

            const responseId = await logic.joinGame(userToAdd._id.toString(), alivePrivateGames[0].id)

            expect(responseId).toBeDefined()
            expect(responseId).toBe(alivePrivateGames[0].id)

        })

        it('should fail on not existing GameId', async () => {
            try {
                await logic.joinGame(userToAdd._id.toString().toUpperCase(), alivePrivateGames[0].id)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("No User for that id")
            }
        })

        it('should fail on not existing public games to join', async () => {
            alivePublicGames.pop()
            const error = await logic.joinGame(userToAdd._id.toString(), "searching")

            expect(error).toBeDefined()
            expect(error).toBe("Cannot read property 'addPlayer' of undefined") // undefined because it didn't find a place to play

        })
    })

    describe('continueGame', () => {
        let randomRow = Math.ceil(Math.random() * 3)
        let randomColumn = Math.ceil(Math.random() * 5)
        let userToAdd

        beforeEach(async () => {
            alivePrivateGames.pop()
            alivePublicGames.pop()

            let creator = new User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await creator.save()
            
            userToAdd = new User({ nickname: users_[0].nickname, age: users_[0].age, email: users_[0].email, password: users_[0].password, avatar: "hellomotto" })
            await userToAdd.save()

            const GameId = `Jhaken-${Math.floor(Math.random() * 89)}`

            alivePrivateGames.push(new Game(creator._id.toString(), GameId.toUpperCase(), { mode: "solo", playersNumber: 1 }))
            alivePublicGames.push(new Game(creator._id.toString(), GameId, { mode: "multiplayer", playersNumber: 2 }))

            await alivePublicGames[0].addPlayer(userToAdd._id.toString())
        })

        it("Should success on retriving the next round for a solo game", async () => {
            await alivePrivateGames[0].startFunction(alivePrivateGames[0].creator)

            const nextGameByCont = await logic.continueGame(alivePrivateGames[0].creator, alivePrivateGames[0].id, {

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

            expect(nextGameByCont).toBeDefined()

            const { round: _round, turnCards, missionStatus } = nextGameByCont

            expect(_round).toBe(2)

            expect(turnCards).toBeDefined()

            //Be
            expect(turnCards[0]).toBe(alivePrivateGames[0].penguinCards[1][_round])
            expect(turnCards[1]).toBe(alivePrivateGames[0].penguinCards[2][_round])
            expect(turnCards[2]).toBe(alivePrivateGames[0].penguinCards[3][_round])
            //Not be
            expect(turnCards[0]).not.toBe(alivePrivateGames[0].penguinCards[1][_round + 1])
            expect(turnCards[1]).not.toBe(alivePrivateGames[0].penguinCards[2][_round + 1])
            expect(turnCards[2]).not.toBe(alivePrivateGames[0].penguinCards[3][_round + 1])

            expect(missionStatus).toBeDefined()

            expect(missionStatus[0]).toBe(alivePrivateGames[0].missionCardsStatus[0])
            expect(missionStatus[1]).toBe(alivePrivateGames[0].missionCardsStatus[1])
            expect(missionStatus[2]).toBe(alivePrivateGames[0].missionCardsStatus[2])

            //Check the changes in the instance of game
            expect(alivePrivateGames[0].players[0].nextRound).toBeFalsy()


        })

        it("Should succes on retriving nothing for multiplayer game but changin  the user nextRound to true", async () => {
            await alivePublicGames[0].startFunction(alivePublicGames[0].creator)
            await alivePublicGames[0].startFunction(userToAdd._id.toString())
            
            await alivePublicGames[0].__sendInitialPackage__(alivePublicGames[0].creator)
            await alivePublicGames[0].__sendInitialPackage__(userToAdd._id.toString())

            const nextGameByCont = await logic.continueGame(alivePublicGames[0].creator, alivePublicGames[0].id, {

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

            expect(nextGameByCont).toBeUndefined()

            expect(alivePublicGames[0].players[0].nextRound).toBeTruthy()
        })

        it('should fail on not existing UserId', async () => {
            try {
                await logic.continueGame(alivePublicGames[0].creator.toUpperCase(), alivePublicGames[0].id, {

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
                expect(err.message).toBe("No User for that id")
            }
        })

        it('should fail on not existing GameId', async () => {
            try {
                await logic.continueGame(alivePublicGames[0].creator, "howhowhow", {

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
                expect(err.message).toBe("That Game Id is not an active game one")
            }
        })
    })

    describe('updateGame', () => {
        let userToAdd, GameId, creator
        let random9 = Math.floor(Math.random() * 4)
        let random8 = Math.floor(Math.random() * 4)

        beforeEach(async () => {
            alivePrivateGames.pop()
            alivePublicGames.pop()

            creator = new User({ nickname: users_[2].nickname, age: users_[2].age, email: users_[2].email, password: users_[2].password, avatar: "hellomotto" })
            await creator.save()

            userToAdd = new User({ nickname: users_[0].nickname, age: users_[0].age, email: users_[0].email, password: users_[0].password, avatar: "hellomotto" })
            await userToAdd.save()

            GameId = `Jhaken-${Math.floor(Math.random() * 89)}`

            alivePrivateGames.push(new Game(creator._id.toString(), GameId.toUpperCase(), { mode: "multiplayer", playersNumber: 2 }))
            alivePublicGames.push(new Game(creator._id.toString(), GameId, { mode: "multiplayer", playersNumber: 2 }))

            alivePrivateGames[0].addPlayer(userToAdd._id.toString())
            alivePublicGames[0].addPlayer(userToAdd._id.toString())
        })

        it("Should succes on sending the initialPackage on a game with Start = true and round 0", async () => {

            await alivePrivateGames[0].startFunction(creator._id.toString())
            await alivePrivateGames[0].startFunction(userToAdd._id.toString())

            const initialPackageUpdate = await logic.updateGame(creator._id.toString(), alivePrivateGames[0].id)

            expect(initialPackageUpdate).toBeDefined()

            const { player, round, missionCards, turnCards, mapStatus, userPuntuation } = initialPackageUpdate

            //Initial Package toop level elemnts
            expect(player).toBe(alivePrivateGames[0].creator)
            expect(round).toBe(1)
            expect(missionCards).toBeDefined

            expect(missionCards[0]).toBeInstanceOf(Object)
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
            expect(mapStatus[3].length).toBe(6)
            expect(mapStatus[1][random9]).toBeInstanceOf(Array)
            expect(mapStatus[2][random9]).toBeInstanceOf(Array)
            expect(mapStatus[3][random8]).toBeInstanceOf(Array)
            expect(mapStatus[1][random9][0]).toBe(0)
            expect(mapStatus[2][random9][0]).toBe(0)
            expect(mapStatus[3][random8][0]).toBe(0)
            expect(mapStatus[1][random9][1]).toBeFalsy()
            expect(mapStatus[2][random9][1]).toBeFalsy()

            expect(userPuntuation).toBeDefined

            const { player: playerPunt, missionCards: playerMission, OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount, } = userPuntuation
            const { OneEggNestLvL, TwoEggNestLvL, ThreeEggNestLvL, FourEggNestLvL, ToolsUsed, ToolsPuntuation, SecurityLvL, SecurityPuntuation, StrikeLvL, puntuationSchema } = userPuntuation

            //Inside User Puntuation
            expect(playerPunt).toBe(alivePrivateGames[0].creator)

            expect(playerMission).toBeInstanceOf(Array)

            expect(playerMission[0]).toBeInstanceOf(Object)
            expect(playerMission[0].completed).toBeFalsy()
            expect(playerMission[0].points).toBe(0)

            expect(playerMission[1]).toBeInstanceOf(Object)
            expect(playerMission[1].completed).toBeFalsy()
            expect(playerMission[1].points).toBe(0)

            expect(playerMission[2]).toBeInstanceOf(Object)
            expect(playerMission[2].completed).toBeFalsy()
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

            if (alivePrivateGames[0].mode === "solo") expect(ToolsPuntuation).toBe(7)
            else expect(ToolsPuntuation).toBe(0)

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

            //Checking changes in game instance
            expect(alivePrivateGames[0].cardsFetched).toBeTruthy()
            expect(alivePrivateGames[0].playersPackages.length).toBe(1)
            expect(alivePrivateGames[0].playersPackages[0].player).toBe(alivePrivateGames[0].creator)
            expect(alivePrivateGames[0].playersPackages[0].userRound).toBe(1)
            expect(alivePrivateGames[0].playersPackages[0].mapStatus).toBeInstanceOf(Object)
            expect(alivePrivateGames[0].playersPackages[0].userPuntuation).toBeInstanceOf(Object)
        })

        it("Should success on retriving nothing while the game has not started", async () => {
            await alivePrivateGames[0].startFunction(creator._id.toString())

            const initialPackageUpdate = await logic.updateGame(creator._id.toString(), alivePrivateGames[0].id)

            expect(initialPackageUpdate).toBeUndefined()
        })

        it("Should success on retriving the next round when the next is true", async () => {
            await alivePublicGames[0].startFunction(creator._id.toString())
            await alivePublicGames[0].startFunction(userToAdd._id.toString())

            await alivePublicGames[0].__sendInitialPackage__(creator._id.toString())
            await alivePublicGames[0].__sendInitialPackage__(userToAdd._id.toString())

            alivePublicGames[0].round = 2
            alivePublicGames[0].next = true

            const nextPackageUpdate = await logic.updateGame(creator._id.toString(), alivePublicGames[0].id)

            expect(nextPackageUpdate).toBeDefined()

            const { round: _round, turnCards, missionStatus } = nextPackageUpdate

            expect(_round).toBe(2)

            expect(turnCards).toBeDefined()

            //Be
            expect(turnCards[0]).toBe(alivePublicGames[0].penguinCards[1][_round])
            expect(turnCards[1]).toBe(alivePublicGames[0].penguinCards[2][_round])
            expect(turnCards[2]).toBe(alivePublicGames[0].penguinCards[3][_round])
            //Not be
            expect(turnCards[0]).not.toBe(alivePublicGames[0].penguinCards[1][_round + 1])
            expect(turnCards[1]).not.toBe(alivePublicGames[0].penguinCards[2][_round + 1])
            expect(turnCards[2]).not.toBe(alivePublicGames[0].penguinCards[3][_round + 1])

            expect(missionStatus).toBeDefined()

            expect(missionStatus[0]).toBe(alivePublicGames[0].missionCardsStatus[0])
            expect(missionStatus[1]).toBe(alivePublicGames[0].missionCardsStatus[1])
            expect(missionStatus[2]).toBe(alivePublicGames[0].missionCardsStatus[2])

            //Check the changes in the instance of game
            expect(alivePublicGames[0].players[0].nextRound).toBeFalsy()

        })

        it('should fail on not existing UserId', async () => {
            try {
                await logic.updateGame(userToAdd._id.toString().toUpperCase(), alivePrivateGames[0].id)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("No User for that id")
            }
        })

        it('should fail on not existing GameId', async () => {
            try {
                await logic.updateGame(userToAdd._id.toString(), "hekkimoro")

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("That Game Id is not an active game one")
            }
        })

    })

    afterAll(async () => {
        await GameRecord.deleteMany({})
        await User.deleteMany({})
        await mongoose.disconnect()
    })
})