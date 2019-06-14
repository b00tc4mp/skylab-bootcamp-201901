'use strict'

import React, { Component, Fragment } from 'react'
import { withRouter, Route } from 'react-router-dom'
import Header from '../Header'
import Navigator from '../Navigator'
import MessagesSent from '../MessagesSent'
import './index.sass'

class Home extends Component {

    render() {
        const { showSearch } = this

        return <Fragment>
            <Header />
            <section className="home">
                <Navigator />
                <MessagesSent />
            </section>
        </Fragment>
    }
}

export default withRouter(Home)