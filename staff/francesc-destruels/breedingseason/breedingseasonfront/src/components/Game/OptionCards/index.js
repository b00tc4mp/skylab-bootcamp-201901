import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../GameContext'
import './index.sass'
import penguinCard from '../img/PenguinCard.png'
import love from '../img/LoveCard.png'
import pick from '../img/PickCard.png'
import glue from '../img/GlueCard.png'
import upgrade from '../img/UpGradeCard.png'
import security from '../img/SecurityCard.png'

function OptionCards() {

    const { InitialTurnCards, NextCards, ActionUsed, NumberUsed, setNumberToUse, setActionToUse, ActionToUse } = useContext(GameContext)

    const [number, setNumber] = useState(null)

    useEffect(() => {
        setNumber(null)
        setActionToUse(null)
    }, [NextCards])

    const handlePicked = picked => {

        const rocks = NextCards ? NextCards[picked].A : InitialTurnCards[picked].A

        setNumberToUse({ rocks })

        setNumber(NextCards ? picked : picked - 1)
    }

    const handleAction = picked => {
        const resource = NextCards ? NextCards[picked].B : InitialTurnCards[picked].B
        setActionToUse({ resource })

    }

    const Card = NextCards ? NextCards : InitialTurnCards

    return ( // It will be a diferent component in the future
        <div className="TurnArea Game__TurnCards">
            <div className={number === 0 && !NumberUsed && !ActionToUse? "TurnArea__Selection TurnArea__Selection--Selected" : "TurnArea__Selection"} onClick={number !== 0 && !NumberUsed ? () => handlePicked(NextCards ? 0 : 1) : null}>
                <div className="TurnArea__Penguin">
                    <img src={penguinCard} alt="Breeding Season Penguin Card" className="TurnArea__Card" />
                </div>
                <div className={number === 0 && !ActionUsed && NumberUsed && !ActionToUse ? "TurnArea__Resource TurnArea__Resource--toUse" : "TurnArea__Resource"} onClick={number === 0 && !ActionUsed && NumberUsed ? () => handleAction(NextCards ? 1 : 3) : null}>
                     <img src={Card[NextCards? 1 : 3].B === "love" ? love : Card[NextCards? 1 : 3].B === "glue" ? glue : Card[NextCards? 1 : 3].B === "pick" ? pick : Card[NextCards? 1 : 3].B === "upgrade" ? upgrade : security } alt="Breeding Season Resource" className="TurnArea__Card" />
                </div>
            </div>

            <div className={number === 1 && !NumberUsed && !ActionToUse ? "TurnArea__Selection TurnArea__Selection--Selected" : "TurnArea__Selection"} onClick={number !== 1 && !NumberUsed ? () => handlePicked(NextCards ? 1 : 2) : null}>
                <div className="TurnArea__Penguin" >
                    <img src={penguinCard} alt="Breeding Season Penguin Card" className="TurnArea__Card" />
                </div>
                <div className={number === 1 && !ActionUsed && NumberUsed && !ActionToUse ? "TurnArea__Resource TurnArea__Resource--toUse" : "TurnArea__Resource"} onClick={number === 1 && !ActionUsed && NumberUsed ? () => handleAction(NextCards ? 2 : 1) : null}> 
                    <img src={Card[NextCards? 2 : 1].B === "love" ? love : Card[NextCards? 2 : 1].B === "glue" ? glue : Card[NextCards? 2 : 1].B === "pick" ? pick : Card[NextCards? 2 : 1].B === "upgrade" ? upgrade : security } alt="Breeding Season Resource" className="TurnArea__Card" />
                </div>
            </div>

            <div className={number === 2 && !NumberUsed && !ActionToUse? "TurnArea__Selection TurnArea__Selection--Selected" : "TurnArea__Selection"} onClick={number !== 2 && !NumberUsed ? () => handlePicked(NextCards ? 2 : 3) : null}>
                <div className="TurnArea__Penguin">
                    <img src={penguinCard} alt="Breeding Season Penguin Card" className="TurnArea__Card" />
                </div>
                <div className={number === 2 && !ActionUsed && NumberUsed && !ActionToUse? "TurnArea__Resource TurnArea__Resource--toUse" : "TurnArea__Resource"} onClick={number === 2 && !ActionUsed && NumberUsed ? () => handleAction(NextCards ? 0 : 2) : null}>
                    <img src={Card[NextCards? 0 : 2].B === "love" ? love : Card[NextCards? 0 : 2].B === "glue" ? glue : Card[NextCards? 0 : 2].B === "pick" ? pick : Card[NextCards? 0 : 2].B === "upgrade" ? upgrade : security } alt="Breeding Season Resource" className="TurnArea__Card" />
                </div>
            </div>

        </div>)
}

export default OptionCards