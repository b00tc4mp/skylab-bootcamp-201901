import React, { Component } from 'react'
import './index.scss'

class GameCard extends Component {
    state = {}


    componentDidMount() {
        const { genre, title, image,id } = this.props
        this.setState({ genre, title, image,id })
    }

    render() {

        const { title, genre, image,id } = this.state

        return <div id={id}>
            <img src= {image}/>
            <div>
                <p>{title}</p>
                <p>{genre}</p>
            </div>
        </div>



    }

}

export default GameCard