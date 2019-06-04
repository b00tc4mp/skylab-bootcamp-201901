import React, { Component } from 'react'
import SearchBar from '../SearchBar'
import './index.scss'

class Landing extends Component {
    state = {
        user: ""
    }

    render() {
        const { props: { user, history, onSearchGame, searchResults } } = this

        return <div>
            <div>
                {!user && <h2>Welcome to Freendies</h2>}
                {user && <h2>Welcome to Freendies {user.username}</h2>}
            </div>

            <section>
                <h2>Games</h2>
            </section>

        </div>
    }



}

export default Landing
