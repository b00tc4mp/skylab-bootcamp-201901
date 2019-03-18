'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import './index.sass'

function NoResult(props) {


    return (<main className="NoResult">
        <div className="NoResult__container">
            <h2>Avast ye!</h2>
            <p>No results for this search. Be the first in creating one!</p>
            <button onClick={() => props.history.push('/')}>Go Back</button>
        </div>
    </main>)
}

export default withRouter(NoResult)