import React, { Component } from 'react'
import './index.scss'
import logic from '../../logic';
import { Link } from 'react-router-dom'


class GameDetail extends Component {
    state = {
        result: null,
        isFaved: false
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

    handleToggleFavs = async (event) => {
        event.preventDefault()
        const {result: { id }, isFaved } = this.state
        const{token}=this.props
        const { toggleFavs } = this.props
        await toggleFavs(token, id)
        this.setState({isFaved:!isFaved})



    }

    downloadFile = (e, file) => {
        e.preventDefault()
        console.log(file)
    }


    render() {
        const { user, result, isFaved } = this.state
        const { handleToggleFavs } = this
        return <div>
            {result &&
                <div>
                    <h3>{result.title}</h3>
                    <img src={result.images[0]} />
                    <p>{result.title}</p>
                    <p>{result.genre}</p>
                    <button onClick={(event) => this.downloadFile(event, result.gameFile)} download>Download</button>
                    {user && (isFaved ? < button onClick={handleToggleFavs}>-</button> : <button onClick={handleToggleFavs}>+</button>)}
                    {!user && <Link to="/login"><button>Log In to add Favs</button></Link>}
                    <p>{result.description}</p>
                </div>
            }
        </div>

    }

}
export default GameDetail