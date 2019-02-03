'use strict'

import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import'./index.sass'
import Login from '../Login'
import Register from '../Register'

class Landing extends Component {

    handleOnLogin = () => this.props.history.push('/login')
    handleOnRegsitration = () => this.props.history.push('/register')

    render() {

        const {handleOnLogin, handleOnRegsitration} = this

        return <section className="container">
            <div className="columns is-mobile is-centered has-text-centered">
                <div className="modal is-active is-clipped">
                    <div className="modal-background"></div>
                    <div className="modal-content column is-half-widescreen is-three-fifths-tablet is-three-quarters-mobile is-centered">
                        <h1 className="title is-1 white">Welcome to Marvel App</h1>
                        <h5 className="subtitle is-5 white">Your free Marvel repository</h5>
                        <div className="is-grouped btn_grp">
                                <p className="control"><button onClick={handleOnLogin} className="button is-danger is-outlined is-small is-rounded">Log in</button></p>
                                <p>&nbsp;</p>
                                <p className="control"><button onClick={handleOnRegsitration} className="button is-inverted is-outlined is-danger is-small is-rounded">Sign Up</button></p>
                        </div>   
                    </div>
                </div>          
            </div>
        </section>
    }


}

export default withRouter(Landing)