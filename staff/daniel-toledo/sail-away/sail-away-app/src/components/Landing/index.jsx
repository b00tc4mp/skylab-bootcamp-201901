import React, { useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Search from '../Search'


function Landing({search}){

        return (<main className="landing">
            <Search search={search}/>
        </main>)
}

export default withRouter(Landing)