import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../../GameContext'
import './index.sass'

function OptionCards() {

    const { InitialTurnCards, NextCards, setChoice } = useContext(GameContext)

    const handlePicked = number => {

        const resource = NextCards ? NextCards[number].B : InitialTurnCards[number].B
        const rocks = NextCards ? NextCards[number].A : InitialTurnCards[number].A
        console.log(resource, rocks)
        setChoice({ resource, rocks })
    }

    return (
        <div className="TurnArea game__TurnCards">
            <div className="TurnArea__selection" data-value="1" onClick={() => handlePicked(1)}>
                <div className="TurnArea__Penguin"> PENGUIN NUMBER: {NextCards ? NextCards[1].A : InitialTurnCards[1].A}</div>
                <div className="TurnArea__Resource"> RESOURCE: {NextCards ? NextCards[2].B : InitialTurnCards[2].B} </div>
            </div>

            <div className="TurnArea__selection" data-value="2" onClick={() => handlePicked(2)}>
                <div className="TurnArea__Pengui" > PENGUIN NUMBER: {NextCards ? NextCards[2].A : InitialTurnCards[2].A}</div>
                <div className="TurnArea__Resource"> RESOURCE: {NextCards ? NextCards[3].B : InitialTurnCards[3].B}</div>
            </div>

            <div className="TurnArea__selection" data-value="3" onClick={() => handlePicked(3)}>
                <div className="TurnArea__Pengui"> PENGUIN NUMBER: {NextCards ? NextCards[3].A : InitialTurnCards[3].A}</div>
                <div className="TurnArea__Resource"> RESOURCE: {NextCards ? NextCards[1].B : InitialTurnCards[1].B}</div>
            </div>

        </div>)
}

export default OptionCards