import React, { useContext, useState } from 'react'
import './index.sass'

import { GameContext } from "../../../GameContext"

function OptionCards() {

    return (
        <div className="TurnArea game__TurnCards">
            <div className="TurnArea__selection" data-value="1">
                <div className="TurnArea__Penguin"> PENGUIN NUMBER</div>
                <div className="TurnArea__Resource"> RESOURCE</div>
            </div>

            <div className="TurnArea__selection" data-value="2">
                <div className="TurnArea__Pengui" > PENGUIN NUMBER</div>
                <div className="TurnArea__Resource"> RESOURCE</div>
            </div>

            <div className="TurnArea__selection" data-value="3">
                <div className="TurnArea__Pengui"> PENGUIN NUMBER</div>
                <div className="TurnArea__Resource"> RESOURCE</div>
            </div>

        </div>)
}

export default OptionCards