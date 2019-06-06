import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../../GameContext'
import './index.sass'

function OptionCards() {

    const { InitialTurnCards, NextCards, ActionUsed, NumberUsed, setNumberToUse, setActionToUse } = useContext(GameContext)

    const [number, setNumber] = useState(null)

    useEffect(() => {
        setNumber(null)
    }, [NextCards])

    const handlePicked = picked => {

        const rocks = NextCards ? NextCards[picked].A : InitialTurnCards[picked].A

        setNumberToUse({ rocks })

        setNumber(NextCards ? picked : picked -1)

        setActionToUse(null)
    }

    const handleAction = picked => {
        const resource = NextCards ? NextCards[picked].B : InitialTurnCards[picked].B
        setActionToUse({ resource })
    }

    return (
        <div className="TurnArea">
            <div className={number === 0  && !NumberUsed ? "TurnArea__Selection--Selected" : "TurnArea__Selection"} onClick={number !== 0 && !NumberUsed ? () => handlePicked(NextCards ? 0 : 1) : null}>
                <div className="TurnArea__Penguin"> PENGUIN NUMBER: {NextCards ? NextCards[0].A : InitialTurnCards[1].A}</div>
                <div className={number === 0 && !ActionUsed && NumberUsed ?  "TurnArea__Resource--toUse" : "TurnArea__Resource"} onClick={number === 0 && !ActionUsed && NumberUsed ? () => handleAction(NextCards ? 1 : 3) : null}> RESOURCE: {NextCards ? NextCards[1].B : InitialTurnCards[3].B} </div>
            </div>

            <div className={number === 1 && !NumberUsed ? "TurnArea__Selection--Selected" : "TurnArea__Selection"} onClick={number !== 1 && !NumberUsed ? () => handlePicked(NextCards ? 1 : 2) : null}>
                <div className="TurnArea__Pengui" > PENGUIN NUMBER: {NextCards ? NextCards[1].A : InitialTurnCards[2].A}</div>
                <div className={number === 1 && !ActionUsed && NumberUsed ?  "TurnArea__Resource--toUse" : "TurnArea__Resource"} onClick={number === 1 && !ActionUsed && NumberUsed ? () => handleAction(NextCards ? 2 : 1) : null}> RESOURCE: {NextCards ? NextCards[2].B : InitialTurnCards[1].B}</div>
            </div>

            <div className={number === 2 && !NumberUsed ? "TurnArea__Selection--Selected" : "TurnArea__Selection"} onClick={number !== 2 && !NumberUsed ? () => handlePicked(NextCards ? 2 : 3) : null}>
                <div className="TurnArea__Pengui"> PENGUIN NUMBER: {NextCards ? NextCards[2].A : InitialTurnCards[3].A}</div>
                <div className={number === 2 && !ActionUsed && NumberUsed ?  "TurnArea__Resource--toUse" : "TurnArea__Resource"} onClick={number === 2 && !ActionUsed && NumberUsed ? () => handleAction(NextCards ? 0 : 2) : null}> RESOURCE: {NextCards ? NextCards[0].B : InitialTurnCards[2].B}</div>
            </div>

        </div>)
}

export default OptionCards