'use strict'

import React, { Component } from 'react'
import { withRouter, Link, Route } from 'react-router-dom'
import SendMessage from '../SendMessage'

class Navigator extends Component {
    render() {
        return <section className="navigator">
            <div id="profile"><Link to="/profile">Profile</Link></div>
            <div id="sendMessage"><Link to="/send-message">Send Message</Link></div>
            <div id="watch"><Link to="/watch">Watch Mode</Link></div>
            <div id="flaresMap"><Link to="/flares-map">Flares Map</Link></div>
        </section>
    }
}

export default withRouter(Navigator)