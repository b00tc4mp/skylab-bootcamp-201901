import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import literals from './literals'
import logic from '../../logic'
//import './index.sass'


class Home extends Component {
    state = { error: null }

    

    render() {
        const {
            state: { error },
            props: { lang }
            
        } = this

        const { title } = literals[lang]

        return <main className="home">
            <h1>Esto es el Home de { title }</h1>
            
        </main>
    }
}

export default withRouter(Home)