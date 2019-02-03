'use strict'

import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import Login from '../Login'
import Register from '../Register'

class Landing extends Component {

    render() {

        return <section>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
        </section>
    }


}

export default withRouter(Landing)