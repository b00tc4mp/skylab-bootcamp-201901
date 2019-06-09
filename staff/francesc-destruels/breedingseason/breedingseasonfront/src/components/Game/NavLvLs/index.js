import React, { useContext, useState, useEffect } from 'react'
import logic from '../../../logic'
import './index.sass'

import { GameContext } from "../../GameContext"

function NavLvLs({ send }) {

    const { puntuation, setPuntuation, ActionToUse, setActionUsed, ActionUsed, setActionTurn } = useContext(GameContext)
    const { OneEggNestLvL, TwoEggNestLvL, ThreeEggNestLvL, FourEggNestLvL, ToolsUsed, StrikeLvL, puntuationSchema } = puntuation

    const [clickable, setClickable] = useState(false)

    useEffect(() => {
        if (!ActionToUse || ActionToUse.resource !== "upgrade" || ActionUsed) {
            setClickable([false, false, false, false])
            return
        }


        setClickable([
            logic.__isUpgradeAvailable__(OneEggNestLvL, puntuationSchema.OneEggNestLvL),
            logic.__isUpgradeAvailable__(TwoEggNestLvL, puntuationSchema.TwoEggNestLvL),
            logic.__isUpgradeAvailable__(ThreeEggNestLvL, puntuationSchema.ThreeEggNestLvL),
            logic.__isUpgradeAvailable__(FourEggNestLvL, puntuationSchema.FourEggNestLvL)])


    }, [ActionToUse])

    const handleClick = (where) => {
        console.log(`Clickaste aqui wey! ${where}`)
        setActionTurn({ row: 0, column: 0, resource: ActionToUse.resource, nest: where })
        setActionUsed(true)
        setClickable([false, false, false, false])

        switch (where) {
            case "One":
                setPuntuation({ ...puntuation, ...puntuation[`OneEggNestLvL`]++ })
                break
            case "Two":
                setPuntuation({ ...puntuation, ...puntuation[`TwoEggNestLvL`]++ })
                break
            case "Three":
                setPuntuation({ ...puntuation, ...puntuation[`ThreeEggNestLvL`]++ })
                break
            case "Four":
                setPuntuation({ ...puntuation, ...puntuation[`FourEggNestLvL`]++ })
                break
            default:
                break
        }
    }

    return (
        <div className="Game__NavLvL NavLvL">
            <div className={clickable[0] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[0] ? () => { handleClick("One") } : null}>
                <h4 className={"NavLvL__Element"}>1Egg <br /> Nest</h4>
                <p className={"NavLvL__Level"}>{OneEggNestLvL}/1</p>
            </div>
            <div className={clickable[1] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[1] ? () => { handleClick("Two") } : null}>
                <h4 className={"NavLvL__Element"}>2Egg <br /> Nest</h4>
                <p className={"NavLvL__Level"}>{TwoEggNestLvL}/2</p>
            </div>
            <div className={clickable[2] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[2] ? () => { handleClick("Three") } : null}>
                <h4 className={"NavLvL__Element"}>3Egg <br /> Nest</h4>
                <p className={"NavLvL__Level"}>{ThreeEggNestLvL}/3</p>
            </div>
            <div className={clickable[3] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[3] ? () => { handleClick("Four") } : null}>
                <h4 className={"NavLvL__Element"}>4Egg <br /> Nest</h4>
                <p className={"NavLvL__Level"}>{FourEggNestLvL}/3</p>
            </div>
            <div className="NavLvL__Points NavLvL__Tool">
                <h4 className={"NavLvL__Element"}>Tools</h4>
                <p className={"NavLvL__Level"}>{ToolsUsed}</p>
            </div>
            <div className={StrikeLvL === 2 ? 'NavLvL__Points NavLvL--Danger' : "NavLvL__Points"}>
                <h4 className={"NavLvL__Element"}>Strikes</h4>
                <p className={"NavLvL__Level"}>{StrikeLvL}</p>
            </div>
        </div>)
}

export default NavLvLs