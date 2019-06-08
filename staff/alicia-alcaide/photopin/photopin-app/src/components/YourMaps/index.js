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

        return <>
            <h3 className='uk-text-center'>{title}</h3>
            {maps && <MapList maps={maps} />}
        </>
    }
}

export default withRouter(YourMaps)