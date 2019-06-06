import React, { useContext, useState, useEffect } from 'react'
import logic from '../../../../logic'

import { GameContext } from "../../../GameContext"

function Penguin({ position }) {

    const { NumberToUse, Map, PenguinTurn, ActionToUse, ActionUsed, setActionTurn, NumberUsed, setActionUsed, setNumberUsed, setPenguinTurn } = useContext(GameContext)
    const [Clickable, setClickable] = useState(false)
    const [Actionable, setActionable] = useState(false)
    const [Eggs, setEggs] = useState(false)

    useEffect(() => {
        if (!NumberToUse) return

        setClickable(logic.__isBreedable__(Map, position, NumberToUse.rocks))

    }, [NumberToUse])


    useEffect(() => {
        if (!ActionToUse) return

        setActionable(logic.__isLoveable__(Map, position, ActionToUse.resource))
        
    }, [ActionToUse])


    useEffect(() => {

        setClickable(false)
        
    }, [NumberUsed])

    useEffect(() => { }, [PenguinTurn])

    const handleClick = () => {

        setPenguinTurn({ where: [position], map: [Map[position[0]][position[1]][0]++, (Map[position[0]][position[1]][1] + NumberToUse.rocks), Map[position[0]][position[1]][3]] })
        setNumberUsed(true)
    }


    const handleAction = () => {

        console.log("Making Love", Map[position[0]][position[1]] )

        setActionTurn({ row: [position[0]], column: [position[1]], resource: ActionToUse.resource, nest: "" })
        setActionUsed(true)
    }

    return (
        <div>
            {Map && <div onClick={Clickable && !NumberUsed ? () => handleClick() : Actionable && !ActionUsed ? () => handleAction() : null }>
                <p>{PenguinTurn && PenguinTurn.where[0][0] === position[0] && PenguinTurn.where[0][1] === position[1] ? PenguinTurn.map[1] : Map[position[0]][position[1]][1] !== 0 ? Map[position[0]][position[1]][1] : "<3"}</p>
                <img src={PenguinTurn && PenguinTurn.where[0][0] === position[0] && PenguinTurn.where[0][1] === position[1] ? "https://cdn2.iconfinder.com/data/icons/easter-egg-filled-outline/64/egg_nest-128.png" : "http://aux.iconspalace.com/uploads/16773218951229302608.png"} alt="Breeding Season Logo" height="55px" width="55px" />
            </div>}
        </div>
    )
}

export default Penguin