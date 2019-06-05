import React, { useContext, useState } from 'react'

import { GameContext } from "../../../GameContext"

function Penguin() {

    const { InitialTurnCards, NextCards, setChoice, Choice } = useContext(GameContext)
   const [number, setNumber] = useState(null)

    return (
        <div onClick={ number ? () => {console.log("Number already picked")} : Choice ? () => {setNumber(Choice.rocks || 0)} : () => {console.log("Make your Choice first!")}}>
        <p>{number ? number : "<3" }</p>
        <img src={number? "https://cdn2.iconfinder.com/data/icons/easter-egg-filled-outline/64/egg_nest-128.png" : "http://aux.iconspalace.com/uploads/16773218951229302608.png"} alt="Breeding Season Logo" height="55px" width="55px"/>
        </div>
        )
}

export default Penguin