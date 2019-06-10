import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class GameCard extends Component {
    state = {}

    render() {

        const { title, genre, image, description, id } = this.props

        return <Link className="GameCard__Subtitle" to={`/game/${id}`} key={id}>
            <img className="GameCard__img" src={image} />

            <p className="GameCard__space GameCard__bold">{title}</p>
            <p className="GameCard__space">{genre}</p>
        </Link>




    }

}

export default GameCard