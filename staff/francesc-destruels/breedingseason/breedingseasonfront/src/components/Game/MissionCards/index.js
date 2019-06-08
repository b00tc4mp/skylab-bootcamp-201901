import React, { useContext, useState } from 'react'
import './index.sass'

import { GameContext } from "../../GameContext"

function MissionCards() {

    const { missionCards, missionsDone, puntuation } = useContext(GameContext)

    let { OneEggNestAmount, TwoEggNestAmount, ThreeEggNestAmount, FourEggNestAmount, SecurityLvL, ToolsUsed, missionCards:UserMissionCards } = puntuation
    //Handle Fullfill missions

    return (
        <div  className="Game__MissionCards" >
            {missionCards && <div className="MissionCardsArea">
                <div className="MissionCardsArea__Mission" > Mission 1:<br /><br />{`${missionCards[0][1]}`}<br /><br /> {`${missionCards[0].first}`} Points <br />Done: {`${missionsDone[0]}`}</div>
                <div className="MissionCardsArea__Mission" > Mission 2:<br /><br />{`${missionCards[1][1]}`}<br /><br /> {`${missionCards[1].first}`} Points <br />Done: {`${missionsDone[1]}`}</div>
                <div className="MissionCardsArea__Mission" > Mission 3:<br /><br />{`${missionCards[2][1]}`}<br /><br /> {`${missionCards[2].first}`} Points <br />Done: {`${missionsDone[2]}`}</div>
            </div>}
        </div>)
}

export default MissionCards