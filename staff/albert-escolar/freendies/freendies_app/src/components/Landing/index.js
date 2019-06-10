import React, { Component } from 'react'
import SearchBar from '../SearchBar'
import './index.scss'
import ListComponent from '../ListComponent'

class Landing extends Component {
    state = {
        user: ""
    }


    async componentDidMount() {
        const { listAllGames } = this.props
        const games = await listAllGames()
        this.setState({games})
    }

    render() {
        const { props: { user, history, onSearchGame, searchResults } } = this
        const {games}=this.state

        return <div className="Landing">
            <div>
                {!user && <h2 className="Landing__welcome">Welcome to Freendies</h2>}
                {user && <h2 className="Landing__welcome">Welcome to Freendies {user.username}</h2>}
            </div>

            <section className="Landing__section">
                <h2 className="Landing__sectionTitle">Games</h2>
                <ListComponent results={games} />
            </section>

        </div>
    }



}

export default Landing
