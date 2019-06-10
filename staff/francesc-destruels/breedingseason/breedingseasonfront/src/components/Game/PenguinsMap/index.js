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
            // logic.__isSecurityAvailable__(4, SecurityLvLAmounts, SecurityLvLPoints)])


    }, [ActionToUse, ActionUsed])

    const handleSecurity = number => {

        console.log(ActionToUse, number, puntuation.SecurityLvL[number])
        console.log(`Increased security on Row ${number}`)
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

            // {/* <div className="penguinMap__penguinRow4" data-value="4">
            //     <Penguin position={[4, 0]} />
            //     <Penguin position={[4, 1]} />
            //     <Penguin position={[4, 2]} />
            //     <Penguin position={[4, 3]} />
            //     <Penguin position={[4, 4]} />
            //     <Penguin position={[4, 5]} />
            //     <Penguin position={[4, 6]} />
            //     <div className={clickable[3] ? "penguinMap__Foc penguinMap__Foc--Clickable" : "penguinMap__Foc"}>
            //         {/* <p>LvL: {puntuation.SecurityLvL[4]}</p> */}
            //         {/* <img height="200vp" src={foc} onClick={clickable[3] ? () => handleSecurity(1) : null} />
            //     </div>
            // // // </div> */} */}
export default PenguinsMap