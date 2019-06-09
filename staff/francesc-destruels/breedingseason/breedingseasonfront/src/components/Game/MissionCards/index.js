import React, { useContext, useState, useEffect } from 'react'
import './index.sass'
import logic from '../../../logic'
import numberImg from '../img/index'

import { GameContext } from "../../GameContext"

function MissionCards() {

    const { missionCards, setMissionsDone, missionsDone, puntuation, Map, setMap } = useContext(GameContext)

    const [clickable, setClickable] = useState([{ toComplete: false, toHatch: [], type: "" }, { toComplete: false, toHatch: [], type: "" }, { toComplete: false, toHatch: [], type: "" }])

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
            } else {}
        }

        setClickable([{ toComplete: false, toHatch: [] }, { toComplete: false, toHatch: [] }, { toComplete: false, toHatch: [] }])
    }

    return (
        <div className="Game__MissionCards" >
            {missionCards && <div className="MissionCardsArea">
                <div onClick={clickable[0].toComplete ? () => { handleCompleted(0) } : null} className={clickable[0].toComplete ? "MissionCardsArea__Mission MissionCardsArea__Mission--Clikable" : "MissionCardsArea__Mission"} > Mission 1:<br /><br />{`${missionCards[0][1]}`}<br /><br /> {`${missionCards[0].first}`} Points <br />Done: {`${missionsDone[0]}`}</div>
                <div onClick={clickable[1].toComplete ? () => { handleCompleted(1) } : null} className={clickable[1].toComplete ? "MissionCardsArea__Mission MissionCardsArea__Mission--Clikable" : "MissionCardsArea__Mission"} > Mission 2:<br /><br />{`${missionCards[1][1]}`}<br /><br /> {`${missionCards[1].first}`} Points <br />Done: {`${missionsDone[1]}`}</div>
                <div onClick={clickable[2].toComplete ? () => { handleCompleted(2) } : null} className={clickable[2].toComplete ? "MissionCardsArea__Mission MissionCardsArea__Mission--Clikable" : "MissionCardsArea__Mission"} > Mission 3:<br /><br />{`${missionCards[2][1]}`}<br /><br /> {`${missionCards[2].first}`} Points <br />Done: {`${missionsDone[2]}`}</div>
            </div>}
        </div>)
}

export default MissionCards