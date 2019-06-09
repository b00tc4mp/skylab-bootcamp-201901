import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import Logo from "../../Logo"
import { GameContext } from '../../GameContext'

function Results({newGame, history }) {

    const { results } = useContext(GameContext)

    console.log(results)

    return <section className="results">
        <Logo sizeX={"20%"} sizeY={"100%"} main={true} />
        <h2>These are your results!</h2>
        <button onClick={() => newGame()}>Play Again!</button>
        <button onClick={() => history.push('/home') }>Go Home</button>

    </section>
}

export default withRouter(Results)