'use strict'

import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import Header from '../Header'
import Navigator from '../Navigator'
import MessagesSent from '../MessagesSent'
import './index.sass'

class Home extends Component {

    render() {
        const { showSearch } = this

        return <section className="home">
            <Header />
            <p>Welcome Home</p>
            <Navigator />
            <MessagesSent />
        </section>
    }
}

export default withRouter(Home)