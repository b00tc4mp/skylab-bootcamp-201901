import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { GameContext } from '../GameContext'
import logic from '../../logic'
import Logo from "../Logo"
import NavLvLs from "./NavLvLs"
import OptionCards from "./OptionCards"
import PenguinsMap from "./PenguinsMap"
import MissionCards from "./MissionCards"
import './index.sass'

function Game({ history }) {

    //The game should handle the events in game, like the choices and save them to send on click
    // First choice, if choice then map selection && if wanted action selection then send avaible

    const [start, setStart] = useState()
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
    const [missionsDone, setMissionsDone] = useState([false, false, false])

    const handleStart = async () => {
        setStart(true)
        const { mapStatus, missionCards, round, turnCards, userPuntuation } = await logic.startGame()
        console.log(userPuntuation)

        setMissionCards(missionCards)
        setPuntuation(userPuntuation)
        setInitialTurnCards(turnCards)
        setMap(mapStatus)
        setRound(round)
    }

    const handleToSend = async () => {

        if (PenguinTurn) setMap({ ...Map, ...Map[PenguinTurn.where[0][0]][PenguinTurn.where[0][1]][1] = NumberToUse.rocks })
        else setPuntuation({ ...puntuation, ...puntuation.StrikeLvL++ })

        const updatedAmount = logic.__updatedValues__(Map)

        const { round, turnCards } = await logic.nextGame({
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
            missions: missionsDone
        }, updatedAmount)

        setNextCards(turnCards)
        setRound(round)
        setActionTurn(false)
        setPenguinTurn(null)
        setActionUsed(false)
        setNumberUsed(false)
        setNumberToUse(false)
        setActionToUse(false)
    }

    const handleToEndGame = () => {
        logic.finishedGame()
        history.push("/home")
    }

    useEffect(() => () => { logic.finishedGame() }, [])

    return <div className="Game">
        {!start && <button className="Game__StartButton" onClick={handleStart}>Start Game!</button>}
        {Round &&
            <GameContext.Provider value={{ InitialTurnCards, missionCards, setActionUsed, missionsDone, setMissionsDone, ActionUsed, ActionTurn, setActionTurn, setNumberUsed, NumberUsed, puntuation, setPuntuation, Map, setMap, Round, NextCards, NumberToUse, setNumberToUse, ActionToUse, setActionToUse, PenguinTurn, setPenguinTurn }}>
                <MissionCards send={handleToSend} Cards={missionCards} />
                <OptionCards />
                <div className="Game__Logo">
                    <Logo classToUse={"Game__Logo"} sizeX={""} sizeY={""} />
                </div>
                <NavLvLs send={handleToSend} resource={ActionToUse} puntuation={puntuation} />
                <div className="Game__Button " ><button onClick={handleToEndGame}> Abandon Game </button></div>
                <PenguinsMap send={handleToSend} />
            </GameContext.Provider>
        }</div>
}

export default withRouter(Game)