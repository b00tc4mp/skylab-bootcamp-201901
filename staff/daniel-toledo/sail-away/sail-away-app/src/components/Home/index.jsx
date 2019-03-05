'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import Nav from '../Nav'
import CreateJourney from '../CreateJourney'

function Home(){

        return (<main className="home">
             <CreateJourney/>
        </main>)
}

export default withRouter(Home)