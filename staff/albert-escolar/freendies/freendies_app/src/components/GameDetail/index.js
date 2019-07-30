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
            debugger
            const { user, match: { params: { id } } } = this.props
            const result = await logic.retrieveGameById(id)
            this.setState({ result })
            debugger
            if (user) {
                const _favoriteGames = await logic.retrieveFavs()
                this.setState({ favoriteGames: _favoriteGames, user })
                if (_favoriteGames.some(fav => fav.id == id)) {
                    this.setState({ isFaved: true })

                }
            }
        } catch (error) {
            this.props.history.push('/error')
        }
    }

    async componentWillReceiveProps(props) {

        try {
            const { user, match: { params: { id } } } = props
            debugger
            const result = await logic.retrieveGameById(id)
            this.setState({ result })
            debugger
            if (user) {
                const _favoriteGames = await logic.retrieveFavs()
                this.setState({ result, favoriteGames: _favoriteGames, user })
                if (_favoriteGames.some(fav => fav.id == id)) {
                    this.setState({ isFaved: true })
                }
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
        const favoriteGames = await logic.retrieveFavs()
        this.setState({ favoriteGames })
    }


    render() {
        const { user, result, isFaved } = this.state
        const { handleToggleFavs } = this
        // const {favoriteGames}=this.props
        return <div className="gameDetail" >
            {result &&
                <div className="gameDetail__card">
                    <h2 className="gameDetail__title">{result.title}</h2>
                    <div className="gameDetail__container">
                        <div className="gameDetail__imgContainer">
                            <div className="gameDetail__imgSize">
                                <img className="gameDetail__img" classname src={result.images[0]} />
                            </div>
                        </div>
                        <div className="gameDetail__subcontainer">
                            <p className="gameDetail__genreDetail">{result.genre}</p>
                            <p className="gameDetail__descriptionBox">{result.description}</p>
                            <div className="gameDetail__iconsContainer">
                                <a href={result.gameFile} className="gameDetail__icons fas fa-download" />
                                {!user && <Link to="/login"><button className="gameDetail__loginButton">Log In to add Favs</button></Link>}
                                {user && (isFaved ? < a className="gameDetail__icons fas fa-star" onClick={handleToggleFavs} /> : <a className="gameDetail__icons far fa-star" onClick={handleToggleFavs} />)}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    }

}
export default withRouter(GameDetail)