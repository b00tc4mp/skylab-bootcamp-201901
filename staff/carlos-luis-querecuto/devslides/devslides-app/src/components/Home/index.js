import React, { useState, useContext } from 'react'
import './index.sass'
import Feerdback from '../Feedback';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../../logic'

import Presentations from './Presentations'
import Profile from './Profile'

function Home({ history }) {

    return (<>
    <div class="home">
        <section class="container">
            <div class="columns">
                <div class="column is-one-fifth">
                    <aside class="menu">
                        <p class="menu-label">
                            General
                        </p>
                        <ul class="menu-list">
                            <li><a onClick={() => history.push('/Personal/Presentations')}>Presentations</a></li>
                            <li><a onClick={() => history.push('/Personal/Profile')}>Profile</a></li>
                        </ul>
                    </aside>
                </div>
                <div class="column">
                    <Switch>
                        <Route exact path="/Personal/Presentations" render={() => logic.isUserLoggedIn ? <Presentations  /> : <Redirect to="/" />} />
                        <Route exact path="/Personal/Profile" render={() => logic.isUserLoggedIn ? <Profile  /> : <Redirect to="/" />} />
                    </Switch>
                </div>
            </div>
        </section>
    </div>
    </>)
}


export default withRouter(Home)


