import React, { useContext, useState, useEffect } from 'react'
import logic from '../../../logic'
import './index.sass'

import { GameContext } from "../../GameContext"

function NavLvLs({ send }) {

    const { puntuation, setPuntuation, ActionToUse, setActionUsed, ActionUsed, setActionTurn } = useContext(GameContext)
    const { OneEggNestLvL, TwoEggNestLvL, ThreeEggNestLvL, FourEggNestLvL, ToolsUsed, FishingRodUsed, StrikeLvL, puntuationSchema } = puntuation

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
            logic.__isUpgradeAvailable__(FourEggNestLvL, puntuationSchema.OneEggNestLvL)])


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
            <h4>Levels</h4>
            <div className={clickable[0] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[0] ? () => { handleClick("One") } : null}>
                <p>1Egg Nest</p>
                <p>{OneEggNestLvL}/1</p>
            </div>
            <div className={clickable[1] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[1] ? () => { handleClick("Two") } : null}>
                <p>2Egg Nest</p>
                <p>{TwoEggNestLvL}/2</p>
            </div>
            <div className={clickable[2] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[2] ? () => { handleClick("Three") } : null}>
                <p>3Egg Nest</p>
                <p>{ThreeEggNestLvL}/3</p>
            </div>
            <div className={clickable[3] ? 'NavLvL__Points NavLvL--Clickable' : "NavLvL__Points"} onClick={clickable[0] ? () => { handleClick("Four") } : null}>
                <p>4Egg Nest</p>
                <p>{FourEggNestLvL}/3</p>
            </div>
            <div className="NavLvL__Points">
                <p>Tools</p>
                <p>{ToolsUsed}</p>
            </div>
            <div className="NavLvL__Points" >
                <p>F.Rod</p>
                <p>{FishingRodUsed}/5</p>
            </div>
            <div className={StrikeLvL === 2 ? 'NavLvL__Points NavLvL--Danger' : "NavLvL__Points"}>
                <p>Strikes</p>
                <p>{StrikeLvL}/3 End Game!</p>
            </div>
        </div>)
}

export default NavLvLs