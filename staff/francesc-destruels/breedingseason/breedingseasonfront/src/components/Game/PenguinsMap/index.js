import React, { useContext, useState, useEffect } from 'react'
import Penguin from '../Penguin'
import logic from '../../../logic'

import { GameContext } from "../../GameContext"
import './index.sass'

function PenguinsMap({ send }) {

    const { PenguinTurn,setPenguinTurn, ActionToUse, setActionUsed, ActionUsed, setActionTurn, puntuation, puntuation: { puntuationSchema: { SecurityLvL: SecurityLvLPoints }, SecurityLvL: SecurityLvLAmounts } } = useContext(GameContext)

    const [clickable, setClickable] = useState([false, false, false, false])
    const [augmented, setAugmented] = useState([false, false, false, false])


    useEffect(() => {
        if (!ActionToUse || ActionToUse.resource !== "security" || ActionUsed) {
            setClickable([false, false, false, false])
            setAugmented([false, false, false, false])
            return
        }


        setClickable([
            logic.__isSecurityAvailable__(1, SecurityLvLAmounts, SecurityLvLPoints),
            logic.__isSecurityAvailable__(2, SecurityLvLAmounts, SecurityLvLPoints),
            logic.__isSecurityAvailable__(3, SecurityLvLAmounts, SecurityLvLPoints),
            logic.__isSecurityAvailable__(4, SecurityLvLAmounts, SecurityLvLPoints)])


    }, [ActionToUse])

    const handleSecurity = number => {

        console.log(ActionToUse, number, puntuation.SecurityLvL[number])
        console.log(`Increased security on Row ${number}`)
        setActionTurn({ row: number, column: 0, resource: ActionToUse.resource, nest: "" })
        setActionUsed(true)
        setAugmented([number === 1 ? true : false, number === 2 ? true : false, number === 3 ? true : false, number === 4 ? true : false])
    }

    return (
        <div className="penguinMap Game__Map ">
            <div className="penguinMap__penguinRow" data-value="1">
                <Penguin position={[1, 0]} />
                <Penguin position={[1, 1]} />
                <Penguin position={[1, 2]} />
                <Penguin position={[1, 3]} />
                <Penguin position={[1, 4]} />
                <Penguin position={[1, 5]} />
                <button onClick={clickable[0] ? () => handleSecurity(1) : null} >Security Here!</button>
                <p>LvL: {augmented[0] ? puntuation.SecurityLvL[1] + 1 : puntuation.SecurityLvL[1]}</p>
            </div>

            <div className="penguinMap__penguinRow" data-value="2">
                <Penguin position={[2, 0]} />
                <Penguin position={[2, 1]} />
                <Penguin position={[2, 2]} />
                <Penguin position={[2, 3]} />
                <Penguin position={[2, 4]} />
                <Penguin position={[2, 5]} />
                <button onClick={clickable[1] ? () => handleSecurity(2) : null} >Security Here!</button>
                <p>LvL: {augmented[1] ? puntuation.SecurityLvL[2] + 1 :puntuation.SecurityLvL[2]}</p>
            </div>

            <div className="penguinMap__penguinRow" data-value="3">
                <Penguin position={[3, 0]} />
                <Penguin position={[3, 1]} />
                <Penguin position={[3, 2]} />
                <Penguin position={[3, 3]} />
                <Penguin position={[3, 4]} />
                <Penguin position={[3, 5]} />
                <Penguin position={[3, 6]} />
                <button onClick={clickable[2] ? () => handleSecurity(3) : null} >Security Here!</button>
                <p>LvL: {augmented[2] ? puntuation.SecurityLvL[3] + 1 :puntuation.SecurityLvL[3]}</p>
            </div>

            <div className="penguinMap__penguinRow" data-value="4">
                <Penguin position={[4, 0]} />
                <Penguin position={[4, 1]} />
                <Penguin position={[4, 2]} />
                <Penguin position={[4, 3]} />
                <Penguin position={[4, 4]} />
                <Penguin position={[4, 5]} />
                <Penguin position={[4, 6]} />
                <button onClick={clickable[3] ? () => handleSecurity(4) : null} >Security Here!</button>
                <p>LvL: {augmented[3] ? puntuation.SecurityLvL[4] + 1 :puntuation.SecurityLvL[4]}</p>
            </div>

            <div>
                <button onClick={PenguinTurn ? () => send() : () => { "Nothing to send" }}>Send</button>
                <button onClick={() =>{ 
                    setPenguinTurn(false)
                    send()} }>Strike!</button>
            </div>
        </div>)
}

export default PenguinsMap