import React, { Component } from 'react'
import './index.scss'
import logic from '../../logic';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class GameDetail extends Component {
    state = {
        result: null,
        isFaved: false,
        favoriteGames: []
    }

    async componentDidMount() {
        try {
            const { favoriteGames, match: { params: { id } } } = this.props
            const result = await logic.retrieveGameById(id)
            this.setState({ result , favoriteGames})
            if (favoriteGames.includes(id)) {
                this.setState({isFaved: true})
            }
        } catch (error) {
            this.props.history.push('/error')
        }
    }

    async componentWillReceiveProps(props) {

        try {
            const { favoriteGames, match: { params: { id } } } = props
            const result = await logic.retrieveGameById(id)
            this.setState({ result, favoriteGames })
            if (favoriteGames.includes(id)) {
                this.setState({isFaved: true})
            }

        } catch (error) {
            this.props.history.push('/error')

        }

    }

    handleToggleFavs = async (event) => {
        event.preventDefault()
        const { result: { id }, isFaved } = this.state
        const { toggleFavs } = this.props
        await toggleFavs(id)
        this.setState({ isFaved: !isFaved })



    }


    render() {
        const { user, result, isFaved, favoriteGames } = this.state
        const { handleToggleFavs } = this
        // const {favoriteGames}=this.props
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
                    {(isFaved ? < button onClick={handleToggleFavs}>-</button> : <button onClick={handleToggleFavs}>+</button>)}
                    {!favoriteGames && <Link to="/login"><button>Log In to add Favs</button></Link>}
                    <p>{result.description}</p>
                </div>
            }
        </div>

    }

}
export default withRouter(GameDetail)