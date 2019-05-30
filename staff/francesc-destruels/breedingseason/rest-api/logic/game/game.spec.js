const { Game } = require('./game')
const { mongoose, models: { MissionDeck, GameDeck } } = require("breedingseason-data")

const url = 'mongodb://localhost/project_game'

describe('user data', () => {

    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true })
    })

    let gameToTest, toPlay, UserId, GameId, mode

    beforeEach(() => {
        toPlay = Math.floor(Math.random() + 1 * 89)
        UserId = `Aendai-${Math.floor(Math.random() * 89)}`
        GameId = `Jhaken-${Math.floor(Math.random() * 89)}`

        mode = Math.floor(Math.random() + 1 * 2) === 1 ? "solo" : "multiplayer"

        gameToTest = new Game(UserId, GameId, { mode, playersNumber: mode === "solo" ? 1 : toPlay })
    })

    describe('Create Game instance', () => {
        let toPlay
        let UserId
        let GameId
        let mode


        beforeEach(() => {
            toPlay = Math.ceil(Math.random() * 89)
            UserId = `Aendai-${Math.floor(Math.random() * 89)}`
            GameId = `Jhaken-${Math.floor(Math.random() * 89)}`
            mode = Math.ceil(Math.random() * 2) === 1 ? "solo" : "multiplayer"
        })

        it('Should success on creating a game instance for a solo player', async () => {

            const newSoloGame = new Game(UserId, GameId, { mode: "solo", playersNumber: 1 })

            expect(newSoloGame).toBeDefined

            const { mode, id, cardsFetched, creator, players, round, start, next, finish, missionCardsStatus, playersPackages, results, maxPlayer, missionCards, penguinCards } = newSoloGame

            expect(mode).toBe("solo")

            expect(id).toBe(GameId)

            expect(cardsFetched).toBeFalsy()

            expect(creator).toBe(UserId)

            expect(players).toBeInstanceOf(Array)
            expect(players).toHaveLength(1)
            expect(players[0]).toBeDefined()
            expect(players[0].id).toBe(UserId)
            expect(players[0].start).toBeFalsy()
            expect(players[0].nextRound).toBeFalsy()
            expect(players[0].winner).toBeFalsy()
            expect(players[1]).toBeUndefined()

            expect(round).toBe(0)

            expect(start).toBeTruthy()

            expect(next).toBeFalsy()

            expect(finish).toBeFalsy()

            expect(missionCardsStatus).toBeDefined()
            expect(missionCardsStatus).toHaveLength(3)

            expect(playersPackages).toBeDefined()
            expect(playersPackages).toHaveLength(0)


            expect(results).toBeDefined()
            expect(results).toHaveLength(0)

            expect(maxPlayer).toBe(1)

            expect(missionCards).toBeDefined()
            expect(missionCards).toHaveLength(0)


            expect(penguinCards).toBeDefined()
            expect(penguinCards[1]).toBeDefined()
            expect(penguinCards[2]).toBeDefined()
            expect(penguinCards[3]).toBeDefined()
            expect(penguinCards[1]).toBeInstanceOf(Array)
            expect(penguinCards[2]).toBeInstanceOf(Array)
            expect(penguinCards[3]).toBeInstanceOf(Array)

            expect(newSoloGame.init).toBeDefined()
            expect(newSoloGame.init).toBeInstanceOf(Function)

            expect(newSoloGame.addPlayer).toBeDefined()
            expect(newSoloGame.addPlayer).toBeInstanceOf(Function)

            // expect(newSoloGame.startFunction).toBeDefined()
            // expect(newSoloGame.startFunction).toBeInstanceOf(Function)

            expect(newSoloGame.__sendInitialPackage__).toBeDefined()
            expect(newSoloGame.__sendInitialPackage__).toBeInstanceOf(Function)

            // expect(newSoloGame.nextFunction).toBeDefined()
            // expect(newSoloGame.nextFunction).toBeInstanceOf(Function)

            expect(newSoloGame.__sendNextRound__).toBeDefined()
            expect(newSoloGame.__sendNextRound__).toBeInstanceOf(Function)

            // expect(newSoloGame.update).toBeDefined()
            // expect(newSoloGame.update).toBeInstanceOf(Function)

            // expect(newSoloGame.__results__).toBeDefined()
            // expect(newSoloGame.__results__).toBeInstanceOf(Function)

            // expect(newSoloGame.__checkWinner__).toBeDefined()
            // expect(newSoloGame.__checkWinner__).toBeInstanceOf(Function)
        })

        it('Should success on creating a game instance for a multiplayer game', async () => {
            const newMultiplayerGame = new Game(UserId, GameId, { mode: "multiplayer", playersNumber: toPlay })

            expect(newMultiplayerGame).toBeDefined

            const { mode, id, cardsFetched, creator, players, round, start, next, finish, missionCardsStatus, playersPackages, results, maxPlayer, missionCards, penguinCards } = newMultiplayerGame

            expect(mode).toBe("multiplayer")

            expect(id).toBe(GameId)

            expect(cardsFetched).toBeFalsy()

            expect(creator).toBe(UserId)

            expect(players).toBeInstanceOf(Array)
            expect(players).toHaveLength(1)
            expect(players[0]).toBeDefined()
            expect(players[0].id).toBe(UserId)
            expect(players[0].start).toBeFalsy()
            expect(players[0].nextRound).toBeFalsy()
            expect(players[0].winner).toBeFalsy()
            expect(players[1]).toBeUndefined()

            expect(round).toBe(0)

            expect(start).toBeFalsy()

            expect(next).toBeFalsy()

            expect(finish).toBeFalsy()

            expect(missionCardsStatus).toBeDefined()
            expect(missionCardsStatus).toHaveLength(3)

            expect(playersPackages).toBeDefined()
            expect(playersPackages).toHaveLength(0)


            expect(results).toBeDefined()
            expect(results).toHaveLength(0)

            expect(maxPlayer).toBe(toPlay)

            expect(missionCards).toBeDefined()
            expect(missionCards).toHaveLength(0)


            expect(penguinCards).toBeDefined()
            expect(penguinCards[1]).toBeDefined()
            expect(penguinCards[2]).toBeDefined()
            expect(penguinCards[3]).toBeDefined()
            expect(penguinCards[1]).toBeInstanceOf(Array)
            expect(penguinCards[2]).toBeInstanceOf(Array)
            expect(penguinCards[3]).toBeInstanceOf(Array)

            expect(newMultiplayerGame.init).toBeDefined()
            expect(newMultiplayerGame.init).toBeInstanceOf(Function)

            expect(newMultiplayerGame.addPlayer).toBeDefined()
            expect(newMultiplayerGame.addPlayer).toBeInstanceOf(Function)

            // expect(newMultiplayerGame.startFunction).toBeDefined()
            // expect(newMultiplayerGame.startFunction).toBeInstanceOf(Function)

            expect(newMultiplayerGame.__sendInitialPackage__).toBeDefined()
            expect(newMultiplayerGame.__sendInitialPackage__).toBeInstanceOf(Function)

            // expect(newMultiplayerGame.nextFunction).toBeDefined()
            // expect(newMultiplayerGame.nextFunction).toBeInstanceOf(Function)

            expect(newMultiplayerGame.__sendNextRound__).toBeDefined()
            expect(newMultiplayerGame.__sendNextRound__).toBeInstanceOf(Function)

            // expect(newMultiplayerGame.update).toBeDefined()
            // expect(newMultiplayerGame.update).toBeInstanceOf(Function)

            // expect(newMultiplayerGame.__results__).toBeDefined()
            // expect(newMultiplayerGame.__results__).toBeInstanceOf(Function)

            // expect(newMultiplayerGame.__checkWinner__).toBeDefined()
            // expect(newMultiplayerGame.__checkWinner__).toBeInstanceOf(Function)
        })

        it('Should faild on creating a game instance if UserId is Undefined', async () => {
            UserId = undefined

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `undefined`')
            }
        })

        it('Should faild on creating a game instance if UserId is Null', async () => {
            UserId = null

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `null`')
            }
        })

        it('Should faild on creating a game instance if UserId is NaN', async () => {
            UserId = NaN

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `number`')
            }
        })

        it('Should faild on creating a game instance if UserId is a Number', async () => {
            UserId = 33

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `number`')
            }
        })

        it('Should faild on creating a game instance if UserId is an Object', async () => {
            const UserId = {}

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `Object`')
            }
        })

        it('Should faild on creating a game instance if UserId is an empty String', async () => {
            const UserId = ""

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("[NOT] Expected string to be empty, got ``")
            }
        })

        it('Should faild on creating a game instance if GameId is Undefined', async () => {
            const GameId = undefined

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `undefined`')
            }
        })

        it('Should faild on creating a game instance if GameId is Null', async () => {
            const GameId = null

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `null`')
            }
        })

        it('Should faild on creating a game instance if GameId is NaN', async () => {
            const GameId = NaN

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `number`')
            }
        })

        it('Should faild on creating a game instance if GameId is Number', async () => {
            const GameId = 33

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `number`')
            }
        })

        it('Should faild on creating a game instance if GameId is an Object', async () => {
            const GameId = {}
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `string` but received type `Object`')
            }
        })

        it('Should faild on creating a game instance if GameId is an empty string', async () => {
            const GameId = ""

            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("[NOT] Expected string to be empty, got ``")
            }
        })

        it('Should faild on creating a game instance if Style is Undefined', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, undefined)

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `object` but received type `undefined`')
            }
        })

        it('Should faild on creating a game instance if Style is Null', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, null)

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `object` but received type `null`')
            }
        })

        it('Should faild on creating a game instance if Style is NaN', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, NaN)

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `object` but received type `number`')
            }
        })

        it('Should faild on creating a game instance if Style is Number', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, 33)

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `object` but received type `number`')
            }
        })

        it('Should faild on creating a game instance if Style is an empty Object', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, {})

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `mode` to be of type `string` but received type `undefined` in object")
            }
        })

        it('Should faild on creating a game instance if Style is an string', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, "hello")

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe('Expected argument to be of type `object` but received type `string`')
            }
        })

        it('Should faild on creating a game instance if mode is Undefined', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode: undefined, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `mode` to be of type `string` but received type `undefined` in object")
            }
        })

        it('Should faild on creating a game instance if mode is Null', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode: null, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `mode` to be of type `string` but received type `null` in object")
            }
        })

        it('Should faild on creating a game instance if mode is NaN', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode: NaN, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `mode` to be of type `string` but received type `number` in object")
            }
        })

        it('Should faild on creating a game instance if Mode is Number', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode: 33, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `mode` to be of type `string` but received type `number` in object")
            }
        })

        it('Should faild on creating a game instance if mode is an Object', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode: {}, playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `mode` to be of type `string` but received type `Object` in object")
            }
        })

        it('Should faild on creating a game instance if mode is an empty string', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode: "", playersNumber: toPlay })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("[NOT] Expected property string `mode` to be empty, got `` in object")
            }
        })

        it('Should faild on creating a game instance if playersNumber is Undefined', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: undefined })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `playersNumber` to be of type `number` but received type `undefined` in object")
            }
        })

        it('Should faild on creating a game instance if playersNumber is Null', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: null })
                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `playersNumber` to be of type `number` but received type `null` in object")
            }
        })

        it('Should faild on creating a game instance if playersNumber is NaN', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: NaN })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property number `playersNumber` `NaN` to pass custom validation function in object")
            }
        })

        it('Should faild on creating a game instance if playerNumber is Number not integer', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: 3.3 })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property number `playersNumber` `3.3` to pass custom validation function in object")
            }
        })

        it('Should faild on creating a game instance if playerNumber is an Object', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: {} })
                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `playersNumber` to be of type `number` but received type `Object` in object")
            }
        })

        it('Should faild on creating a game instance if mode is an string', async () => {
            try {
                const newMultiplayerGame = new Game(UserId, GameId, { mode, playersNumber: GameId })

                throw Error('Should not reach this point')
            }
            catch (err) {
                expect(err).toBeDefined
                expect(err.name).toBe('ArgumentError')
                expect(err.message).toBe("Expected property `playersNumber` to be of type `number` but received type `string` in object")
            }

        })
    })

    describe('.Init()', () => { //Method number 1 Done Happy && The case of throwing error 
        let randomIndex = Math.ceil(Math.random() * 20)

        it('Should success on initializacing the gamefile to contain the randomCards', async () => {

            await gameToTest.init()

            expect(gameToTest).toBeDefined

            const { mode: mode_, id, cardsFetched, creator, players, round, start, next, finish, missionCardsStatus, playersPackages, results, maxPlayer, missionCards, penguinCards } = gameToTest

            expect(mode_).toBe(mode)

            expect(id).toBe(GameId)

            expect(cardsFetched).toBeTruthy()

            expect(creator).toBe(UserId)

            expect(players).toBeInstanceOf(Array)
            expect(players).toHaveLength(1)
            expect(players[0]).toBeDefined()
            expect(players[0].id).toBe(UserId)
            expect(players[0].start).toBeFalsy()
            expect(players[0].nextRound).toBeFalsy()
            expect(players[0].winner).toBeFalsy()
            expect(players[1]).toBeUndefined()

            expect(round).toBe(0)

            if (mode === "solo") expect(start).toBeTruthy()
            else if (mode === "multiplayer") expect(start).toBeFalsy()

            expect(next).toBeFalsy()

            expect(finish).toBeFalsy()

            expect(missionCardsStatus).toBeDefined()
            expect(missionCardsStatus).toHaveLength(3)

            expect(playersPackages).toBeDefined()
            expect(playersPackages).toHaveLength(0)


            expect(results).toBeDefined()
            expect(results).toHaveLength(0)

            if (mode === "solo") expect(maxPlayer).toBe(1)
            else if (mode === "multiplayer") expect(maxPlayer).toBe(toPlay)

            expect(missionCards).toBeDefined()
            expect(missionCards).toHaveLength(3)

            expect(missionCards[0]).toBeInstanceOf(Object)
            expect(missionCards[0]._id).toBeDefined
            expect(missionCards[0][1]).toBeDefined
            expect(missionCards[0][2]).toBeDefined
            expect(typeof missionCards[0][1]).toBe("string")
            expect(typeof missionCards[0][2]).toBe("string")
            expect(missionCards[0][1].length).toBeGreaterThan(0)
            expect(missionCards[0][2].length).toBeGreaterThan(0)
            expect(missionCards[0].first).toBeDefined
            expect(missionCards[0].second).toBeDefined
            expect(missionCards[0].first).toBeGreaterThan(0)
            expect(missionCards[0].second).toBeGreaterThan(0)

            expect(penguinCards).toBeDefined()
            expect(penguinCards[1]).toBeDefined()
            expect(penguinCards[2]).toBeDefined()
            expect(penguinCards[3]).toBeDefined()
            expect(penguinCards[1]).toBeInstanceOf(Array)
            expect(penguinCards[2]).toBeInstanceOf(Array)
            expect(penguinCards[3]).toBeInstanceOf(Array)
            expect(penguinCards[1].length).toBe(21)
            expect(penguinCards[2].length).toBe(21)
            expect(penguinCards[3].length).toBe(21)
            expect(penguinCards[1][randomIndex]).toBeDefined()
            expect(penguinCards[2][randomIndex]).toBeDefined()
            expect(penguinCards[3][randomIndex]).toBeDefined()


            expect(gameToTest.init).toBeDefined()
            expect(gameToTest.init).toBeInstanceOf(Function)

            expect(gameToTest.addPlayer).toBeDefined()
            expect(gameToTest.addPlayer).toBeInstanceOf(Function)

            // expect(gameToTest.startFunction).toBeDefined()
            // expect(gameToTest.startFunction).toBeInstanceOf(Function)

            expect(gameToTest.__sendInitialPackage__).toBeDefined()
            expect(gameToTest.__sendInitialPackage__).toBeInstanceOf(Function)

            // expect(gameToTest.nextFunction).toBeDefined()
            // expect(gameToTest.nextFunction).toBeInstanceOf(Function)

            expect(gameToTest.__sendNextRound__).toBeDefined()
            expect(gameToTest.__sendNextRound__).toBeInstanceOf(Function)

            // expect(gameToTest.update).toBeDefined()
            // expect(gameToTest.update).toBeInstanceOf(Function)

            // expect(gameToTest.__results__).toBeDefined()
            // expect(gameToTest.__results__).toBeInstanceOf(Function)

            // expect(gameToTest.__checkWinner__).toBeDefined()
            // expect(gameToTest.__checkWinner__).toBeInstanceOf(Function)
        })

        it('Should fail on initializacing when the value of cards Fetched is true', async () => {

            try {

                gameToTest.cardsFetched = true

                await gameToTest.init()

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe('Cards already fetched')
            }
        })

    })

    describe('.startFunction', () => {
        let random9 = Math.floor(Math.random() * 9)
        let random8 = Math.floor(Math.random() * 8)
        let randomPlayer = `iRavel-${Math.floor(Math.random() * 89)}`

        it("Should success on sending the Initial Package on a single player game", async () => {
            gameToTest.mode = "solo"
            gameToTest.start = true

            const packageFromStart = await gameToTest.startFunction(UserId)

            expect(packageFromStart).toBeDefined()

            const { player, round, missionCards, turnCards, mapStatus, userPuntuation } = packageFromStart

            //Initial Package toop level elemnts
            expect(player).toBe(UserId)
            expect(round).toBe(1)
            expect(missionCards).toBeDefined

            expect(missionCards[0]).toBeInstanceOf(Object)
            expect(missionCards[0]._id).toBeDefined
            expect(missionCards[0]).toBeDefined
            expect(missionCards[0][2]).toBeDefined
            expect(typeof missionCards[0][1]).toBe("string")
            expect(typeof missionCards[0][2]).toBe("string")
            expect(missionCards[0][1].length).toBeGreaterThan(0)
            expect(missionCards[0][2].length).toBeGreaterThan(0)
            expect(missionCards[0].first).toBeDefined
            expect(missionCards[0].second).toBeDefined
            expect(missionCards[0].first).toBeGreaterThan(0)
            expect(missionCards[0].second).toBeGreaterThan(0)

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
            expect(mapStatus[4]).toBeInstanceOf(Array)
            expect(mapStatus[1].length).toBe(9)
            expect(mapStatus[2].length).toBe(9)
            expect(mapStatus[3].length).toBe(8)
            expect(mapStatus[4].length).toBe(8)
            expect(mapStatus[1][random9]).toBeInstanceOf(Array)
            expect(mapStatus[2][random9]).toBeInstanceOf(Array)
            expect(mapStatus[3][random8]).toBeInstanceOf(Array)
            expect(mapStatus[4][random8]).toBeInstanceOf(Array)
            expect(mapStatus[1][random9][0]).toBe(0)
            expect(mapStatus[2][random9][0]).toBe(0)
            expect(mapStatus[3][random8][0]).toBe(0)
            expect(mapStatus[4][random8][0]).toBe(0)
            expect(mapStatus[1][random9][1]).toBeFalsy()
            expect(mapStatus[2][random9][1]).toBeFalsy()
            expect(mapStatus[3][random8][1]).toBeFalsy()
            expect(mapStatus[4][random8][1]).toBeFalsy()

            expect(userPuntuation).toBeDefined

            const { player: playerPunt, missionCards: playerMission, OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount, } = userPuntuation
            const { OneEggNestLvL, TwoEggNestLvL, ThreeEggNestLvL, FourEggNestLvL, ToolsUsed, ToolsPuntuation, SecurityLvL, SecurityPunctuation, FishingRodUsed, StrikLvL, puntuationSchema } = userPuntuation

            //Inside User Puntuation
            expect(playerPunt).toBe(UserId)

            expect(playerMission).toBeInstanceOf(Array)

            expect(playerMission[0]).toBeInstanceOf(Object)
            expect(playerMission[0].cardId).toBeDefined()
            expect(playerMission[0].complted).toBeFalsy()
            expect(playerMission[0].points).toBe(0)

            expect(playerMission[1]).toBeInstanceOf(Object)
            expect(playerMission[1].cardId).toBeDefined()
            expect(playerMission[1].complted).toBeFalsy()
            expect(playerMission[1].points).toBe(0)

            expect(playerMission[2]).toBeInstanceOf(Object)
            expect(playerMission[2].cardId).toBeDefined()
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

            if (gameToTest.mode === "solo") expect(ToolsPuntuation).toBe(7)
            else expect(ToolsPuntuation).toBe(0)

            expect(SecurityLvL).toBeInstanceOf(Object)
            expect(SecurityLvL[1]).toBe(0)
            expect(SecurityLvL[2]).toBe(0)
            expect(SecurityLvL[3]).toBe(0)
            expect(SecurityLvL[4]).toBe(0)

            expect(SecurityPunctuation).toBe(0)
            expect(FishingRodUsed).toBe(0)
            expect(StrikLvL).toBe(0)


            //Inside punctuation Schema
            expect(puntuationSchema).toBeDefined()

            const { OneEggNestLvL: OneLvL, TwoEggNestLvL: TwoLvL, ThreeEggNestLvL: ThreeLvL, FourEggNestLvL: FourLvL, ToolsPuntuation: ToolsLvL, SecurityLvL: ScLvL, FishingRodUsed: FrLvL, StrikLvL: StLvL } = puntuationSchema

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

            expect(FrLvL).toBeInstanceOf(Array)
            expect(FrLvL[0]).toBe(0)
            expect(FrLvL[1]).toBe(3)
            expect(FrLvL[2]).toBe(6)
            expect(FrLvL[3]).toBe(9)
            expect(FrLvL[4]).toBe(12)
            expect(FrLvL[5]).toBe(15)
            expect(FrLvL[6]).toBe(18)
            expect(FrLvL[7]).toBe(21)

            expect(StLvL).toBeInstanceOf(Array)
            expect(StLvL[0]).toBe(0)
            expect(StLvL[1]).toBe(-1)
            expect(StLvL[2]).toBe(-3)

            //Checking changes in game instance
            expect(gameToTest.cardsFetched).toBeTruthy()
            expect(gameToTest.playersPackages.length).toBe(1)
            expect(gameToTest.playersPackages[0].player).toBe(UserId)
            expect(gameToTest.playersPackages[0].userRound).toBe(1)
            expect(gameToTest.playersPackages[0].mapStatus).toBeInstanceOf(Object)
            expect(gameToTest.playersPackages[0].userPuntuation).toBeInstanceOf(Object)

        })

        it("Should success on retriving a message on a multiplayer game where not everyone is ready but game is full", async () => {
            gameToTest.mode = "muliplayer"
            gameToTest.start = false
            gameToTest.maxPlayer = 2

            await gameToTest.addPlayer(randomPlayer)

            const message = await gameToTest.startFunction(UserId)

            debugger
            expect(message).toBeDefined()
            expect(message).toBe("Waiting for players to start")
            expect(gameToTest.cardsFetched).toBeFalsy
        })

        it("Should success on retriving a message on a multiplayer game where not everyone is ready but game is not full", async () => {
            gameToTest.mode = "muliplayer"
            gameToTest.start = false
            gameToTest.maxPlayer = 3

            await gameToTest.addPlayer(randomPlayer)

            const message = await gameToTest.startFunction(UserId)

            debugger
            expect(message).toBeDefined()
            expect(message).toBe("Waiting for players to join")
            expect(gameToTest.cardsFetched).toBeFalsy
        })

        it("Should success on ini() the game on a multiplayer game where everyone is ready", async () => {
            gameToTest.mode = "muliplayer"
            gameToTest.start = false
            gameToTest.maxPlayer = 2

            await gameToTest.addPlayer(randomPlayer)

            gameToTest.players[1].start = true

            const packageFromStart = await gameToTest.startFunction(UserId)

            expect(packageFromStart).toBeUndefined()
            expect(gameToTest.cardsFetched).toBeTruthy()
        })

        it("Should fail when game started on multiplayer ", async () => {
            gameToTest.mode = "muliplayer"
            gameToTest.start = true
            gameToTest.maxPlayer = 2

            try {
                await gameToTest.startFunction(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {

                expect(err).toBeDefined()
                expect(err.message).toBe("Game already Started")
                expect(gameToTest.cardsFetched).toBeTruthy
            }
        })

        it('Should fail on userId being not loged into the game', async () => {
            gameToTest.mode = "muliplayer"
            gameToTest.start = false
            gameToTest.maxPlayer = 2
            randomPlayer = "sdsfdsfsf"

            try {
                await gameToTest.startFunction(randomPlayer)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("User not present on this game")
            }
        })


        it('Should fail on userId being Undefined', async () => {
            randomPlayer = undefined

            try {
                await gameToTest.startFunction(randomPlayer)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `undefined`")
            }
        })

        it('Should fail on userId being null', async () => {
            randomPlayer = null

            try {
                await gameToTest.startFunction(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `null`")
            }
        })

        it('Should fail on userId being an object', async () => {
            randomPlayer = {}

            try {
                await gameToTest.startFunction(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `Object`")
            }
        })

        it('Should fail on userId being a number', async () => {
            randomPlayer = 33

            try {
                await gameToTest.startFunction(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `number`")
            }
        })

        it('Should fail on userId being and empty ""', async () => {
            randomPlayer = ""

            try {
                await gameToTest.startFunction(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("[NOT] Expected string `userId` to be empty, got ``")
            }
        })

        it('Should fail on userId being an array', async () => {
            randomPlayer = []

            try {
                await gameToTest.startFunction(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `Array`")
            }
        })
    })

    describe('.AddPlayer()', () => { //Method number 1 Done Happy && The case of throwing error
        let randomPlayer

        beforeEach(() => {
            randomPlayer = `iRavel-${Math.floor(Math.random() * 89)}`
        })

        it('Should success on adding a new player on a multiplayer session with space for it', async () => {

            //Game is random but the conditions to be Ok with this are not
            gameToTest.maxPlayer = 2
            gameToTest.mode = "multiplayer"

            const response = gameToTest.addPlayer(randomPlayer)

            expect(response).toBe(`You joined game Id = ${gameToTest.id}`)

            expect(gameToTest).toBeDefined

            const { mode: mode_, id, cardsFetched, creator, players, round, start, next, finish, missionCardsStatus, playersPackages, results, maxPlayer, missionCards, penguinCards } = gameToTest

            expect(mode_).toBe(mode)

            expect(id).toBe(GameId)

            expect(cardsFetched).toBeFalsy()

            expect(creator).toBe(UserId)

            expect(players).toBeInstanceOf(Array)
            expect(players).toHaveLength(2)
            expect(players[0]).toBeDefined()
            expect(players[0].id).toBe(UserId)
            expect(players[0].start).toBeFalsy()
            expect(players[0].nextRound).toBeFalsy()
            expect(players[0].winner).toBeFalsy()

            expect(players[1]).toBeDefined()
            expect(players[1].id).toBe(randomPlayer)
            expect(players[1].start).toBeFalsy()
            expect(players[1].nextRound).toBeFalsy()
            expect(players[1].winner).toBeFalsy()
            expect(players[2]).toBeUndefined()

            expect(round).toBe(0)

            if (mode === "solo") expect(start).toBeTruthy()
            else if (mode === "multiplayer") expect(start).toBeFalsy()

            expect(next).toBeFalsy()

            expect(finish).toBeFalsy()

            expect(missionCardsStatus).toBeDefined()
            expect(missionCardsStatus).toHaveLength(3)

            expect(playersPackages).toBeDefined()
            expect(playersPackages).toHaveLength(0)


            expect(results).toBeDefined()
            expect(results).toHaveLength(0)

            if (mode === "solo") expect(maxPlayer).toBe(1)
            else if (mode === "multiplayer") expect(maxPlayer).toBe(2)

            expect(missionCards).toBeDefined()
            expect(missionCards).toHaveLength(0)

            expect(penguinCards).toBeDefined()
            expect(penguinCards[1]).toBeDefined()
            expect(penguinCards[2]).toBeDefined()
            expect(penguinCards[3]).toBeDefined()
            expect(penguinCards[1]).toBeInstanceOf(Array)
            expect(penguinCards[2]).toBeInstanceOf(Array)
            expect(penguinCards[3]).toBeInstanceOf(Array)

            expect(gameToTest.init).toBeDefined()
            expect(gameToTest.init).toBeInstanceOf(Function)

            expect(gameToTest.addPlayer).toBeDefined()
            expect(gameToTest.addPlayer).toBeInstanceOf(Function)

            // expect(gameToTest.startFunction).toBeDefined()
            // expect(gameToTest.startFunction).toBeInstanceOf(Function)

            // expect(gameToTest.__sendInitialPackage__).toBeDefined()
            // expect(gameToTest.__sendInitialPackage__).toBeInstanceOf(Function)

            // expect(gameToTest.nextFunction).toBeDefined()
            // expect(gameToTest.nextFunction).toBeInstanceOf(Function)

            // expect(gameToTest.__sendNextRound__).toBeDefined()
            // expect(gameToTest.__sendNextRound__).toBeInstanceOf(Function)

            // expect(gameToTest.update).toBeDefined()
            // expect(gameToTest.update).toBeInstanceOf(Function)

            // expect(gameToTest.__results__).toBeDefined()
            // expect(gameToTest.__results__).toBeInstanceOf(Function)

            // expect(gameToTest.__checkWinner__).toBeDefined()
            // expect(gameToTest.__checkWinner__).toBeInstanceOf(Function)
        })

        it('Should fail on adding a new player on a multiplayer session without space for it', async () => {
            gameToTest.maxPlayer = 2
            gameToTest.mode = "multiplayer"

            gameToTest.addPlayer(`${randomPlayer}23`)

            try {
                gameToTest.addPlayer(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Game is full")
            }
        })

        it('Should fail on adding a repited player on a multiplayer session with space for it', async () => {
            gameToTest.maxPlayer = 3
            gameToTest.mode = "multiplayer"

            gameToTest.addPlayer(randomPlayer)

            try {
                gameToTest.addPlayer(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Player already joined")
            }
        })

        it('Should fail on userId being Undefined', async () => {
            randomPlayer = undefined

            try {
                gameToTest.addPlayer(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `undefined`")
            }
        })

        it('Should fail on userId being null', async () => {
            randomPlayer = null

            try {
                gameToTest.addPlayer(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `null`")
            }
        })

        it('Should fail on userId being an object', async () => {
            randomPlayer = {}

            try {
                gameToTest.addPlayer(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `Object`")
            }
        })

        it('Should fail on userId being a number', async () => {
            randomPlayer = 33

            try {
                gameToTest.addPlayer(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `number`")
            }
        })

        it('Should fail on userId being and empty ""', async () => {
            randomPlayer = ""

            try {
                gameToTest.addPlayer(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("[NOT] Expected string `userId` to be empty, got ``")
            }
        })

        it('Should fail on userId being an array', async () => {
            randomPlayer = []

            try {
                gameToTest.addPlayer(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected `userId` to be of type `string` but received type `Array`")
            }
        })

    })

    describe('.__sendInitialPackage__', () => {
        let random9 = Math.floor(Math.random() * 9)
        let random8 = Math.floor(Math.random() * 8)

        it("Should success on returning the initial package for solo player", async () => {
            gameToTest.mode = "solo"

            await gameToTest.init() // Game has to be initialized

            const iniPackage = await gameToTest.__sendInitialPackage__(UserId)

            const { player, round, missionCards, turnCards, mapStatus, userPuntuation } = iniPackage

            expect(iniPackage).toBeDefined()

            //Initial Package toop level elemnts
            expect(player).toBe(UserId)
            expect(round).toBe(1)
            expect(missionCards).toBeDefined

            expect(missionCards[0]).toBeInstanceOf(Object)
            expect(missionCards[0]._id).toBeDefined
            expect(missionCards[0]).toBeDefined
            expect(missionCards[0][2]).toBeDefined
            expect(typeof missionCards[0][1]).toBe("string")
            expect(typeof missionCards[0][2]).toBe("string")
            expect(missionCards[0][1].length).toBeGreaterThan(0)
            expect(missionCards[0][2].length).toBeGreaterThan(0)
            expect(missionCards[0].first).toBeDefined
            expect(missionCards[0].second).toBeDefined
            expect(missionCards[0].first).toBeGreaterThan(0)
            expect(missionCards[0].second).toBeGreaterThan(0)

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
            expect(mapStatus[4]).toBeInstanceOf(Array)
            expect(mapStatus[1].length).toBe(9)
            expect(mapStatus[2].length).toBe(9)
            expect(mapStatus[3].length).toBe(8)
            expect(mapStatus[4].length).toBe(8)
            expect(mapStatus[1][random9]).toBeInstanceOf(Array)
            expect(mapStatus[2][random9]).toBeInstanceOf(Array)
            expect(mapStatus[3][random8]).toBeInstanceOf(Array)
            expect(mapStatus[4][random8]).toBeInstanceOf(Array)
            expect(mapStatus[1][random9][0]).toBe(0)
            expect(mapStatus[2][random9][0]).toBe(0)
            expect(mapStatus[3][random8][0]).toBe(0)
            expect(mapStatus[4][random8][0]).toBe(0)
            expect(mapStatus[1][random9][1]).toBeFalsy()
            expect(mapStatus[2][random9][1]).toBeFalsy()
            expect(mapStatus[3][random8][1]).toBeFalsy()
            expect(mapStatus[4][random8][1]).toBeFalsy()

            expect(userPuntuation).toBeDefined

            const { player: playerPunt, missionCards: playerMission, OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount, } = userPuntuation
            const { OneEggNestLvL, TwoEggNestLvL, ThreeEggNestLvL, FourEggNestLvL, ToolsUsed, ToolsPuntuation, SecurityLvL, SecurityPunctuation, FishingRodUsed, StrikLvL, puntuationSchema } = userPuntuation

            //Inside User Puntuation
            expect(playerPunt).toBe(UserId)

            expect(playerMission).toBeInstanceOf(Array)

            expect(playerMission[0]).toBeInstanceOf(Object)
            expect(playerMission[0].cardId).toBeDefined()
            expect(playerMission[0].complted).toBeFalsy()
            expect(playerMission[0].points).toBe(0)

            expect(playerMission[1]).toBeInstanceOf(Object)
            expect(playerMission[1].cardId).toBeDefined()
            expect(playerMission[1].complted).toBeFalsy()
            expect(playerMission[1].points).toBe(0)

            expect(playerMission[2]).toBeInstanceOf(Object)
            expect(playerMission[2].cardId).toBeDefined()
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

            if (gameToTest.mode === "solo") expect(ToolsPuntuation).toBe(7)
            else expect(ToolsPuntuation).toBe(0)

            expect(SecurityLvL).toBeInstanceOf(Object)
            expect(SecurityLvL[1]).toBe(0)
            expect(SecurityLvL[2]).toBe(0)
            expect(SecurityLvL[3]).toBe(0)
            expect(SecurityLvL[4]).toBe(0)

            expect(SecurityPunctuation).toBe(0)
            expect(FishingRodUsed).toBe(0)
            expect(StrikLvL).toBe(0)


            //Inside punctuation Schema
            expect(puntuationSchema).toBeDefined()

            const { OneEggNestLvL: OneLvL, TwoEggNestLvL: TwoLvL, ThreeEggNestLvL: ThreeLvL, FourEggNestLvL: FourLvL, ToolsPuntuation: ToolsLvL, SecurityLvL: ScLvL, FishingRodUsed: FrLvL, StrikLvL: StLvL } = puntuationSchema

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

            expect(FrLvL).toBeInstanceOf(Array)
            expect(FrLvL[0]).toBe(0)
            expect(FrLvL[1]).toBe(3)
            expect(FrLvL[2]).toBe(6)
            expect(FrLvL[3]).toBe(9)
            expect(FrLvL[4]).toBe(12)
            expect(FrLvL[5]).toBe(15)
            expect(FrLvL[6]).toBe(18)
            expect(FrLvL[7]).toBe(21)

            expect(StLvL).toBeInstanceOf(Array)
            expect(StLvL[0]).toBe(0)
            expect(StLvL[1]).toBe(-1)
            expect(StLvL[2]).toBe(-3)

            //Checking changes in game instance
            expect(gameToTest.playersPackages.length).toBe(1)
            expect(gameToTest.playersPackages[0].player).toBe(UserId)
            expect(gameToTest.playersPackages[0].userRound).toBe(1)
            expect(gameToTest.playersPackages[0].mapStatus).toBeInstanceOf(Object)
            expect(gameToTest.playersPackages[0].userPuntuation).toBeInstanceOf(Object)

        })

        it("Should success on returning the initial package for multiplayer", async () => {
            gameToTest.mode = "multiplayer"

            await gameToTest.init() // Game has to be initialized

            const iniPackage = await gameToTest.__sendInitialPackage__(UserId)

            const { player, round, missionCards, turnCards, mapStatus, userPuntuation } = iniPackage

            expect(iniPackage).toBeDefined()

            //Initial Package toop level elemnts
            expect(player).toBe(UserId)
            expect(round).toBe(1)
            expect(missionCards).toBeDefined

            expect(missionCards[0]).toBeInstanceOf(Object)
            expect(missionCards[0]._id).toBeDefined
            expect(missionCards[0]).toBeDefined
            expect(missionCards[0][2]).toBeDefined
            expect(typeof missionCards[0][1]).toBe("string")
            expect(typeof missionCards[0][2]).toBe("string")
            expect(missionCards[0][1].length).toBeGreaterThan(0)
            expect(missionCards[0][2].length).toBeGreaterThan(0)
            expect(missionCards[0].first).toBeDefined
            expect(missionCards[0].second).toBeDefined
            expect(missionCards[0].first).toBeGreaterThan(0)
            expect(missionCards[0].second).toBeGreaterThan(0)

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
            expect(mapStatus[4]).toBeInstanceOf(Array)
            expect(mapStatus[1].length).toBe(9)
            expect(mapStatus[2].length).toBe(9)
            expect(mapStatus[3].length).toBe(8)
            expect(mapStatus[4].length).toBe(8)
            expect(mapStatus[1][random9]).toBeInstanceOf(Array)
            expect(mapStatus[2][random9]).toBeInstanceOf(Array)
            expect(mapStatus[3][random8]).toBeInstanceOf(Array)
            expect(mapStatus[4][random8]).toBeInstanceOf(Array)
            expect(mapStatus[1][random9][0]).toBe(0)
            expect(mapStatus[2][random9][0]).toBe(0)
            expect(mapStatus[3][random8][0]).toBe(0)
            expect(mapStatus[4][random8][0]).toBe(0)
            expect(mapStatus[1][random9][1]).toBeFalsy()
            expect(mapStatus[2][random9][1]).toBeFalsy()
            expect(mapStatus[3][random8][1]).toBeFalsy()
            expect(mapStatus[4][random8][1]).toBeFalsy()

            expect(userPuntuation).toBeDefined

            const { player: playerPunt, missionCards: playerMission, OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount, } = userPuntuation
            const { OneEggNestLvL, TwoEggNestLvL, ThreeEggNestLvL, FourEggNestLvL, ToolsUsed, ToolsPuntuation, SecurityLvL, SecurityPunctuation, FishingRodUsed, StrikLvL, puntuationSchema } = userPuntuation

            //Inside User Puntuation
            expect(playerPunt).toBe(UserId)

            expect(playerMission).toBeInstanceOf(Array)

            expect(playerMission[0]).toBeInstanceOf(Object)
            expect(playerMission[0].cardId).toBeDefined()
            expect(playerMission[0].complted).toBeFalsy()
            expect(playerMission[0].points).toBe(0)

            expect(playerMission[1]).toBeInstanceOf(Object)
            expect(playerMission[1].cardId).toBeDefined()
            expect(playerMission[1].complted).toBeFalsy()
            expect(playerMission[1].points).toBe(0)

            expect(playerMission[2]).toBeInstanceOf(Object)
            expect(playerMission[2].cardId).toBeDefined()
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

            if (gameToTest.mode === "solo") expect(ToolsPuntuation).toBe(7)
            else expect(ToolsPuntuation).toBe(0)

            expect(SecurityLvL).toBeInstanceOf(Object)
            expect(SecurityLvL[1]).toBe(0)
            expect(SecurityLvL[2]).toBe(0)
            expect(SecurityLvL[3]).toBe(0)
            expect(SecurityLvL[4]).toBe(0)

            expect(SecurityPunctuation).toBe(0)
            expect(FishingRodUsed).toBe(0)
            expect(StrikLvL).toBe(0)


            //Inside punctuation Schema
            expect(puntuationSchema).toBeDefined()

            const { OneEggNestLvL: OneLvL, TwoEggNestLvL: TwoLvL, ThreeEggNestLvL: ThreeLvL, FourEggNestLvL: FourLvL, ToolsPuntuation: ToolsLvL, SecurityLvL: ScLvL, FishingRodUsed: FrLvL, StrikLvL: StLvL } = puntuationSchema

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

            expect(FrLvL).toBeInstanceOf(Array)
            expect(FrLvL[0]).toBe(0)
            expect(FrLvL[1]).toBe(3)
            expect(FrLvL[2]).toBe(6)
            expect(FrLvL[3]).toBe(9)
            expect(FrLvL[4]).toBe(12)
            expect(FrLvL[5]).toBe(15)
            expect(FrLvL[6]).toBe(18)
            expect(FrLvL[7]).toBe(21)

            expect(StLvL).toBeInstanceOf(Array)
            expect(StLvL[0]).toBe(0)
            expect(StLvL[1]).toBe(-1)
            expect(StLvL[2]).toBe(-3)

            //Checking changes in game instance
            expect(gameToTest.playersPackages.length).toBe(1)
            expect(gameToTest.playersPackages[0].player).toBe(UserId)
            expect(gameToTest.playersPackages[0].userRound).toBe(1)
            expect(gameToTest.playersPackages[0].mapStatus).toBeInstanceOf(Object)
            expect(gameToTest.playersPackages[0].userPuntuation).toBeInstanceOf(Object)
        })

        it("Should fail on not .Init() game", async () => {
            try {
                await gameToTest.__sendInitialPackage__(UserId)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe('Game is not initialized')
            }
        })

        it('Should fail on userId being Undefined', async () => {
            randomPlayer = undefined

            try {
                await gameToTest.init() // Game has to be initialized

                await gameToTest.__sendInitialPackage__(randomPlayer)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `undefined`")
            }
        })

        it('Should fail on userId being null', async () => {
            randomPlayer = null

            try {
                await gameToTest.init() // Game has to be initialized

                await gameToTest.__sendInitialPackage__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `null`")
            }
        })

        it('Should fail on userId being an object', async () => {
            randomPlayer = {}

            try {
                await gameToTest.init() // Game has to be initialized

                await gameToTest.__sendInitialPackage__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `Object`")
            }
        })

        it('Should fail on userId being a number', async () => {
            randomPlayer = 33

            try {
                await gameToTest.init() // Game has to be initialized

                await gameToTest.__sendInitialPackage__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `number`")
            }
        })

        it('Should fail on userId being and empty ""', async () => {
            randomPlayer = ""

            try {
                await gameToTest.init() // Game has to be initialized

                await gameToTest.__sendInitialPackage__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("[NOT] Expected string to be empty, got ``")
            }
        })

        it('Should fail on userId being an array', async () => {
            randomPlayer = []

            try {
                await gameToTest.init() // Game has to be initialized

                await gameToTest.__sendInitialPackage__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `Array`")
            }
        })

    })

    fdescribe('.nextFunction', () => {

        it("Should work on changing the userPunctuation on the action LOVE and the nextRound to a solo game", async () => {
            gameToTest.start = true
            gameToTest.mode = "solo"

            const initialPackage = await gameToTest.startFunction(UserId)

            expect(initialPackage).toBeDefined()

            const nextPackage = await gameToTest.nextFunction(UserId, {

                resource: {
                    type: "love",
                    row: 1, 
                    column: 2,
                    nest: ""
                },
                map: {
                    status: true,
                    position: {
                        row: 2,
                        column: 3
                    }
                },
                missions: [false, false, true]

            })

            //Cheking the package
            expect(nextPackage).toBeDefined()

            const { round: _round, turnCards, missionStatus } = nextPackage

            expect(_round).toBe(2)

            expect(turnCards).toBeDefined()

            //Be
            expect(turnCards[0]).toBe(gameToTest.penguinCards[1][_round])
            expect(turnCards[1]).toBe(gameToTest.penguinCards[2][_round])
            expect(turnCards[2]).toBe(gameToTest.penguinCards[3][_round])
            //Not be
            expect(turnCards[0]).not.toBe(gameToTest.penguinCards[1][_round + 1])
            expect(turnCards[1]).not.toBe(gameToTest.penguinCards[2][_round + 1])
            expect(turnCards[2]).not.toBe(gameToTest.penguinCards[3][_round + 1])

            expect(missionStatus).toBeDefined()

            expect(missionStatus[0]).toBe(gameToTest.missionCardsStatus[0])
            expect(missionStatus[1]).toBe(gameToTest.missionCardsStatus[1])
            expect(missionStatus[2]).toBe(gameToTest.missionCardsStatus[2])

            //Check the changes in the instance of game
            expect(gameToTest.players[0].nextRound).toBeFalsy()
            expect(gameToTest.playersPackages[0].mapStatus[1][2][0]).toBe(1)
            expect(gameToTest.playersPackages[0].mapStatus[2][3][0]).toBe(1)

            expect(gameToTest.missionCardsStatus[2]).toBeTruthy()
            expect(gameToTest.playersPackages[0].userPuntuation.missionCards[2].completed).toBeTruthy()
            expect(gameToTest.playersPackages[0].userPuntuation.missionCards[2].points).toBe(gameToTest.missionCards[2].first)

            expect(gameToTest.round).toBe(1)
            expect(gameToTest.next).toBeFalsy()
        })


    })

    describe('__sendNextRound__', () => {

        it("Should success on sending the next package", async () => {

            await gameToTest.init()

            await gameToTest.__sendInitialPackage__(UserId)

            const userPackage = gameToTest.__sendNextRound__(UserId)

            expect(userPackage).toBeDefined

            const { round: _round, turnCards, missionStatus } = userPackage

            expect(_round).toBe(2)

            expect(turnCards).toBeDefined()

            //Be
            expect(turnCards[0]).toBe(gameToTest.penguinCards[1][_round])
            expect(turnCards[1]).toBe(gameToTest.penguinCards[2][_round])
            expect(turnCards[2]).toBe(gameToTest.penguinCards[3][_round])
            //Not be
            expect(turnCards[0]).not.toBe(gameToTest.penguinCards[1][_round + 1])
            expect(turnCards[1]).not.toBe(gameToTest.penguinCards[2][_round + 1])
            expect(turnCards[2]).not.toBe(gameToTest.penguinCards[3][_round + 1])

            expect(missionStatus).toBeDefined()

            expect(missionStatus[0]).toBe(gameToTest.missionCardsStatus[0])
            expect(missionStatus[1]).toBe(gameToTest.missionCardsStatus[1])
            expect(missionStatus[2]).toBe(gameToTest.missionCardsStatus[2])

            //Check the changes in the instance of game
            expect(gameToTest.players[0].nextRound).toBeFalsy()
        })

        it("Should fail on not .Init() game", () => {
            try {
                gameToTest.__sendNextRound__(UserId)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe('Game is not initialized')
            }
        })

        it('Should fail on userId being not loged into the game', async () => {
            randomPlayer = "sdsfdsfsf"

            try {
                await gameToTest.init()

                await gameToTest.__sendInitialPackage__(UserId)

                gameToTest.__sendNextRound__(randomPlayer)

                throw Error("Should not reach this point")

            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("User not present on this game")
            }
        })

        it('Should fail on userId being Undefined', async () => {
            randomPlayer = undefined

            try {
                await gameToTest.init()

                await gameToTest.__sendInitialPackage__(UserId)

                gameToTest.__sendNextRound__(randomPlayer)

                throw Error("Should not reach this point")

            } catch (err) {

                debugger
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `undefined`")
            }
        })

        it('Should fail on userId being null', async () => {
            randomPlayer = null

            try {
                await gameToTest.init()

                await gameToTest.__sendInitialPackage__(UserId)

                gameToTest.__sendNextRound__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `null`")
            }
        })

        it('Should fail on userId being an object', async () => {
            randomPlayer = {}

            try {
                await gameToTest.init()

                await gameToTest.__sendInitialPackage__(UserId)

                gameToTest.__sendNextRound__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `Object`")
            }
        })

        it('Should fail on userId being a number', async () => {
            randomPlayer = 33

            try {
                await gameToTest.init()

                await gameToTest.__sendInitialPackage__(UserId)

                gameToTest.__sendNextRound__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("Expected argument to be of type `string` but received type `number`")
            }
        })

        it('Should fail on userId being and empty ""', async () => {
            randomPlayer = ""

            try {
                await gameToTest.init()

                await gameToTest.__sendInitialPackage__(UserId)

                gameToTest.__sendNextRound__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined
                expect(err.message).toBe("[NOT] Expected string to be empty, got ``")
            }
        })

        it('Should fail on userId being an array', async () => {
            randomPlayer = []

            try {
                await gameToTest.init()

                await gameToTest.__sendInitialPackage__(UserId)

                gameToTest.__sendNextRound__(randomPlayer)

                throw Error("Should not reach this point")
            } catch (err) {
                expect(err).toBeDefined

                expect(err.message).toBe("Expected argument to be of type `string` but received type `Array`")
            }
        })

    })

    // fdescribe('.__checkWinner__', () => {
    //     it('Should success on call the method __results__ for a single player mode', () => {

    //         try{
    //             gameToTest.mode = "solo";

    //             (async () => await gameToTest.init() )(); // to have an user Package
    //             (async () => await gameToTest.__checkWinner__())()


    //         }catch(err){
    //             expect(err).toBeDefined
    //             debugger
    //         }
    //     })
    // })

    afterAll(async () => {
        await mongoose.disconnect()
    })
})