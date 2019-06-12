import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import Logo from "../../Logo"
import { GameContext } from '../../GameContext'
import IMG from '../img/index'

function Results({ newGame, history }) {

    const { results: { 0: user } } = useContext(GameContext)

    if (user) {

        const { puntuation, userPuntuation, userPuntuation: { puntuationSchema, missionCards } } = user

        let completed = 0
        let points = 0

        for (let i = 0; i < 3; i++) {

            console.log(missionCards)
            if (missionCards[i].completed) {
                completed++
                points += missionCards[i].points
            }
        }

        return <section className="Game__Results Results">
            <Logo main={true} classToUse={"Results__Logo"} />
            <div className="Results__List">
                <h3>Results</h3>
                <section className="Results__Data">
                    <p className="Results__E1">{userPuntuation.OneEggNestAmount}<img src={IMG.mission[1]} className="IMG" alt="Breeding Season 1EGG Level" /> x {puntuationSchema.OneEggNestLvL[userPuntuation.OneEggNestLvL]} = {userPuntuation.OneEggNestAmount ? userPuntuation.OneEggNestAmount * puntuationSchema.OneEggNestLvL[userPuntuation.OneEggNestLvL] : "0"}P </p>
                    <p className="Results__E2">{userPuntuation.TwoEggNestAmount} <img src={IMG.mission[2]} className="IMG" alt="Breeding Season 2EGG Level" /> x {puntuationSchema.TwoEggNestLvL[userPuntuation.TwoEggNestLvL]} = {userPuntuation.TwoEggNestAmount ? userPuntuation.TwoEggNestAmount * puntuationSchema.TwoEggNestLvL[userPuntuation.TwoEggNestLvL] : "0"}P</p>
                    <p className="Results__E3">{userPuntuation.ThreeEggNestAmount} <img src={IMG.mission[3]} className="IMG" alt="Breeding Season 3EGG Level" /> x {puntuationSchema.ThreeEggNestLvL[userPuntuation.ThreeEggNestLvL]} = {userPuntuation.ThreeEggNestAmount ? userPuntuation.ThreeEggNestAmount * puntuationSchema.ThreeEggNestLvL[userPuntuation.ThreeEggNestLvL] : "0"}P </p>
                    <p className="Results__E4">{userPuntuation.FourEggNestAmount} <img src={IMG.mission[4]} className="IMG" alt="Breeding Season 3EGG Level" /> x {puntuationSchema.FourEggNestLvL[userPuntuation.FourEggNestLvL]} = {userPuntuation.FourEggNestAmount ? userPuntuation.FourEggNestAmount * puntuationSchema.FourEggNestLvL[userPuntuation.FourEggNestLvL] : "0"}P</p>
                    <p className="Results__S1"><img src={IMG.mission[5]} className="IMG" alt="Breeding Season Security 1 Level" /> x {userPuntuation.SecurityLvL[1]} = {puntuationSchema.SecurityLvL[1][userPuntuation.SecurityLvL[1]] ? puntuationSchema.SecurityLvL[1][userPuntuation.SecurityLvL[1]] : "0"}P</p>
                    <p className="Results__S2"><img src={IMG.mission[6]} className="IMG" alt="Breeding Season Security 2 Level" /> x {userPuntuation.SecurityLvL[2]} = {puntuationSchema.SecurityLvL[2][userPuntuation.SecurityLvL[2]] ? puntuationSchema.SecurityLvL[2][userPuntuation.SecurityLvL[2]] : "0"}P</p>
                    <p className="Results__S3"><img src={IMG.mission[7]} className="IMG" alt="Breeding Season Security 3 Level" /> x {userPuntuation.SecurityLvL[3]} = {puntuationSchema.SecurityLvL[3][userPuntuation.SecurityLvL[3]] ? puntuationSchema.SecurityLvL[3][userPuntuation.SecurityLvL[3]] : "0"}P </p>
                    <p className="Results__T"><img src={IMG.mission[0]} className="IMG" alt="Breeding Season Security 3 Level" /> x {userPuntuation.ToolsUsed} = {userPuntuation.ToolsPuntuation}P</p>
                    <p className="Results__Mi"> {completed} Missions Completed for {points}P  </p>
                    <p className="Results__St">{userPuntuation.StrikeLvL}* Strike = {puntuationSchema.StrikeLvL[userPuntuation.StrikeLvL] ? puntuationSchema.StrikeLvL[userPuntuation.StrikeLvL] : "0" }P</p>
                    <p className="Results__Total">Total = {puntuation}P</p>
                </section>
            </div>
            <button className="Results__ButtonB button is-link is-medium" onClick={() => newGame()}>Play Again!</button>
            <button className="Results__ButtonC button is-link is-medium" onClick={() => history.push('/home')}>Go Home</button>
        </section>
    }

    return <div />
}

export default withRouter(Results)