import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class GameCard extends Component {
    state = {}


    componentDidMount() {
        const { genre, title, image, id } = this.props
        this.setState({ genre, title, image, id })
    }

    componentWillReceiveProps(props) {
        const { genre, title, image, id } = props
        this.setState({ genre, title, image, id })


    }


    render() {

        const { title, genre, image, id } = this.state

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