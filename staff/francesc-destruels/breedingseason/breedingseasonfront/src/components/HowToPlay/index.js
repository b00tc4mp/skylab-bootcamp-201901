import React, { useContext, useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'
import Logo from "../Logo"
import howTo from '../Game/img/HowToPlay.jpg'

function HowToPLay({ history }) {

    const handleToSignOut = () => {
        logic.logoutUser()
        history.push('/')
    }

    const handleToGoBack = () => {
        history.push('/home')
    }


    return (
        <div className="HowToPlay">
            <Logo sizeX={"10%"} sizeY={"10%"} main={true} classToUse={"HowToPlay__Logo"} />
            <p className="HowToPlay__Exp">
                <h2>How to Play</h2>
                On this game you would have to help the Penguins on area 1 to get a partner. 
                For that they are carrying a number of rocks to present but Females will not accept any number of them, 
                the will always want at least 1 more than the one on it's right!
                < br />
                < br />

                1) Choose one of the three possible combinations on the area 1.
                < br />
                < br />
                2) The Females that are Ok with the amount of rocks you picked will shine on joy! 
                <br/>
                <br/>
                2.5) Use the Resource (or not):
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Love: Make one couple breed (up to 4 eggs)</li>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Glue & Pick: Decrease or Increase the amount of rocks on a nest</li>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Upgrade: 2.75A Improve nest for more Points</li>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Security: 2.75B Improve segurity for more points</li>
                    </ul>
                <br/>
                3A) Click to pass to the next round
                <br/>
                <br/>
                3B) If you can not (or do not want) use one of the Penguin you can recive and strike to go to the next round! 
                But be aware that it will rest you points at the end! You only have 3 of them!
                <br/>
                <br/>
                Missions: Complete them to get more points! If you complete one of them that it's related to eggs it will make them Hatch!
                <br/>
                <br/>
                How to finish: 
                <ul>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;Everyone has already breed</li>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;You completed each mission</li>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;You got 3 strikes</li>
                </ul>
            </p>
            <img className="HowToPlay__Img" alt="Breeding Season Logo" src={howTo} />

            <button className="HowToPlay__Gb button is-link" onClick={handleToGoBack}> Go Back </button>                
        </div>)
}

export default withRouter(HowToPLay)