import React, { useContext, useState } from 'react'
import './index.sass'

import { GameContext } from "../../../GameContext"

function MissionCards() {

    const { missionCards, missionsDone, puntuation } = useContext(GameContext)

    let { OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount, SecurityLvL, ToolsUsed, missionCards:UserMissionCards } = puntuation
    //Handle Fullfill missions

    return (
        <div >
            {missionCards && <div className="MissionCardsArea">
                <div className="MissionCardsArea__Mission" > Mission Card 1: <br />{`${missionCards[0][1]} for ${missionCards[0].first} points.`} <br />{`Done: ${missionsDone[0]}`}</div>
                <div className="MissionCardsArea__Mission" > Mission Card 2: <br />{`${missionCards[1][1]} for ${missionCards[1].first} points.`} <br />{`Done: ${missionsDone[1]}`}</div>
                <div className="MissionCardsArea__Mission" > Mission Card 3: <br />{`${missionCards[2][1]} for ${missionCards[2].first} points.`} <br />{`Done: ${missionsDone[2]}`}</div>
            </div>}
        </div>)
}

export default MissionCards