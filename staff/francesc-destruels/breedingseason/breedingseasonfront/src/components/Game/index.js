import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { GameContext } from '../GameContext'
import logic from '../../logic'
import Logo from "../Logo"
import NavLvLs from "./GameComponents/NavLvLs"
import OptionCards from "./GameComponents/OptionCards"
import PenguinsMap from "./GameComponents/PenguinMap"
import MissionCards from "./GameComponents/MissionCards"
import './index.sass'

function Game({ history }) {

    //The game should handle the events in game, like the choices and save them to send on click
    // First choice, if choice then map selection && if wanted action selection then send avaible

    const [start, setStart] = useState()
    const [InitialTurnCards, setInitialTurnCards] = useState()
    const [missionCards, setMissionCards] = useState()
    const [Puntuation, setPuntuation] = useState()
    const [Map, setMap] = useState()
    const [Round, setRound] = useState()
    const [NextCards, setNextCards] = useState()
    const [Choice, setChoice] = useState()

    const handleStart = async () => {
        setStart(true)
        const { mapStatus, missionCards, round, turnCards, userPuntuation } = await logic.startGame()

        setMissionCards(missionCards)
        setPuntuation(userPuntuation)
        setInitialTurnCards(turnCards)
        setMap(mapStatus)
        setRound(round)

    }

    const handleToEndGame = () => {
        logic.finishedGame()
        history.push("/home")
    }

    useEffect(() => () => { logic.finishedGame()})
    
    return <div className="game">
        {!start && <button className="game__StartButton" onClick={handleStart}>Start Game!</button>}
        {InitialTurnCards &&
            <GameContext.Provider value={{ InitialTurnCards, missionCards, Puntuation, Map, Round, NextCards, Choice, setChoice }}>
                <div className="game__playing">
                    <MissionCards Cards={missionCards} />
                    <OptionCards />
                    <div className="game__Nav">
                        <div className="game__Logo">
                            <Logo sizeX={"100px"} sizeY={"100px"} />
                        </div>
                        <NavLvLs resource={Choice} puntuation={Puntuation} />
                        <div className="game__Button" >
                            <button onClick={handleToEndGame}>
                                Abandon Game
                    </button>
                        </div>
                    </div>
                    <PenguinsMap resource={Choice ? Choice.resource : undefined} rocks={Choice ? Choice.resource : undefined} map={Map} />
                </div>
            </GameContext.Provider>
        }</div>
}

export default React.memo(withRouter(Game))