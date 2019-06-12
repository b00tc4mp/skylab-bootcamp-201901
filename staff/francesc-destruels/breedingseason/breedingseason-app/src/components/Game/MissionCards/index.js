import React, { useContext, useState, useEffect } from 'react'
import './index.sass'
import logic from '../../../logic'
import numberImg from '../img/index'

import { GameContext } from "../../GameContext"

function MissionCards() {

    const { missionCards, setMissionsDone, missionsDone, puntuation, Map, setMap } = useContext(GameContext)

    const [clickable, setClickable] = useState([{ toComplete: false, toHatch: [], type: "" }, { toComplete: false, toHatch: [], type: "" }, { toComplete: false, toHatch: [], type: "" }])
    const [picture, setPicture] = useState()

    useEffect(() => {setPicture()}, [missionCards])

    useEffect(() => {
        let img = []

        for (let i = 0; i < missionCards.length; i++) {
            switch (missionCards[i][3][0][0]) {
                case "1EGG":
                    img.push(numberImg.mission[1])
                    break
                case "2EGG":
                    img.push(numberImg.mission[2])
                    break
                case "3EGG":
                    img.push(numberImg.mission[3])
                    break
                case "4EGG":
                    img.push(numberImg.mission[4])
                    break
                case "tools":
                    img.push(numberImg.mission[0])
                    break
                case "Security[1]":
                    img.push(numberImg.mission[5])
                    break
                case "Security[2]":
                    img.push(numberImg.mission[6])
                    break
                case "Security[3]":
                    img.push(numberImg.mission[7])
                    break
                default:
                    img.push(0)
                    break
            }
        }
        setPicture(img)

    }, [missionCards])

    useEffect(() => {

        setClickable([
            missionsDone[0] ? "Done" : logic.__isCompleted__(Map, puntuation, missionCards[0][3]),
            missionsDone[1] ? "Done" : logic.__isCompleted__(Map, puntuation, missionCards[1][3]),
            missionsDone[2] ? "Done" : logic.__isCompleted__(Map, puntuation, missionCards[2][3])
        ])


    }, [Map, puntuation])

    const handleCompleted = number => {

        if (missionsDone[number] === false) {

            setMissionsDone({ ...missionsDone, ...missionsDone[number] = true })
            if (clickable[number].type === "love") {
                for (let i = 0; i < clickable[number].toHatch.length; i++) {
                    setMap({ ...Map, ...Map[clickable[number].toHatch[i].row][clickable[number].toHatch[i].column][2] = true })
                }
            } else { }
        }

        setClickable([{ toComplete: false, toHatch: [] }, { toComplete: false, toHatch: [] }, { toComplete: false, toHatch: [] }])
    }

    return (
        <div className="Game__MissionCards" >
            {missionCards && <div className="MissionCardsArea">

                <div onClick={clickable[0].toComplete ? () => { handleCompleted(0) } : null} className={clickable[0].toComplete ? "MissionCardsArea__Mission MissionCardsArea__Mission__M1 MissionCardsArea__Mission--Clikable" : "MissionCardsArea__Mission MissionCardsArea__Mission__M1"} >
                    <p className={"MissionCardsArea__Amount"}>{missionCards[0][3][0][1]} *</p>
                    <img src={ missionsDone[0] ? numberImg.mission[8] : picture ? picture[0] : null} className={ missionsDone[0] ? "M0" :"MImg"} alt="Breeding Season Mission 1" />
                    <p className={"MissionCardsArea__Points"}>For {missionCards[0].first}P</p>
                </div>

                <div onClick={clickable[1].toComplete ? () => { handleCompleted(1) } : null} className={clickable[1].toComplete ? "MissionCardsArea__Mission MissionCardsArea__Mission__M2 MissionCardsArea__Mission--Clikable" : "MissionCardsArea__Mission MissionCardsArea__Mission__M2"} >
                    <p className={"MissionCardsArea__Amount"}>{missionCards[1][3][0][1]} *</p>
                    <img src={missionsDone[1] ? numberImg.mission[8] :picture ? picture[1] : null} className={ missionsDone[1] ? "M0" :"MImg"} alt="Breeding Season Mission 2" />
                    <p className={"MissionCardsArea__Points"}>For {missionCards[1].first}P</p>
                </div>

                <div onClick={clickable[2].toComplete ? () => { handleCompleted(2) } : null} className={clickable[2].toComplete ? "MissionCardsArea__Mission MissionCardsArea__Mission__M3 MissionCardsArea__Mission--Clikable" : "MissionCardsArea__Mission MissionCardsArea__Mission__M3"} >
                    <p className={"MissionCardsArea__Amount"}>{missionCards[2][3][0][1]} *</p>
                    <img src={missionsDone[2] ? numberImg.mission[8] : picture ? picture[2] : null} className={ missionsDone[2] ? "M0" :"MImg"} alt="Breeding Season Mission 3" />
                    <p className={"MissionCardsArea__Points"}>For {missionCards[2].first}P</p>
                </div>

            </div>}
        </div>)
}

export default MissionCards