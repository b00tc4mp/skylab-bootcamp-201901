
function Game(creatorId, gameId, style) {
    const { mode, conditions: players, private } = style

    this.id = gameId
    this.creator = creatorId
    this.players = [{ id: creatorId, start: false, nextRound = false }]
    let round = 1
    let start = false
    let next = false
    let winner = false

    if (mode === multiplayer) {
        this.maxPlayer = players

        this.addPlayer = (playerId) => {
            if (this.player.length === this.maxPlayer) throw new Error('Game full')

            this.players.push({ id: playerId, start: false, nextRound = false })

            return `You joined game Id = ${this.id}`
        }
    }

    //                                                            //
    //The mission Cards that will be send with the initial package//
    //                                                            //

    let missionCards = [{ objectives: "", completed: false }] * 3

    function bringMissionCards() {

        missionCards.push(card)
    }

    //                                                            //
    //The penguin Cards that will be send witheach round          //
    //                                                            //

    let penguinCards = { 1: [], 2: [], 3: [] }

    function bringPenguinCards() {

        penguinCards[1].push(card) * 15
        penguinCards[2].push(card) * 15
        penguinCards[3].push(card) * 15
    }

    //                                                              //
    //This method starts the game  when all player are ok whit it   //
    //                                                              //

    this.start = userId => {

        const userToUdate = this.player.find(x => x.id === userId)

        userToUdate.start = true
    }

    function sendInitialPackage() {

        let initialPackage = {
            round,
            missionCards: { // if nobody completed it false
                1: false,
                2: false,
                3: false,
            },
            turnCards: {
                1: penguinCards[1][round],
                2: penguinCards[2][round],
                3: penguinCards[0][round]
            },
            userPunctuation: {
                players: ObjectId(userId),
                OneEggNestAmount: { type: Number, required: true },
                OneEggNestLvL: { type: Number, required: true },
                TwoEggNestAmount: { type: Number, required: true },
                TwoEggNestLvL: { type: Number, required: true },
                ThreeEggNestAmount: { type: Number, required: true },
                ThreeEggNestLvL: { type: Number, required: true },
                FourEggNestAmount: { type: Number, required: true },
                FourEggNestLvL: { type: Number, required: true },
                ToolsUsed: { type: Number, required: true },
                ToolsPunctuation: { type: Number, required: true },
                SecurityLvL: { type: Number, required: true },
                SecurityPunctuation: { type: Number, required: true },
                FishingRoadUsed: { type: Number, required: true }
            }
        }

        return initialPackage
    }

    //                                                                   //
    //This method sends the next round  when all player are ok whit it   //
    //                                                                   //

    this.next = (userId) => {

        checkWinner()
        //should calla  function to check the changes

        const userToUdate = this.player.find(x => x.id === userId)

        userToUdate.nextRound = true
    }

    function sendNextRound() {
        round = round + 1

        return {
            round,
            missionCards: { // if nobody completed it false
                1: false,
                2: false,
                3: false,
            },
            turnCards: {
                1: penguinCards[1][round],
                2: penguinCards[2][round],
                3: penguinCards[0][round]
            }
        }
    }

    //                                            //
    //This function checks if there is a winner   //
    //
    this.update = () => {
        
    }                                            //

    function checkWinner() {
    }
}

module.exports = Game