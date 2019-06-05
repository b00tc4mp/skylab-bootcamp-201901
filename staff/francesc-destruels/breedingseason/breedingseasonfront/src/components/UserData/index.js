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
                <img src={user.avatar} alt="Breeding Season Logo" height="55px" width="55px"/>
                <p>Name: {user.nickname}</p>
                <p>Age: {user.age}</p>
                <p>Email: {user.email}</p>
                <h3>Last 5 Games</h3>
                {gameData ? gameData[0] ? <p>gameData[0].points</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
                {gameData ? gameData[1] ? <p>gameData[1].points</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
                {gameData ? gameData[2] ? <p>gameData[2].points</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
                {gameData ? gameData[3] ? <p>gameData[3].points</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
                {gameData ? gameData[4] ? <p>gameData[4].points</p> : <p>You should start playing!</p> : <p>No game Data recived</p>}
            </div>
            <button onClick={handleToGoBack}>
                    Go Back
                </button>
        </div>)
}

export default withRouter(UserData)