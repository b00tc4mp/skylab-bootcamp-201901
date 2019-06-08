import React, { useContext, useState, useEffect } from 'react'
import logic from '../../../logic'
import penguinFem from '../img/PenguinFem.png'
import nest1Egg from '../img/1EGGNest.png'
import nest1Hatched from '../img/1Hatched.png'
import nest2Egg from '../img/2EGGNest.png'
import nest2Hatched from '../img/2Hatched.png'
import nest3Egg from '../img/3EGGNest.png'
import nest3Hatched from '../img/3Hatched.png'
import nest4Egg from '../img/4EGGNest.png'
import nest4Hatched from '../img/4Hatched.png'
import './index.sass'

import { GameContext } from "../../GameContext"

function Penguin({ position }) {

    const { NextCards, NumberToUse, setMap, Map, PenguinTurn, ActionToUse, ActionUsed, setActionTurn, NumberUsed, setActionUsed, setNumberUsed, setPenguinTurn } = useContext(GameContext)
    const [Clickable, setClickable] = useState(false)
    const [Actionable, setActionable] = useState(false)
    const [penguinImg, setPenguinImg] = useState(null)

    useEffect(() => {

        const toCheck = Map[position[0]][position[1]]

        switch (toCheck[0]) {
            case 0:
                setPenguinImg(penguinFem)
                break
            case 1:
                if (toCheck[2] === false) setPenguinImg(nest1Egg)
                else setPenguinImg(nest1Hatched)
                break
            case 2:
                if (toCheck[2] === false) setPenguinImg(nest2Egg)
                else setPenguinImg(nest2Hatched)
                break
            case 3:
                if (toCheck[2] === false) setPenguinImg(nest3Egg)
                else setPenguinImg(nest3Hatched)
                break
            case 4:
                if (toCheck[2] === false) setPenguinImg(nest4Egg)
                else setPenguinImg(nest4Hatched)
                break
        }


    }, [NumberUsed, Map])


    useEffect(() => {
        if (!NumberToUse) return

        setClickable(logic.__isBreedable__(Map, position, NumberToUse.rocks))

    }, [NumberToUse])


    const handleClick = () => {

        setPenguinTurn({ where: [position], map: [(Map[position[0]][position[1]][0] = 1), (Map[position[0]][position[1]][1] = NumberToUse.rocks), Map[position[0]][position[1]][2]] })
        setNumberUsed(true)
    }

    useEffect(() => {

        setClickable(false)

    }, [NumberUsed])


    useEffect(() => {
        
        console.log(ActionToUse)
        if (!ActionToUse) return setActionable(false)

        setActionable(logic.__isUsable__(Map, position, ActionToUse.resource))

    }, [ActionToUse])


    const handleAction = () => {

        setActionTurn({ row: [position[0]], column: [position[1]], resource: ActionToUse.resource, nest: "" })
        setActionUsed(true)

        switch (ActionToUse.resource) {
            case "love":
                setMap({ ...Map, ...Map[position[0]][position[1]][0]++ })
                break
            case "pick":
                setMap({ ...Map, ...Map[position[0]][position[1]][1]++ })
                break
            case "glue":
                setMap({ ...Map, ...Map[position[0]][position[1]][1]-- })
                break
            default:
                console.log("algo raro pasaaaa")
                break
        }

    }

    return (
        <div className={`P${position[0]}${position[1]}`}>
            {Map && <div className={Clickable ? "penguinMap__penguin--Clickable" : Actionable ?  "penguinMap__penguin--Actionable": null } onClick={Clickable ? () => handleClick() : Actionable && !ActionUsed ? () => handleAction() : null}>
                <p>{Map[position[0]][position[1]][1] !== 0 ? Map[position[0]][position[1]][1] : "<3"}</p>
                <img src={penguinImg} alt="Breeding Season Logo" height="55px" width="55px" />
            </div>}
        </div>
    )
}

export default Penguin