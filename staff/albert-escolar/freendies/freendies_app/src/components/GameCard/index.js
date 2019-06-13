import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

class GameCard extends Component {
    state = {}

    componentDidMount(){
        const { title, genre, image, description, id } = this.props
        this.setState({title, genre, image, description, id})
    }

    componentWillReceiveProps(props){
        const { title, genre, image, description, id } = props
        this.setState({title, genre, image, description, id})

    }


    render() {

        const { title, genre, image, description, id } = this.props

        return <div className="GameCard">
            <Link className="GameCard__Subtitle" to={`/game/${id}`} key={id}>
                <img className="GameCard__img" src={image} />
                <p className="GameCard__space" >{title}</p>
                <p className="GameCard__space">{genre}</p>

            </Link>
        </div>




    }

}

export default GameCard