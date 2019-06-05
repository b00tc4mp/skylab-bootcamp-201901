import React, { Component } from 'react'
import './index.scss'
import logic from '../../logic';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class GameDetail extends Component {
    state = {
        result: null,
        isFaved: false
    }

    async componentDidMount() {
        try {
            const { user, match: { params: { id } } } = this.props
            const result = await logic.retrieveGameById(id)
            this.setState({ user, result })
        } catch (error) {
            this.props.history.push('/error')
        }
    }

    async componentWillReceiveProps(props) {

        try {
            const { user, match: { params: { id } } } = props
            const result = await logic.retrieveGameById(id)
            this.setState({ user, result })
        } catch (error) {
            this.props.history.push('/error')

        }

    }

    handleToggleFavs = async (event) => {
        event.preventDefault()
        const { result: { id }, isFaved } = this.state
        const { token } = this.props
        const { toggleFavs } = this.props
        await toggleFavs(token, id)
        this.setState({ isFaved: !isFaved })



    }

    downloadFile = (e, file) => {
        e.preventDefault()

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
                    <a href={result.gameFile} >
                        <button>Download</button>
                    </a>
                    {user && (isFaved ? < button onClick={handleToggleFavs}>-</button> : <button onClick={handleToggleFavs}>+</button>)}
                    {!user && <Link to="/login"><button>Log In to add Favs</button></Link>}
                    <p>{result.description}</p>
                </div>
            }
        </div>

    }

}
export default withRouter(GameDetail)