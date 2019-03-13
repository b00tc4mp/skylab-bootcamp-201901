'use strict'

import React, { Component } from 'react'
import { withRouter, Link, Route } from 'react-router-dom'
import SendMessage from '../SendMessage'

class Navigator extends Component {
    render() {
        return <section>
            <p>Navigator</p>
            <Link to="/send-message">Send Message</Link>
            <Link to="/watch">Watch Mode</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/flares-map">Flares Map</Link>
        </section>
    }
}

export default withRouter(Navigator)