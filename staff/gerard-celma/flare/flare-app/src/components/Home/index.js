'use strict'

import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import Navigator from '../Navigator';
import SendMessage from '../SendMessage'

class Home extends Component {

    render() {
        const { showSearch } = this

        return <section className="home">
            <p>Welcome Home</p>

            <Navigator />
        </section>
    }
}

export default withRouter(Home)