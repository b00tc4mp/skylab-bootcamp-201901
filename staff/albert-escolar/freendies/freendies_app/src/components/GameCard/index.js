import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class GameCard extends Component {
    state = {}

    render() {

        const { title, genre, image, id } = this.props

        return <div>

            <Link to={`/game/${id}`} key={id}>
                <img src={image} />
                <div>
                    <p>{title}</p>
                </div>
            </Link>
            <p>{genre}</p>
        </div>



    }

}

export default GameCard