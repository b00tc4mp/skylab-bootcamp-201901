

let aliveGames = []

function Game(creatorId, gameId, style) {
    const { mode, conditions: players, private } = style

    aliveGames.push({ id: gameId, creator: creatorId, mode, private, players })

    this.id = gameId
    this.creator = creatorId
    this.players = [{ id: creatorId, start: false, nextRound: false, winner: undefined }]
    let round = 0
    let start = mode === "solo" ? true : false
    let next = false
    let finish = false
    let missionCardsStatus = [false, false, false]
    let playersPackages = [] //for Each player = { player, userRound, mapStatus, userPunctuation }

    if (mode === multiplayer) {
        this.maxPlayer = players

        this.addPlayer = (playerId) => {
            if (this.player.length === this.maxPlayer) throw new Error('Game full')

            this.players.push({ id: playerId, start: false, nextRound: false, winner: undefined })

            return `You joined game Id = ${this.id}`
        }
    }

    //                                                            //
    //The mission Cards that will be send with the initial package//
    // async function bringMissionCards                           //

    let missionCards = [] // [{ objectives: "", completed: false, firstPoint: X, otherPoints: Y  }] * 3

        (async () => {

            await MissionCards.count().exec(async (err, count) => {

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
            const cards = await PenguinCards.find({})

            for (let i = 0; i < cards.length - 1; i++) {
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

    this.start = userId => {

        if (start && mode === "solo") return sendInitialPackage(userId)

        if (!start) {
            //Search for the user and change it start state to true
            const userToUdate = this.player.find(x => x.id === userId)

            userToUdate.start = true

            //Check if there is anybody waiting to start and is there is nobody then change the start value of the game to true
            if (players.length === maxPlayer) {
                const timeToStart = this.player.some(x => x.start === false)
                if (!timeToStart) start = true
            }

        } else throw Error("Game already Started")
    }

    this.next = async (gameAction) => {
        //{ player, userRound, mapStatus, userPunctuation }

        const { userId, action: { resource, map: { status, position }, missions } } = gameAction

        const player = playersPackages.find(x => x.player === userId)

        if (!status) {
            player.userPunctuation.StrikLevL += 1
            if (player.userPunctuation.StrikLevL === 3) finish = true
        }
        else {
            player.mapStatus[position.row][position.column] += 1

            let full = 0
            for (let i = 1; i < 4; i++) {
                const checked = player.mapStatus[i].some(x => x === 0)
                if (!checked) full += 1
                if (i === 4 && full === 4) finish = true
            }
        }

        switch (resource.type) { // resource = {type: string, row: number, column: number, nest: string}
            case "love":
                player.mapStatus[resource.row][resource.column] += 1 //TAKE CARE MAYBE IT CONCADENATES!
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

        // return player

        const userToUdate = this.player.find(x => x.id === userId)

        userToUdate.nextRound = true

        const timeToContinue = this.player.some(x => x.next === false)

        if(!timeToContinue && finish === true) return checkWinner(usersPackage)
        else if (!timeToContinue) {
            next = true
            round += 1
        }

        if (mode === "solo") return sendNextRound(userId)
    }

    this.update = (userId) => {

        if (!start) return
        if (finish) return results(userId)

        if (round === 0) return sendInitialPackage(userId)
        else if (next) return sendNextRound(userId)
        else return
    }
}

//                                                              //
//This function will be call once everybody is start === true   //
//                                                              //

function sendInitialPackage(userId) {

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
            1: [0, 0, 0, 0, 0, 0, 0, 0],
            2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        userPunctuation: {
            players: ObjectId(userId),
            missionCards: [
                { cardId: x, completed: false, points: 0 },
                { cardId: x, completed: false, points: 0 },
                { cardId: x, completed: false, points: 0 }],
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
            SecurityLvL: 0,
            SecurityPunctuation: 0,
            FishingRoadUsed: 0,
            StrikLevL: 0
        }
    }

    const { player, round: userRound, mapStatus, userPunctuation } = initialPackage

    playersPackages.push({ player, userRound, mapStatus, userPunctuation })

    return initialPackage
}


//                                                                  //
//This function sends the next round when all player are ok with it   //
//                                                                  //

function sendNextRound(userId) {

    const userPackage = usersPackage.find(x = x.player === userId)

    let { round, missionCards, turnCards } = userPackage

    round += 1

    for (k in missionCards) missionCards[k].completed = missionCardsStatus[k]

    for (p in turnCards) turnCards[p] = penguinCards[p][round]

    return userPackage
}

//                                                  //
//This function send the player the results         //
//                                                  //

function results() {


}

//                                            //
//This function checks if there is a winner   //
//                                            //

function checkWinner(usersPackage) {

    const puntuationSchema = await Game.findById({ _id: "puntuationModel" })

}

const game = { Game, aliveGames }
module.exports = game