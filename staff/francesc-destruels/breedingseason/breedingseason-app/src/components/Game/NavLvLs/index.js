import React, { useContext, useState, useEffect } from 'react'
import logic from '../../../logic'
import './index.sass'
import numberImg from '../img/index'

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
                <img src={numberImg.mission[1]} className={"NavLvL__Element E1"} alt="Breeding Season 1EGG Level" />
                <p className={clickable[0] ? "NavLvL__Level L1--Clickable" : "NavLvL__Level L1"}>*{clickable[0] ? `${puntuationSchema.OneEggNestLvL[OneEggNestLvL] +1}P ${OneEggNestLvL +1}/1L v` : `${puntuationSchema.OneEggNestLvL[OneEggNestLvL]}P ${OneEggNestLvL}/1 Lv`}</p>
            </div>
            <div className={clickable[1] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[1] ? () => { handleClick("Two") } : null}>
                <img src={numberImg.mission[2]} className={"NavLvL__Element E2"} alt="Breeding Season 2EGG Level" />
                <p className={clickable[1] ? "NavLvL__Level L2--Clickable" : "NavLvL__Level L2"}>*{clickable[1] ? `${puntuationSchema.TwoEggNestLvL[TwoEggNestLvL +1]}P ${TwoEggNestLvL +1}/2 Lv` : `${puntuationSchema.TwoEggNestLvL[TwoEggNestLvL]}P ${TwoEggNestLvL}/2 Lv`} </p>
            </div>
            <div className={clickable[2] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[2] ? () => { handleClick("Three") } : null}>
                <img src={numberImg.mission[3]} className={"NavLvL__Element E3"} alt="Breeding Season 3EGG Level" />
                <p className={clickable[2] ? "NavLvL__Level L3--Clickable" : "NavLvL__Level L3"}>*{clickable[1] ? `${puntuationSchema.ThreeEggNestLvL[ThreeEggNestLvL +1]}P ${ThreeEggNestLvL +1}/3 Lv` : `${puntuationSchema.ThreeEggNestLvL[ThreeEggNestLvL]}P ${ThreeEggNestLvL }/3 Lv`} </p>
            </div>
            <div className={clickable[3] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[3] ? () => { handleClick("Four") } : null}>
                <img src={numberImg.mission[4]} className={"NavLvL__Element E4"} alt="Breeding Season 4EGG Level" />
                <p className={clickable[3] ? "NavLvL__Level L4--Clickable" : "NavLvL__Level L4"}>*{clickable[1] ? `${puntuationSchema.FourEggNestLvL[FourEggNestLvL +1]}P ${FourEggNestLvL +1}/3 Lv` :  `${puntuationSchema.FourEggNestLvL[FourEggNestLvL]}P ${FourEggNestLvL}/3 Lv`}  </p>
            </div>
            <div className="NavLvL__Points NavLvL__Tool">
                <img src={numberImg.mission[0]} className={"NavLvL__Element ET"} alt="Breeding Season Tool Level" />
                <p className={"NavLvL__Level  LT"}>{ToolsUsed}</p>
            </div>
        </div>)
}

export default NavLvLs