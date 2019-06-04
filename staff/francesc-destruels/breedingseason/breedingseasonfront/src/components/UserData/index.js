import React, { useContext, useState } from 'react'
import { GameContext } from "../GameContext"
import logic from '../../logic'
import Logo from "../Logo"


function UserData({ history }) {

    // const { setUserData, userData } = useContext()
    const { Nickname, GameHistory } = useContext(GameContext)

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
                <p>Name: {Nickname.nickname}</p>
                <p>Age: {Nickname.age}</p>
                <p>Email: {Nickname.email}</p>
                <h3>Las 5 Games</h3>
                {GameHistory[0] ? <p>GameHistory[0].points</p> : <p>You should start playing!</p>}
                {GameHistory[1] ? <p>GameHistory[1].points</p> : <p>You should start playing!</p>}
                {GameHistory[2] ? <p>GameHistory[2].points</p> : <p>You should start playing!</p>}
                {GameHistory[3] ? <p>GameHistory[3].points</p> : <p>You should start playing!</p>}
                {GameHistory[4] ? <p>GameHistory[4].points</p> : <p>You should start playing!</p>}
            </div>
            <button onClick={handleToGoBack}>
                    Go Back
                </button>
        </div>)
}

export default UserData