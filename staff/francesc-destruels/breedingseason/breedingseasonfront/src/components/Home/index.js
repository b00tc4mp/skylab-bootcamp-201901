import React, { useContext, useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import { GameContext } from "../GameContext"
import Logo from "../Logo"
import Game from "../Game"
import userData from "../UserData"
import './index.sass'
import UserData from '../UserData';

function Home({ history }) {

    // const { setUserData, userData } = useContext()
    const { Nickname } = useContext(GameContext)

    const handleToSignOut = () => {
        logic.logoutUser()
        history.push('/')
    }

    const handleToUser = () => {
        history.push('home/User')
    }

    const handleToHowToPlay = () => {
        history.push('/home/HowToPlay')
    }

    const handleToSoloGame = () => {
        //Here will collect the first data 
        history.push('/home/Game')
    }

    const handleToMultiplayer = () => {

    }

    return (
        <div>
            <Route exact path="/home" render={() =>

                <div>
                    <Logo sizeX={"150px"} sizeY={"150px"} />
                    <p>Welcome Hell {Nickname.nickname}!</p>
                    <button onClick={handleToUser}>
                        User Data
                </button>
                    <button onClick={handleToHowToPlay}>
                        How To Play
                </button>
                    <button onClick={handleToSoloGame}>
                        Solo Game
                </button>
                    <button onClick={handleToMultiplayer}>
                        Multiplayer Game
                </button>
                    <button onClick={handleToSignOut}>
                        LogOut!
                </button>
                </div>} />

            <Route path="/home/User" render={() => <UserData />} />

            <Route path="/home/HowToPlay" render={() => <div><Logo sizeX={"100px"} sizeY={"100px"} /><p>This is how you play</p><button onClick={handleToSignOut}>
                LogOut!
            </button></div>} />

            <Route path="/home/Game" render={() => <Game className="gameBoard" />} />

        </div>)
}

export default withRouter(Home)