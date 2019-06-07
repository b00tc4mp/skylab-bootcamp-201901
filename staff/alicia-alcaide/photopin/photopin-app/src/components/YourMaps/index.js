import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import literals from './literals'
import logic from '../../logic'
import MapList from '../MapList';


class YourMaps extends Component {
    state = { maps: [] }


    componentDidMount() {
        logic.isUserLoggedIn &&
            logic.retrieveUserMaps()
                .then(maps =>
                    this.setState({ maps })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
    }


    render() {
        const {
            state: { maps },
            props: { lang }
        } = this


        const { title } = literals[lang]

        return <main className="home">
            <h3>{title}</h3>
            {maps && <MapList lang={lang} maps={maps} />}
        </main>
    }
}

export default withRouter(YourMaps)