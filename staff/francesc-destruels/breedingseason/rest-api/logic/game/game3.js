
const { models: { User, MissionDeck, GameDeck, GameRecord }, mongoose: { Types: { ObjectId } } } = require("breedingseason-data")

const aliveGames = []

function Game(creatorId, gameId, style) {
    const { mode, playersNumber } = style

    this.id = gameId
    this.creator = creatorId
    this.players = [{ id: creatorId, start: false, nextRound: false, winner: undefined }]
    let round = 0
    let start = mode === "solo" ? true : false
    let next = false
    let finish = false
    let missionCardsStatus = [false, false, false]
    let playersPackages = [] //for Each player = { player, userRound, mapStatus, userPunctuation }
    let results

    if (mode === "multiplayer") {

        this.maxPlayer = playersNumber
        this.addPlayer = playerId => {
            if (this.player.length === this.maxPlayer) throw new Error('Game full')

            this.players.push({ id: playerId, start: false, nextRound: false, winner: undefined })

            return `You joined game Id = ${this.id}`
        }
    }

    //                                                            //
    //The mission Cards that will be send with the initial package//
    // async function bringMissionCards                           //

    let missionCards = []; // [{ objectives: "", completed: false, firstPoint: X, otherPoints: Y  }] * 3

    (async () => {

        await MissionDeck.count().exec(async (err, count) => {

            for (let i = 0; i < 3; i++) { }

            var random = Math.floor(Math.random() * 15)

            const card = await MissionCards.findOne().skip(random)

            missionCards.push(card)
        })

    })()

    //                                                            //
    //The penguin Cards that will be send witheach round          //
    //  async function bringPenguinCards                          //

    let penguinCards = { 1: [], 2: [], 3: [] }

        (async () => {
            const cards = await GameDeck.find({})

            for (let i = 0; i < cards.length - 1;) {
                let bundle = Math.floor(Math.random() * 3)

                if (penguinCards[bundle].length !== 15) {
                    penguinCards[bundle].push(cards[0])
                    i++
                }
            }
        })()

    //                                                              //
    //This method starts the game  when all player are ok whit it   //
    //                                                              //

    this.startFunction = userId => { //Checked for 1 player

        // if (start && mode === "solo") return sendInitialPackage(userId)

        if (!start) {
            //Search for the user and change it start state to true

            const userToUdate = this.players.find(x => x.id === userId)
            userToUdate.start = true
            //Check if there is anybody waiting to start and is there is nobody then change the start value of the game to true
            if (this.players.length === this.maxPlayer) {
                const timeToStart = this.players.some(x => x.start === false)

                if (!timeToStart) {
                    start = true
                }
            }

        } else throw Error("Game already Started")
    }

    //                                                              //
    //This function will be call once everybody is start === true   //
    //                                                              //

    this.__sendInitialPackage__ = (userId) => {
        if (!userId) throw Error("User ID is required")

        const puntuationSchema = {
            OneEggNestLvL: [1, 2],
            TwoEggNestLvL: [2, 3, 4],
            ThreeEggNestLvL: [3, 4, 5, 6],
            FourEggNestLvL: [4, 5, 6, 7],
            ToolsPunctuation: [0, 3, 5, 7],
            SecurityLvL: [{
                1: [0, 1, 3, 6],
                2: [0, 1, 3, 4, 9],
                3: [0, 2, 4, 8],
                4: [0, 3, 4, 6, 7]
            }],
            FishingRoadUsed: [3, 6, 9, 12, 15, 18, 21],
            StrikLevL: [0, -1, -3]
        }

        let initialPackage = {
            player: userId,
            round: 1,
            missionCards,
            turnCards: {
                1: penguinCards[1][round],
                2: penguinCards[2][round],
                3: penguinCards[3][round]
            },
            mapStatus: {
                1: [[0, false],[0, false],[0, false], [0, false], [0, false], [0, false], [0, false], [0, false], [0, false]],
                2: [[0, false], [0, false], [0, false], [0, false], [0, false], [0, false], [0, false], [0, false],[0, false]],
                3: [[0, false], [0, false], [0, false], [0, false], [0, false], [0, false], [0, false], [0, false],[0, false]],
                4: [[0, false], [0, false], [0, false], [0, false], [0, false], [0, false], [0, false], [0, false]],
            },
            userPunctuation: {
                players: userId,
                missionCards: [
                    { cardId: "Hello", completed: false, points: 0 },
                    { cardId: "Hola", completed: false, points: 0 },
                    { cardId: "Adios", completed: false, points: 0 }],
                OneEggNestAmount: 0,
                OneEggNestLvL: 0,
                TwoEggNestAmount: 0,
                TwoEggNestLvL: 0,
                ThreeEggNestAmount: 0,
                ThreeEggNestLvL: 0,
                FourEggNestAmount: 0,
                FourEggNestLvL: 0,
                ToolsUsed: 0,
                ToolsPunctuation: mode === "solo" ? 7 : 0,
                SecurityLvL: [{
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                }],
                SecurityPunctuation: 0,
                FishingRoadUsed: 0,
                StrikLevL: 0,
                puntuationSchema
            }
        }

        const { player, round: userRound, mapStatus, userPunctuation } = initialPackage

        playersPackages.push({ player, userRound, mapStatus, userPunctuation })

        return initialPackage
    }

    //                                                                  //
    //This method sends the next round when all player are ok whit it   //
    //                                                                  //

    this.nextFunction = async (gameAction) => {
        //{ player, userRound, mapStatus, userPunctuation }

        const { userId, action: { resource, map: { status, position }, missions } } = gameAction

        const player = playersPackages.find(x => x.player === userId)

        if (!status) {
            player.userPunctuation.StrikLevL += 1
            if (player.userPunctuation.StrikLevL === 3) return checkWinner()
        }
        else {
            player.mapStatus[position.row][position.column][0] += 1

            let full = 0
            for (let i = 1; i < 4; i++) {
                const checked = player.mapStatus[i].some(x => x === 0)
                if (!checked) full += 1
                if (i === 4 && full === 4) return checkWinner()
            }
        }

        switch (resource.type) { // resource = {type: string, row: number, column: number, nest: string}
            case "love":
                player.mapStatus[resource.row][resource.column][0] += 1 //TAKE CARE MAYBE IT CONCADENATES!
                break
            case "tool":
                player.ToolsUsed += 1
                break
            case "security":
                player.SecurityLvL += 1
                break
            case "upgrade":
                //it should change the level of a picked nest type (not over its limit)
                player[`${resource.nest}EggNestLvL`] += 1
                break
            case "strik":
                break
            default:
                throw Error("Resource not defined properly")
        }

        const userToUdate = this.players.find(x => x.id === userId)

        userToUdate.nextRound = true

        const timeToContinue = this.players.some(x => x.nextRound === false)

        if (!timeToContinue) {
            next = true
            round += 1
        }

        // return player

        if (mode === "solo") return sendNextRound(userId)
    }


    this.__sendNextRound__ = (userId) => {
        for (h in this.players) h.nextRound = false

        const userPackage = playersPackage.find(x = x.player === userId)

        let { round, missionCards, turnCards } = userPackage

        round += 1

        for (k in missionCards) missionCards[k].completed = missionCardsStatus[k]

        for (p in turnCards) turnCards[p] = penguinCards[p][round]

        next = false

        return playersPackage
    }

    //                                            //
    //This function checks if there is a winner   //
    //                                            //

    this.update = (userId) => {

        if (!start) return console.log("No started")
        if (finish) return this.__results__(userId)

        if (round === 0) return this.__sendInitialPackage__(userId)
        else if (next) return this.__sendNextRound__(userId)
        else return
    }

    //                                                  //
    //This function send the player the results         //
    //                                                  //

    this.__results__ = userId => {
        if (mode === "solo") return playersPackages

        results = usersPackage.sort((a, b) => {
            let comparison = 0

            if (a.puntuation > b.puntuation) comparison = 1
            else if (a.puntuation < b.puntuation) comparison = -1

            return comparison
        })

        let user = usersPackage.find(x => x.player === userId)

        for (let i = 0; i < results.length; i++) {
            if (results[i].puntuation === results[0].puntuation && results[i].player === userId) user.winner = true
        }

        return usersPackage
    }

    //                                            //
    //This function checks if there is a winner   //
    //                                            //

    this.__checkWinner__ = () => {

        const puntuationSchema = {
            OneEggNestLvL: [1, 2],
            TwoEggNestLvL: [2, 3, 4],
            ThreeEggNestLvL: [3, 4, 5, 6],
            FourEggNestLvL: [4, 5, 6, 7],
            ToolsPunctuation: [0, 3, 5, 7],
            SecurityLvL: [{
                1: [0, 1, 3, 6],
                2: [0, 1, 3, 4, 9],
                3: [0, 2, 4, 8],
                4: [0, 3, 4, 6, 7]
            }],
            FishingRoadUsed: [0, 3, 6, 9, 12, 15, 18, 21],
            StrikLevL: [0, 0, -1, -3]
        }

        let toolsFirst = []
        let toolsSecond = []
        let toolsThird = []

        let firstPoints = 0
        let secondPoints = 0
        let thirdPoints = 0

        for (k in usersPackage) {

            k.puntuation = (
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
                (puntuationSchema.FishingRoadUsed(k.FishingRoadUsed)) -
                (k.StrikLevL)
            )

            if (mode === "solo") {
                k.puntuation += puntuationSchema.ToolsPunctuation(3)
                k.winner = true
                return results(userId)
            }

            if (k.ToolsUsed > firstPoints) {
                toolsThird = toolsSecond
                thirdPoints = secondPoints
                toolsSecond = toolsFirst
                secondPoints = firstPoints
                toolsFirst = []
                firstPoints = k.ToolsUsed
                toolsFirst.push(k)

            } else if (k.ToolsUsed === firstPoints) {
                toolsFirst.push(k)

            } else if (k.ToolsUsed > secondPoints) {
                toolsThird = toolsSecond
                thirdPoints = secondPoints
                toolsSecond = []
                secondPoints = k.ToolsUsed
                toolsSecond.push(k)

            } else if (k.ToolsUsed === secondPoints) {
                toolsSecond.push(k)

            } else if (k.ToolsUsed > thirdPoints) {
                toolsThird = []
                thirdPoints = k.ToolsUsed
                toolsThird.push(k)

            } else if (k.ToolsUsed === thirdPoints) {
                toolsThird.push(k)
            }

            for (F in toolsFirst) F.puntuation += puntuationSchema.ToolsPunctuation[3]
            for (S in toolsSecond) S.puntuation += puntuationSchema.ToolsPunctuation[2]
            for (T in toolsThird) T.puntuation += puntuationSchema.ToolsPunctuation[1]
        }
    }
}

game = { aliveGames, Game }

module.exports = game