import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { GameContext } from '../GameContext'
import logic from '../../logic'
import Logo from "../Logo"
import NavLvLs from "./NavLvLs"
import Results from "./Results"
import OptionCards from "./OptionCards"
import PenguinsMap from "./PenguinsMap"
import MissionCards from "./MissionCards"
import './index.sass'

function Game({ history }) {

    //The game should handle the events in game, like the choices and save them to send on click
    // First choice, if choice then map selection && if wanted action selection then send avaible

    const [start, setStart] = useState()
    const [finish, setFinish] = useState(false)
    const [results, setResults] = useState({})
    const [InitialTurnCards, setInitialTurnCards] = useState()
    const [missionCards, setMissionCards] = useState()
    const [puntuation, setPuntuation] = useState()
    const [Map, setMap] = useState()
    const [Round, setRound] = useState()
    const [NextCards, setNextCards] = useState()
    const [NumberToUse, setNumberToUse] = useState()
    const [NumberUsed, setNumberUsed] = useState(false)
    const [ActionToUse, setActionToUse] = useState()
    const [ActionUsed, setActionUsed] = useState(false)
    const [PenguinTurn, setPenguinTurn] = useState(false)
    const [ActionTurn, setActionTurn] = useState(false)
    const [missionsDone, setMissionsDone] = useState({ 0: false, 1: false, 2: false })

    const handleStart = async () => {
        setStart(true)
        setFinish(false)
        await logic.newGame({ mode: "solo", playersNumber: 1 }, true)
        const { mapStatus, missionCards, round, turnCards, userPuntuation } = await logic.startGame()
        console.log(userPuntuation)

        setMissionCards(missionCards)
        setPuntuation(userPuntuation)
        setInitialTurnCards(turnCards)
        setMap(mapStatus)
        setRound(round)
    }

    const handleToSend = async () => {

        if (!PenguinTurn) setPuntuation({ ...puntuation, ...puntuation.StrikeLvL++ })

        const { OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount } = puntuation

        const response = await logic.nextGame({
            resource: {
                type: PenguinTurn ? ActionTurn ? ActionTurn.resource : "" : "strike",
                row: ActionTurn ? ActionTurn.row : 0,
                column: ActionTurn ? ActionTurn.column : 0,
                nest: ActionTurn ? ActionTurn.nest : ""
            },
            map: {
                status: PenguinTurn ? true : false,
                position: {
                    row: PenguinTurn ? PenguinTurn.where[0][0] : 0,
                    column: PenguinTurn ? PenguinTurn.where[0][1] : 0
                }
            },
            missions: [missionsDone[0], missionsDone[1], missionsDone[2]]
        }, { OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount })


        if (response.continue === true) {
            
            const { round, turnCards } = response

            setNextCards(turnCards)
            setRound(round)
            setActionTurn(false)
            setPenguinTurn(null)
            setActionUsed(false)
            setNumberUsed(false)
            setNumberToUse(false)
            setActionToUse(false)
        } else {
            setFinish(true)
            setStart(false)
            console.log(response)
            setResults(response)
        }
    }

    const handleToEndGame = () => {
        logic.finishedGame()
        history.push("/home")
    }

    useEffect(() => () => { return logic.finishedGame() }, [])

    return <div className="Game">
        {!start && !finish && <button className="Game__StartButton" onClick={handleStart}>Start Game!</button>}
        {Round && !finish && 
            <GameContext.Provider value={{ InitialTurnCards, missionCards, setActionUsed, missionsDone, setMissionsDone, ActionUsed, ActionTurn, setActionTurn, setNumberUsed, NumberUsed, puntuation, setPuntuation, Map, setMap, Round, NextCards, NumberToUse, setNumberToUse, ActionToUse, setActionToUse, PenguinTurn, setPenguinTurn }}>
                <MissionCards send={handleToSend} Cards={missionCards} />
                <OptionCards />
                <div className="Game__Logo">
                    <Logo sizeX={"150%"} sizeY={"100%"} main={false} />
                </div>
                <NavLvLs send={handleToSend} resource={ActionToUse} puntuation={puntuation} />
                <div className="Game__Button " ><button onClick={handleToEndGame}> Abandon Game </button></div>
                <PenguinsMap send={handleToSend} />
            </GameContext.Provider>}
            {finish &&
            <GameContext.Provider value={{results }}>
                <Results  newGame={handleStart}/>
            </GameContext.Provider>}
        </div>
}

export default withRouter(Game)