import React from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Logo from "../Logo"


function UserData({ history, user, gameData }) {

    const handleToSignOut = () => {
        logic.logoutUser()
        history.push('/')
    }

    const handleToGoBack = () => {
        history.push('/home')
    }

    console.log(gameData)

    return (
        <div>
            <div>
                <Logo sizeX={"100px"} sizeY={"100px"} />
                <button onClick={handleToSignOut}>
                    LogOut!
                </button>
            </div>
            <div>
                <h3>User Data</h3>
                <img src={user.avatar} alt="Breeding Season Logo" height="55px" width="55px" />
                <p>Name: {user.nickname}</p>
                <p>Age: {user.age}</p>
                <p>Email: {user.email}</p>
                <h3>Last 5 Games</h3>
                {gameData ? gameData[0] ? <p>You got {gameData[0].gameHistory[0].puntuation} points on  {Date(gameData[0].date)}</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
                {gameData ? gameData[1] ? <p>You got {gameData[1].gameHistory[0].puntuation} points on  {gameData[1].date}</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
                {gameData ? gameData[2] ? <p>You got {gameData[2].gameHistory[0].puntuation} points on  {gameData[2].date}</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
                {gameData ? gameData[3] ? <p>You got {gameData[3].gameHistory[0].puntuation} points on  {gameData[3].date}</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
                {gameData ? gameData[4] ? <p>You got {gameData[4].gameHistory[0].puntuation} points on  {gameData[4].date}</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
            </div>
            <button onClick={handleToGoBack}>
                Go Back
                </button>
        </div>)
}

export default withRouter(UserData)