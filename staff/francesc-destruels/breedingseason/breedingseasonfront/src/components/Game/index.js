import React, { Fragment, useContext, useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import Logo from "../Logo"
import NavLvLs from "./GameComponents/NavLvLs"
import OptionCards from "./GameComponents/OptionCards"
import PenguinsMap from "./GameComponents/PenguinMap"
import MissionCards from "./GameComponents/MissionCards"
import './index.sass'

function Game() {

    // const { setUserData, userData } = useContext()

    const handleToEndGame = () => {
        logic.finishedGame()
    }

    return <div className="game">
            <MissionCards />
            <OptionCards />
            <div className="game__Nav">
                <div className="game__Logo">
                <Logo sizeX={"100px"} sizeY={"100px"} />
                </div>
                <NavLvLs />
                <div className="game__Button" >
                    <button onClick={handleToEndGame}>
                        Abandon Game
                    </button>
                </div>
            </div>
        <PenguinsMap />
    </div>

    // <Fragment>
    //     <Route exact path="/home" render={() => <div> Hello Hell! <button onClick={handleToSignOut}>LogOut!</button></div>} />
    // </Fragment>
}

export default Game