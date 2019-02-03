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

        return <section className="container ">
            <div className="columns is-mobile is-centered has-text-centered">
                <div className="column is-half-widescreen is-half-tablet is-three-quarters-mobile is-centered">
                    <h1 className="title is-1 white">Welcome to Marvel Studios!</h1>
                    <div className="is-grouped btn_grp">
                            <p className="control"><a href="#" onClick={handleOnLogin} className="button is-danger is-outlined is-small is-rounded">Log in</a></p>
                            <p className="control"><a href="#" onClick={handleOnRegsitration} className="button is-dark is-small is-rounded">Sign Up</a></p>
                    </div>             
                </div>   
            </div>
        </section>
    }


}

export default withRouter(Landing)