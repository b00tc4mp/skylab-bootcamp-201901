import React, { useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Search from '../Search'


function Landing(props) {
    let { search } = props
    return (<main className="landing">
        <Search search={search} />
        <button onClick={() => props.history.push('/users')}>Search Crew</button>
    </main>)
}

export default withRouter(Landing)