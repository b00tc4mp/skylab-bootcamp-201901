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
            this.setState({ result, favoriteGames })
            if (favoriteGames.includes(id)) {
                this.setState({ isFaved: true })
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
                this.setState({ isFaved: true })
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
                <div className="gameDetail">
                    <h2 className="gameDetail__title">{result.title}</h2>
                    <img className="gameDetail__img" classname src={result.images[0]} />
                    <div className="gameDetail__iconsContainer">
                        <a href={result.gameFile} className="gameDetail__icons fas fa-download" />
                        {(isFaved ? < a className="gameDetail__icons fas fa-star" onClick={handleToggleFavs} /> : <a className="gameDetail__icons far fa-star" onClick={handleToggleFavs} />)}
                        {!favoriteGames && <Link to="/login"><button>Log In to add Favs</button></Link>}
                    </div>
                    <p className="gameDetail__genreDetail">{result.genre}</p>
                    <p className= "gameDetail__descriptionBox">{result.description}</p>
                </div>
            }
        </div>

    }

}
export default withRouter(GameDetail)