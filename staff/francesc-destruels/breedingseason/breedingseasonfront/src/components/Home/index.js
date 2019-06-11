import React, { useContext, useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import { AppContext } from "../AppContext"
import Logo from "../Logo"
import Game from "../Game"
import HowToPlay from "../HowToPlay"
import './index.sass'
import UserData from '../UserData';

function Home({ history }) {

    const { Nickname } = useContext(AppContext)

    useEffect(() => {
        logic.isUserLoggedIn && logic.retrieveUserGameHistory()
            .then(data => setGameHistory(data))
    }, [])

    const [GameHistory, setGameHistory] = useState()

    const handleToSignOut = () => {
        logic.logoutUser()
        history.push('/')
    }

    const handleToUser = async () => {
        logic.retrieveUserGameHistory()
            .then(data => setGameHistory(data))
            .then(() => history.push('home/User'))
    }

    const handleToHowToPlay = () => {
        history.push('/home/HowToPlay')
    }

    const handleToSoloGame = async () => {
        history.push('/home/Game')
    }

    const handleToMultiplayer = () => {

    }

    return (
        <div className="Home">
            <Route exact path="/home" render={() =>
                <div className="Home__Panel Panel">
                    <Logo classToUse={"Panel__Logo"} sizeX={"300vh"} main={true} />
                    <p>Nice to see you here, {Nickname.nickname}!</p>
                    <button className="button is-info  is-rounded" onClick={handleToHowToPlay}> How To Play </button>
                    <button className="button is-rounded" onClick={handleToSoloGame}> Solo Game</button>
                    <button className="button is-rounded" onClick={handleToMultiplayer} title="Coming Soon!" disabled> Multiplayer Game</button>
                    <button className="button is-info  is-rounded" onClick={handleToUser}> User Data</button>
                    <button style={{ width: "5%" }} className="button is-rounded is-small little" onClick={handleToSignOut}> Logout</button>
                </div>
            } />

            <Route path="/home/User" render={() => logic.isUserLoggedIn ? <UserData user={Nickname} gameData={GameHistory} /> : <Redirect to='/' />} />

            <Route path="/home/HowToPlay" render={() => logic.isUserLoggedIn ? <HowToPlay /> : <Redirect to='/' />} />

            <Route path="/home/Game" render={() => logic.isUserLoggedIn ? <Game /> : <Redirect to='/' />} />

        </div>)
}

export default withRouter(Home)