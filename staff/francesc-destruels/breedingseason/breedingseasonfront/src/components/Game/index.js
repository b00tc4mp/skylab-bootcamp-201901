import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { GameContext } from '../GameContext'
import logic from '../../logic'
import Logo from "../Logo"
import NavLvLs from "./GameComponents/NavLvLs"
import OptionCards from "./GameComponents/OptionCards"
import PenguinsMap from "./GameComponents/PenguinsMap"
import MissionCards from "./GameComponents/MissionCards"
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


        const { round, turnCards } = await logic.nextGame({
            resource: {
                type: PenguinTurn ? ActionTurn ? ActionTurn.resource : "" : "strik",
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
        })

        if(PenguinTurn) setMap({ ...Map, ...Map[PenguinTurn.where[0][0]][PenguinTurn.where[0][1]][1] = NumberToUse.rocks })
        else setPuntuation({...puntuation, ...puntuation.StrikLvL++})

        if (ActionTurn && ActionTurn.resource === "love") setMap({ ...Map, ...Map[ActionTurn.row][ActionTurn.column][0]++ })
        setNextCards(turnCards)
        setRound(round)
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

    return <div className="game">
        {!start && <button className="game__StartButton" onClick={handleStart}>Start Game!</button>}
        {Round &&
            <GameContext.Provider value={{ InitialTurnCards, missionCards, setActionUsed, missionsDone, setMissionsDone, ActionUsed, ActionTurn, setActionTurn, setNumberUsed, NumberUsed, puntuation, setPuntuation, Map, setMap, Round, NextCards, NumberToUse, setNumberToUse, ActionToUse, setActionToUse, PenguinTurn, setPenguinTurn }}>
                <div className="game__playing">
                    <MissionCards Cards={missionCards} />
                    <OptionCards />
                    <div className="game__Nav">
                        <div className="game__Logo">
                            <Logo sizeX={"100px"} sizeY={"100px"} />
                        </div>
                        <NavLvLs resource={ActionToUse} puntuation={puntuation} />
                        <div className="game__Button" >
                            <button onClick={handleToEndGame}>
                                Abandon Game
                    </button>
                        </div>
                    </div>
                    <PenguinsMap send={handleToSend} />
                </div>
            </GameContext.Provider>
        }</div>
}

export default withRouter(Game)