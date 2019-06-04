import React, { useContext, useState } from 'react'
import './index.sass'

import { GameContext } from "../../../GameContext"

function MissionCards() {

    return (
        <div className="MissionCardsArea game__MissionCards">
            <div className="MissionCardsArea__Mission" data-value="1"> Mission Card 1</div>
            <div className="MissionCardsArea__Mission" data-value="2"> Mission Card 2</div>
            <div className="MissionCardsArea__Mission" data-value="3"> Mission Card 3</div>
        </div>)
}

export default MissionCards