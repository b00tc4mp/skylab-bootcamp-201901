import React from 'react'
import { withRouter } from 'react-router-dom'
import Logo from "../Logo"
import './index.sass'
import moment from 'moment'

function UserData({ history, user, gameData }) {

    const handleToGoBack = () => {
        history.push('/home')
    }

    return (
        <div className="UserData">
            <Logo sizeX={"20%"} main={true} classToUse={"UserData__Logo"} />
            <div className="UserData__User">
                <img className="UserData__Avatar" src={user.avatar} alt="Breeding Season Avatar" />
                <p className="UserData__Name"  >Name: {user.nickname}</p>
                <p className="UserData__Age" >Age: {user.age}</p>
                <p className="UserData__Email" >Email: {user.email}</p>
                <h3 className="UserData__List"  >Game Records</h3>
                {gameData ? gameData[0] ? <p className="UserData__Data1">You got {gameData[0].gameHistory[0].puntuation} points on  {moment(gameData[0].date).format('D MMM YYYY, LT')}</p> : <p className="UserData__Data1" >You should start playing!</p> : <p className="UserData__Data1">No game Data recived</p>}
                {gameData ? gameData[1] ? <p className="UserData__Data2">You got {gameData[1].gameHistory[0].puntuation} points on  {moment(gameData[1].date).format('D MMM YYYY, LT')}</p> : <p className="UserData__Data2">You should start playing!</p> : <p className="UserData__Data2">No game Data recived</p>}
                {gameData ? gameData[2] ? <p className="UserData__Data3">You got {gameData[2].gameHistory[0].puntuation} points on  {moment(gameData[2].date).format('D MMM YYYY, LT')}</p> : <p className="UserData__Data3">You should start playing!</p> : <p className="UserData__Data3">No game Data recived</p>}
                {gameData ? gameData[3] ? <p className="UserData__Data4">You got {gameData[3].gameHistory[0].puntuation} points on  {moment(gameData[3].date).format('D MMM YYYY, LT')}</p> : <p className="UserData__Data4">You should start playing!</p> : <p className="UserData__Data4">No game Data recived</p>}
                {gameData ? gameData[4] ? <p className="UserData__Data5">You got {gameData[4].gameHistory[0].puntuation} points on  {moment(gameData[4].date).format('D MMM YYYY, LT')}</p> : <p className="UserData__Data5">You should start playing!</p> : <p className="UserData__Data5">No game Data recived</p>}
            </div>
            <button className="UserData__GB button is-link is-rounded" onClick={handleToGoBack}>
                Go Back
                </button>
        </ div>)
    }
    
export default withRouter(UserData)