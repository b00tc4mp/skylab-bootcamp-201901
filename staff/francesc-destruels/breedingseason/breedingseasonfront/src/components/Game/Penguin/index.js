import React, { useContext, useState, useEffect } from 'react'
import logic from '../../../logic'
import numberImg from '../img/index'
import './index.sass'

import { GameContext } from "../../GameContext"

function Penguin({ position }) {

    const { NumberToUse, setMap, Map, setPuntuation, ActionToUse, ActionUsed, setActionTurn, NumberUsed, setActionUsed, setNumberUsed, setPenguinTurn, puntuation } = useContext(GameContext)
    const [Clickable, setClickable] = useState(false)
    const [Actionable, setActionable] = useState(false)
    const [penguinImg, setPenguinImg] = useState(null)

    useEffect(() => {

        const toCheck = Map[position[0]][position[1]]
        const number = Map[position[0]][position[1]][1]

        switch (toCheck[0]) {
            case 0:
                setPenguinImg(numberImg.basic)
                break
            case 1:
                if (toCheck[2] === false) setPenguinImg(numberImg.OneEgg[number -1])
                else setPenguinImg(numberImg.OneHatch[number -1])
                break
            case 2:
                if (toCheck[2] === false) setPenguinImg(numberImg.TwoEgg[number -1])
                else setPenguinImg(numberImg.TwoHatch[number -1])
                break
            case 3:
                if (toCheck[2] === false) setPenguinImg(numberImg.ThreeEgg[number -1])
                else setPenguinImg(numberImg.ThreeHatch[number -1])
                break
            case 4:
                if (toCheck[2] === false) setPenguinImg(numberImg.FourEgg[number -1])
                else setPenguinImg(numberImg.FourHatch[number -1])
                break
        }

    }, [NumberUsed, Map])


    useEffect(() => {
        if (!NumberToUse) return

        setClickable(logic.__isBreedable__(Map, position, NumberToUse.rocks))

    }, [NumberToUse])


    const handleClick = () => {
        setPuntuation({ ...puntuation, ...puntuation.OneEggNestAmount++ })

        setPenguinTurn({ where: [position], map: [(Map[position[0]][position[1]][0] = 1), (Map[position[0]][position[1]][1] = NumberToUse.rocks), Map[position[0]][position[1]][2]] })
        setNumberUsed(true)
    }

    useEffect(() => {

        setClickable(false)

    }, [NumberUsed])

    useEffect(() => {
        if (!ActionToUse) return setActionable(false)

        setActionable(logic.__isUsable__(Map, position, ActionToUse.resource))

    }, [ActionToUse])

    const handleAction = () => {

        switch (ActionToUse.resource) {
            case "love":
                setMap({ ...Map, ...Map[position[0]][position[1]][0]++ })
                switch (Map[position[0]][position[1]][0]) {
                    case 2:
                        setPuntuation({ ...puntuation, ...puntuation.OneEggNestAmount-- })
                        setPuntuation({ ...puntuation, ...puntuation.TwoEggNestAmount++ })
                        break
                    case 3:
                        setPuntuation({ ...puntuation, ...puntuation.TwoEggNestAmount-- })
                        setPuntuation({ ...puntuation, ...puntuation.ThreeEggNestAmount++ })
                        break
                    case 4:
                        setPuntuation({ ...puntuation, ...puntuation.ThreeEggNestAmount-- })
                        setPuntuation({ ...puntuation, ...puntuation.FourEggNestAmount++ })
                        break
                }
                break
            case "pick":
                setPuntuation({ ...puntuation, ...puntuation.ToolsUsed++ })
                setMap({ ...Map, ...Map[position[0]][position[1]][1]++ })
                break
            case "glue":
                setPuntuation({ ...puntuation, ...puntuation.ToolsUsed++ })
                setMap({ ...Map, ...Map[position[0]][position[1]][1]-- })
                break
            default:
                break
        }

        setActionTurn({ row: [position[0]], column: [position[1]], resource: ActionToUse.resource, nest: "" })
        setActionUsed(true)
        setActionable(false)

    }

    useEffect(() => {

        setActionable(false)

    }, [ActionUsed])

    return (
        <div className={`P${position[0]}${position[1]}`}>
            {Map && <div className={Clickable ? `penguinMap__penguin penguinMap__penguin--Clickable` : Actionable ? `penguinMap__penguin penguinMap__penguin--Actionable` : `penguinMap__penguin`} onClick={Clickable ? () => handleClick : Actionable && !ActionUsed ? () => handleAction : null}>
                <img src={penguinImg} className="penguinMap__penguin--img" onClick={Clickable ? () => handleClick() : Actionable && !ActionUsed ? () => handleAction() : null} alt="Breeding Season Logo" />
            </div>}
        </div>
    )
}

export default Penguin