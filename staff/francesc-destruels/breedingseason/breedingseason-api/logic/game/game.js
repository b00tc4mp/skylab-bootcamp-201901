const { models: { MissionDeck, GameDeck, Result, GameRecord, User }, mongoose: { Types: { ObjectId } } } = require("breedingseason-data")
const ow = require('ow')

//Arrays where the game instances will be saved

const alivePublicGames = []
const alivePrivateGames = []


/**
 * This is a contructor function to create instance of the game
 * 
 * @param {String} creatorId That will have the control over the instance on multiplayer games 
 * @param {String} gameId Id for the game instance
 * @param {Object} style  with the information required to start the game: mode == Solo or Multiplayer, playersNumber: the number of allowed participants.
 * 
 *  @returns {Object} intance of the game
 */

function Game(creatorId, gameId, style) {
    ow(creatorId, ow.string.not.empty)
    ow(gameId, ow.string.not.empty)
    ow(style, ow.object.exactShape({
        mode: ow.string.not.empty,
        playersNumber: ow.number.is(x => Number.isInteger(x) && x > 0)
    }))

    const { mode, playersNumber } = style

    this.mode = mode
    this.id = gameId
    this.cardsFetched = false
    this.creator = creatorId
    this.players = [{ id: creatorId, start: false, nextRound: false, winner: false }]
    this.round = 0
    this.start = mode === "solo" ? true : false
    this.next = false
    this.finish = false
    this.missionCardsStatus = [false, false, false]
    this.playersPackages = [] //for Each player = { player, userRound, mapStatus, userPuntuation }
    this.results = []
    this.maxPlayer = playersNumber
    this.missionCards = []; // [{ objectives: "", completed: false, firstPoint: X, otherPoints: Y  }] * 3
    this.penguinCards = { 1: [], 2: [], 3: [] }
}

/**
 * Private function that initialize the game fetching the missionCards and the gameDeck from the database
 * 
 * @returns {string} message "Cards Fetched"
 */

Game.prototype.init = async function () { //Tested but I need to do the Penguin Cards

    if (this.cardsFetched) throw Error('Cards already fetched')

    //                                                            //
    //The mission Cards that will be send with the initial package//
    // async function bringMissionCards                           //

    this.missionCards = []

    for (let i = 0; i < 3; i++) {

        const random = Math.floor(Math.random() * 13)

        const card = await MissionDeck.findOne().skip(random).select('1 3 first -_id').lean()

        this.missionCards.push(card)
    }

    //                                                            //
    // The penguin Cards that will be send witheach round         //
    //  async function bringPenguinCards                          //

    let cards = await GameDeck.find({}).select('A B -_id').lean()

    cards.sort(() => Math.random() - 0.5)

    let j = 1

    for (let i = 0; i < cards.length;) {

        if (this.penguinCards[j].length !== 37) {
            this.penguinCards[j].push(cards[i])
            i++
        } else j = j + 1
    }

    this.cardsFetched = true

    return "Cards Fetched"
}

/**
 * This method will add players on a game with is maxPlayers is not full
 * 
 * @param {String} playerId Id from the player who wants to join
 * 
 * @returns {String} returs the game id to make the new player be able to use the instance of it
 */

Game.prototype.addPlayer = function (playerId) { //Done and Tested
    ow(playerId, ow.string.not.empty)

    const repeated = this.players.find(x => x.id === playerId)
    if (this.players.length === this.maxPlayer) throw new Error('Game is full')

    if (!repeated) this.players.push({ id: playerId, start: false, nextRound: false, winner: false })
    else throw Error("Player already joined")

    return this.id
}

/**
 * This method starts the game when all player are ok with it
 * 
 * @param {String} playerId Id`
 * 
 * @returns For One player function __sendInitialPackage, for Multiplayer depens if everybody is ready
 * 
 */

Game.prototype.startFunction = async function (userId) { //Checked for 1 player
    ow(userId, ow.string.not.empty)

    if (this.start && this.mode === "solo" && this.cardsFetched === false) {
        await this.init()
        return this.__sendInitialPackage__(userId)
    }

    if (!this.start) {
        //Search for the user and change it start state to true

        const userToUdate = this.players.find(x => x.id === userId)

        if (!userToUdate) throw Error("User not present on this game")

        userToUdate.start = true
        //Check if there is anybody waiting to start and is there is nobody then change the start value of the game to true
        if (this.players.length === this.maxPlayer) {
            const timeToStart = this.players.some(x => x.start === false)

            if (!timeToStart) {
                this.start = true
                return this.init()

            } else {
                return "Waiting for players to start"
            }

        } else {
            return "Waiting for players to join"
        }

    } else throw Error("Game already Started")
}

/**
 * This function will be call once everybody is start === true
 * 
 * @param {String} playerId `
 * 
 * @returns {Object} initial package with all the games needs to start on the server side 
 */

Game.prototype.__sendInitialPackage__ = async function (userId) {
    ow(userId, ow.string.not.empty)

    if (!this.cardsFetched) throw Error('Game is not initialized')

    const puntuationSchema = await Result.findById("5cef8d48c2f6140244144ae7").lean()

    let initialPackage = {
        player: userId,
        round: 1,
        missionCards: this.missionCards,
        turnCards: {
            1: this.penguinCards[1][this.round],
            2: this.penguinCards[2][this.round],
            3: this.penguinCards[3][this.round]
        },
        mapStatus: {
            1: [[0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false]],
            2: [[0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false]],
            3: [[0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false], [0, 0, false]],
        },
        userPuntuation: {
            player: userId,
            missionCards: [
                { cardId: this.missionCards[0]._id, completed: false, points: 0 },
                { cardId: this.missionCards[1]._id, completed: false, points: 0 },
                { cardId: this.missionCards[2]._id, completed: false, points: 0 }],
            OneEggNestAmount: 0,
            OneEggNestLvL: 0,
            TwoEggNestAmount: 0,
            TwoEggNestLvL: 0,
            ThreeEggNestAmount: 0,
            ThreeEggNestLvL: 0,
            FourEggNestAmount: 0,
            FourEggNestLvL: 0,
            ToolsUsed: 0,
            ToolsPuntuation: this.mode === "solo" ? 7 : 0,
            SecurityLvL: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
            },
            SecurityPuntuation: 0,
            StrikeLvL: 0,
            puntuationSchema: puntuationSchema
        }
    }

    const { player, round: userRound, mapStatus, userPuntuation } = initialPackage

    if (!this.playersPackages.some(x => x.player === userId)) this.playersPackages.push({ player, userRound, mapStatus, userPuntuation })
    else throw Error("User already initializated")

    return initialPackage
}

/**
 * This method will actualice the user puntuation and sends the next round when all player are ok whit it
 * 
 * @param {String} playerId `
 * @param {Object} with the actions of the turn
 * @param {Object} with data from the game map
 * 
 * @returns for ONE player the function __sendNextRound__ if not finished and for multiplayer depends on the state of the group
 * 
 */

Game.prototype.nextFunction = async function (userId, gameAction, updatedAmount) {
    ow(userId, ow.string.not.empty)
    ow(gameAction, ow.object.exactShape({
        missions: ow.array.not.empty,
        resource: ow.object.exactShape({
            type: ow.string,
            row: ow.number.not.empty,
            column: ow.number.not.empty,
            nest: ow.string
        }),
        map: ow.object.exactShape({
            status: ow.boolean.not.empty,
            position: ow.object.exactShape({
                row: ow.number.not.empty,
                column: ow.number.not.empty
            })
        }),
    }))
    ow(updatedAmount, ow.object)


    //{ player, userRound, mapStatus, userPuntuation }

    const { resource, map: { status, position }, missions } = gameAction

    const player = this.playersPackages.find(x => x.player === userId)

    if (!player) throw Error("User not loged in this game")
    let { userPuntuation, mapStatus } = player

    const { OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount } = updatedAmount // I have to test this
    
    userPuntuation.OneEggNestAmount = OneEggNestAmount ? OneEggNestAmount : 0
    userPuntuation.TwoEggNestAmount = TwoEggNestAmount ? TwoEggNestAmount : 0
    userPuntuation.ThreeEggNestAmount = ThreeEggNestAmount ? ThreeEggNestAmount : 0
    userPuntuation.FourEggNestAmount = FourEggNestAmount ? FourEggNestAmount : 0

    let missionStatus = [false, false, false]

    // To check strikes
    if (!status) {
        userPuntuation.StrikeLvL += 1
        //To check if the user got already the third strike
        if (userPuntuation.StrikeLvL >= 3) this.finish = true
        else { }

    } else {
        mapStatus[position.row][position.column][0] += 1

        // To check if the player is done matching the penguins
        let full = 0

        for (let i = 1; i <= 3; i++) {
            const checked = mapStatus[i].some(x => x[0] === 0)

            if (!checked) full++

            if (i === 3 && full === 3) this.finish = true

        }

        // To check if the player is done doing the missions
        let completedMissions = 0

        for (let i = 0; i <= 3; i++) {
            if (missions[i]) {
                completedMissions++

                userPuntuation.missionCards[i].completed = true

                if (userPuntuation.missionCards[i].points === 0) {

                    if (!this.missionCardsStatus[i]) {
                        missionStatus[i] = true
                        userPuntuation.missionCards[i].points = this.missionCards[i].first

                    } else userPuntuation.missionCards[i].points = this.missionCards[i].second
                } else continue
            } else continue
        }

        if (completedMissions === 3) this.finish = true
    }

    switch (resource.type) { // resource = {type: string, row: number, column: number, nest: string}
        case "love":
            mapStatus[resource.row][resource.column][0] = + 1 //TAKE CARE MAYBE IT CONCADENATES!
            break
        case "tool":
            userPuntuation.ToolsUsed += 1
            break
        case "security":
            userPuntuation.SecurityLvL[resource.row] += 1
            break
        case "upgrade":
            //it should change the level of a picked nest type (not over its limit)
            if (resource.nest === "One" || resource.nest === "Two" || resource.nest === "Three" || resource.nest === "Four") userPuntuation[`${resource.nest}EggNestLvL`] += 1
            else throw Error("That is not a valid nest value")
            break
        case "strike":
            break
        default:
            // throw Error("Resource not defined properly")
            break //(not used)
    }
    const userToUdate = this.players.find(x => x.id === userId)

    userToUdate.nextRound = true

    const timeToContinue = this.players.some(x => x.nextRound === false)

    if (!timeToContinue && this.finish === true) return this.__checkWinner__(userId)
    else if (!timeToContinue) {
        for (i = 0; i < 3; i++) { if (this.missionCardsStatus[i] === false && missionStatus[i] === true) this.missionCardsStatus[i] = true }

        this.next = true
        this.round++

        if (this.mode === "solo") return this.__sendNextRound__(userId)
        else return

    } else return
}

/**
 * This function will send next round of cards
 * 
 * @param {String} playerId `
 * 
 * @returns {Object} Sends the next round of cards
 * 
 */

Game.prototype.__sendNextRound__ = function (userId) {
    ow(userId, ow.string.not.empty)

    if (!this.cardsFetched) throw Error('Game is not initialized')

    this.players.forEach(x => x.nextRound = false)

    const userPackage = this.playersPackages.find(x => {
        if (x.player === userId) return x
    })

    if (!userPackage) throw Error("User not present on this game")

    userPackage.userRound++

    let turnCards = [undefined, undefined, undefined]
    for (p in this.penguinCards) turnCards[p - 1] = this.penguinCards[p][userPackage.userRound]

    this.next = false

    return { turnCards, round: userPackage.userRound, missionStatus: this.missionCardsStatus }
}

/**
 * This function looks for status updates 
 * 
 * @param {String} playerId `
 * 
 * @returns for Multiplayer Only depending on the state the next action to do
 * 
 */


Game.prototype.update = async function (userId) {

    if (!this.players.some(x => x.id === userId)) throw Error("Player not logged on this game")
    else if (!this.start) return
    else if (this.finish) return this.__results__(userId)
    else if (this.round === 0) return this.__sendInitialPackage__(userId)
    else if (this.next) return this.__sendNextRound__(userId)
    else return
}

/**
 * This function send the player the results
 * 
 * @param {String} playerId `
 * 
 * @returns {Object} Sends the results of all players
 * 
 */

Game.prototype.__results__ = async function (userId) {

    let results = this.playersPackages.sort((a, b) => {
        let comparison

        if (a.puntuation > b.puntuation) comparison = -1
        else if (a.puntuation < b.puntuation) comparison = 1
        else comparison = 0

        return comparison
    })

    let user = this.playersPackages.find(x => x.player === userId)

    user.winner = false

    for (let i = 0; i < results.length; i++) {
        if (results[i].puntuation === results[0].puntuation && results[i].player === userId) user.winner = true
        else continue
    }

    return results

    // I will have to save the results to the user object in memory
}

/** 
 * It check the results and save them to the users package
 * 
 * @returns {Object} On SOLO sends back the user package 
 * 
 */                                           

Game.prototype.__checkWinner__ = async function () {
    if (!this.finish) throw Error("Game did not finish")

    const puntuationSchema = await Result.findById("5cef8d48c2f6140244144ae7").lean()

    let toolsFirst = []
    let toolsSecond = []
    let toolsThird = []

    let firstPoints = 0
    let secondPoints = 0
    let thirdPoints = 0

    for (i = 0; i < this.playersPackages.length; i++) {

        const { userPuntuation: k } = this.playersPackages[i]

        this.playersPackages[i].puntuation =
            (puntuationSchema.OneEggNestLvL[k.OneEggNestLvL] * k.OneEggNestAmount) +
            (puntuationSchema.TwoEggNestLvL[k.TwoEggNestLvL] * k.TwoEggNestAmount) +
            (puntuationSchema.ThreeEggNestLvL[k.ThreeEggNestLvL] * k.ThreeEggNestAmount) +
            (puntuationSchema.FourEggNestLvL[k.FourEggNestLvL] * k.FourEggNestAmount) +
            (puntuationSchema.SecurityLvL[1][k.SecurityLvL[1]]) +
            (puntuationSchema.SecurityLvL[2][k.SecurityLvL[2]]) +
            (puntuationSchema.SecurityLvL[3][k.SecurityLvL[3]]) +
            (puntuationSchema.SecurityLvL[4][k.SecurityLvL[4]]) +
            (k.missionCards[0].points) +
            (k.missionCards[1].points) +
            (k.missionCards[2].points) +
            (puntuationSchema.StrikeLvL[k.StrikeLvL])

        if (k.ToolsUsed > firstPoints) {
            toolsThird = toolsSecond
            thirdPoints = secondPoints
            toolsSecond = toolsFirst
            secondPoints = firstPoints
            toolsFirst = []
            firstPoints = k.ToolsUsed
            toolsFirst.push(this.playersPackages[i])

        } else if (k.ToolsUsed === firstPoints) {
            toolsFirst.push(this.playersPackages[i])

        } else if (k.ToolsUsed > secondPoints) {
            toolsThird = toolsSecond
            thirdPoints = secondPoints
            toolsSecond = []
            secondPoints = k.ToolsUsed
            toolsSecond.push(this.playersPackages[i])

        } else if (k.ToolsUsed === secondPoints) {
            toolsSecond.push(this.playersPackages[i])

        } else if (k.ToolsUsed > thirdPoints) {
            toolsThird = []
            thirdPoints = k.ToolsUsed
            toolsThird.push(this.playersPackages[i])

        } else if (k.ToolsUsed === thirdPoints) {
            toolsThird.push(this.playersPackages[i])
        } else {
            continue
        }
    }

    toolsFirst.forEach(P => P.puntuation += puntuationSchema.ToolsPuntuation[3])
    toolsSecond.forEach(S => S.puntuation += puntuationSchema.ToolsPuntuation[2])
    toolsThird.forEach(T => T.puntuation += puntuationSchema.ToolsPuntuation[1])

    if (this.mode === "solo") {
        this.playersPackages[0].winner = true

        const { missionCards,
            OneEggNestAmount,
            OneEggNestLvL,
            TwoEggNestAmount,
            TwoEggNestLvL,
            ThreeEggNestAmount,
            ThreeEggNestLvL,
            FourEggNestAmount,
            FourEggNestLvL,
            ToolsUsed,
            ToolsPuntuation,
            SecurityLvL,
            SecurityPuntuation,
            StrikeLvL, } = this.playersPackages[0].userPuntuation

        const retrievedUserGame = await User.findById(this.creator)

        const newHistory = new GameRecord({ gameId: this.id, players: [this.creator] })

        await newHistory.save()

        newResults = new Result({
            player: this.creator,
            missionCards,
            OneEggNestAmount,
            OneEggNestLvL,
            TwoEggNestAmount,
            TwoEggNestLvL,
            ThreeEggNestAmount,
            ThreeEggNestLvL,
            FourEggNestAmount,
            FourEggNestLvL,
            ToolsUsed,
            ToolsPuntuation,
            SecurityLvL,
            SecurityPuntuation,
            StrikeLvL,
            puntuation: this.playersPackages[0].puntuation
        })

        newHistory.gameHistory.push(newResults)

        await newHistory.save()

        retrievedUserGame.gameHistory.push(newHistory._id)

        await retrievedUserGame.save()

        return this.playersPackages

    } else return
}


module.exports = { alivePrivateGames, alivePublicGames, Game }