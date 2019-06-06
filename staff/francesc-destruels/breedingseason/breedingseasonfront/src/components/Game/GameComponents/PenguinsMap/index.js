import React, { useContext } from 'react'
import Penguin from '../Penguin'

import { GameContext } from "../../../GameContext"
import './index.sass'

function PenguinsMap({ send }) {

    const { PenguinTurn, ActionToUse, setActionUsed, ActionUsed, setActionTurn, NumberUsed } = useContext(GameContext)

    const handleSecurity = number => {

        console.log(`Increased security on Row ${number}`)
        setActionUsed(true)
    }

    return (
        <div className="penguinMap game__Map">
            <div className="penguinMap__penguinRow Row1" data-value="1">
                <Penguin position={[1, 0]} />
                <Penguin position={[1, 1]} />
                <Penguin position={[1, 2]} />
                <Penguin position={[1, 3]} />
                <Penguin position={[1, 4]} />
                <Penguin position={[1, 5]} />
                <Penguin position={[1, 6]} />
                <Penguin position={[1, 7]} />
                <Penguin position={[1, 8]} />
                <button onClick={NumberUsed && ActionToUse && !ActionUsed && ActionToUse.resource === "security" ? () => handleSecurity(1) : null} >Security Here!</button>
            </div>

            <div className="penguinMap__penguinRow Row2" data-value="2">
                <Penguin position={[2, 0]} />
                <Penguin position={[2, 1]} />
                <Penguin position={[2, 2]} />
                <Penguin position={[2, 3]} />
                <Penguin position={[2, 4]} />
                <Penguin position={[2, 5]} />
                <Penguin position={[2, 6]} />
                <Penguin position={[2, 7]} />
                <Penguin position={[2, 8]} />
                <button onClick={NumberUsed && ActionToUse && !ActionUsed && ActionToUse.resource === "security" ? () => handleSecurity(2) : null} >Security Here!</button>
            </div>

            <div className="penguinMap__penguinRow Row3" data-value="3">
                <Penguin position={[3, 0]} />
                <Penguin position={[3, 1]} />
                <Penguin position={[3, 2]} />
                <Penguin position={[3, 3]} />
                <Penguin position={[3, 4]} />
                <Penguin position={[3, 5]} />
                <Penguin position={[3, 6]} />
                <Penguin position={[3, 7]} />
                <button onClick={NumberUsed && ActionToUse && !ActionUsed && ActionToUse.resource === "security" ? () => handleSecurity(3) : null} >Security Here!</button>
            </div>

            <div className="penguinMap__penguinRow Row4" data-value="4">
                <Penguin position={[4, 0]} />
                <Penguin position={[4, 1]} />
                <Penguin position={[4, 2]} />
                <Penguin position={[4, 3]} />
                <Penguin position={[4, 4]} />
                <Penguin position={[4, 5]} />
                <Penguin position={[4, 6]} />
                <Penguin position={[4, 7]} />
                <button onClick={NumberUsed && ActionToUse && !ActionUsed && ActionToUse.resource === "security" ? () => handleSecurity(4) : null} >Security Here!</button>
            </div>

            <div>
                <button onClick={PenguinTurn ? () => send() : () => { "Nothing to send" }}>Send</button>
                <button onClick={() => send()}>Strike!</button>
                </div>
        </div>)
}

export default PenguinsMap