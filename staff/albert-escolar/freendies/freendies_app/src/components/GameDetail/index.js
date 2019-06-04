import React, { Component } from 'react'
import './index.scss'
import logic from '../../logic';
import { Link } from 'react-router-dom'


class GameDetail extends Component {
    state = {
        result: null
    }

    async componentDidMount() {
        const { user, match: { params: { id } } } = this.props
        const result = await logic.retrieveGameById(id)
        this.setState({ user, result })
    }

    async componentWillReceiveProps(props) {
        const { user, match: { params: { id } } } = props
        const result = await logic.retrieveGameById(id)
        this.setState({ user, result })

    }

    render() {
        const { user, result } = this.state
        console.log(this.props)
        return <div>
            {result &&
                <div>
                    <h3>{result.title}</h3>
                    <img src={result.images[0]} />
                    <p>{result.title}</p>
                    <a href={result.gameFile} download>Download</a>
                    {user && < button > add Favorites</button>}
                    {!user && <Link to="/login"><button>Log In to add Favs</button></Link>}
                    <p>{result.description}</p>
                </div>
            }
        </div>

    }

}
export default GameDetail