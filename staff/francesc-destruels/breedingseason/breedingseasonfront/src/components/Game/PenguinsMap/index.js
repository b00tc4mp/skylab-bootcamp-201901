import React, { useContext, useState, useEffect } from 'react'
import Penguin from '../Penguin'
import logic from '../../../logic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { GameContext } from "../../GameContext"
import './index.sass'
import foc from '../img/FOC.png'

function PenguinsMap({ send, leftGame }) {

    const { PenguinTurn, setPenguinTurn, ActionToUse, setActionUsed, ActionUsed, setActionTurn, setPuntuation, puntuation, puntuation: { puntuationSchema: { SecurityLvL: SecurityLvLPoints }, SecurityLvL: SecurityLvLAmounts, StrikeLvL } } = useContext(GameContext)

    const [clickable, setClickable] = useState([false, false, false])

    useEffect(() => {
        if (!ActionToUse || ActionToUse.resource !== "security" || ActionUsed) {
            setClickable([false, false, false])
            return
        }

        setClickable([
            logic.__isSecurityAvailable__(1, SecurityLvLAmounts, SecurityLvLPoints),
            logic.__isSecurityAvailable__(2, SecurityLvLAmounts, SecurityLvLPoints),
            logic.__isSecurityAvailable__(3, SecurityLvLAmounts, SecurityLvLPoints)])

    }, [ActionToUse, ActionUsed])

    const handleSecurity = number => {

        setActionTurn({ row: number, column: 0, resource: ActionToUse.resource, nest: "" })
        setActionUsed(true)
        setPuntuation({ ...puntuation, ...puntuation["SecurityLvL"][number]++ })
    }

    return (
        <div className="penguinMap Game__Map ">
            <div className="penguinMap__penguinRow1" data-value="1">
                <Penguin position={[1, 0]} />
                <Penguin position={[1, 1]} />
                <Penguin position={[1, 2]} />
                <Penguin position={[1, 3]} />
                <Penguin position={[1, 4]} />
                <Penguin position={[1, 5]} />
                <div className={clickable[0] ? "penguinMap__Foc penguinMap__Foc--Clickable" : "penguinMap__Foc"}>
                    <img  className="penguinMap__Foc--img" src={foc} onClick={clickable[0] ? () => handleSecurity(1) : null} />
                    <p className={clickable[0] ? "penguinMap__Level F1--Clickable" : "penguinMap__Level F1"}>*{clickable[0] ? `${SecurityLvLPoints[1][SecurityLvLAmounts[1] +1]}P ${SecurityLvLAmounts[1] +1}/2 Lv` :  `${SecurityLvLPoints[2][SecurityLvLAmounts[1]]}P ${SecurityLvLAmounts[1]}/2 Lv`}  </p>
                </div>
            </div>

            <div className="penguinMap__penguinRow2" data-value="2">
                <Penguin position={[2, 0]} />
                <Penguin position={[2, 1]} />
                <Penguin position={[2, 2]} />
                <Penguin position={[2, 3]} />
                <Penguin position={[2, 4]} />
                <Penguin position={[2, 5]} />
                <div className={clickable[1] ? "penguinMap__Foc penguinMap__Foc--Clickable" : "penguinMap__Foc"}>
                    <img  className="penguinMap__Foc--img" src={foc} onClick={clickable[1] ? () => handleSecurity(2) : null} />
                    <p className={clickable[1] ? "penguinMap__Level F2--Clickable" : "penguinMap__Level F2"}>*{clickable[1] ? `${SecurityLvLPoints[2][SecurityLvLAmounts[2] +1]}P ${SecurityLvLAmounts[2] +1}/3 Lv` :  `${SecurityLvLPoints[2][SecurityLvLAmounts[2]]}P ${SecurityLvLAmounts[2]}/3 Lv`}  </p>
                </div>
            </div>

            <div className="penguinMap__penguinRow3" data-value="3">
                <Penguin position={[3, 0]} />
                <Penguin position={[3, 1]} />
                <Penguin position={[3, 2]} />
                <Penguin position={[3, 3]} />
                <Penguin position={[3, 4]} />
                <Penguin position={[3, 5]} />
                <div className={clickable[2] ? "penguinMap__Foc penguinMap__Foc--Clickable" : "penguinMap__Foc"}>
                    <img className="penguinMap__Foc--img" src={foc} onClick={clickable[2] ? () => handleSecurity(3) : null} />
                    <p className={clickable[2] ? "penguinMap__Level F3--Clickable" : "penguinMap__Level F3"}>*{clickable[2] ? `${SecurityLvLPoints[3][SecurityLvLAmounts[3] +1]}P ${SecurityLvLAmounts[3] +1}/3 Lv` :  `${SecurityLvLPoints[3][SecurityLvLAmounts[3]]}P ${SecurityLvLAmounts[3]}/3 Lv`}  </p>
                </div>
            </div>

            <div className="penguinMap__Buttons">
                <button className={ PenguinTurn? "penguinMap__ButtonA button is-link" :  " penguinMap__ButtonA button is-link is-outlined"  }  disabled={!PenguinTurn} onClick={PenguinTurn ? () => send() : false}>Next Round</button>
                <button  className="penguinMap__ButtonB button is-danger is-outlined" onClick={() => {
                    setPenguinTurn(false)
                    send()
                }}>{StrikeLvL === 0 ? "0 Strikes!" : StrikeLvL === 1 ? "1 Strike!" : "ONLY ONE MORE!" }</button>
                <button  className="penguinMap__ButtonC" onClick={() => {
                    leftGame()
                }}><FontAwesomeIcon icon={faPowerOff} /></button>
            </div>
        </div>)
}

export default PenguinsMap