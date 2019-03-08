import React, { Component } from 'react'
import { withRouter, Link} from 'react-router-dom'
import logic from '../../logic';

class Watch extends Component {
    state = { userMessages: '' }

    componentWillMount() {
        try {
            logic.retrieveMessages()
                .then(({ msgReceived }) => this.setState({ userMessages: msgReceived }))
                .catch(err => console.error(err))
        } catch(err) {
            console.error(err)
        }
    }

    render() {
        return <section>
            <p>Watch</p>
            <Link to="/home">Back home</Link>
        </section>
    }
}

export default Watch