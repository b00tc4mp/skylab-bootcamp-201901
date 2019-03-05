'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import Home from '../Home'
import Nav from '../Nav'
import './index.sass'

function App(){


        return (<main className="app">
            < Nav />
            <Route path="/home" render={() => <Home />} />
        </main>)
}

export default withRouter(App)