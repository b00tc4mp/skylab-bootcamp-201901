'use strict'

import React, { Component, Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import './index.sass'
import logic from '../Logic'
import Login from '../Login'
import Register from '../Register'


class Landing extends Component {

    state = {modalVisible: false, loginFeedback: null, registrationFeedback: null, userName: null, userEmail: null, userFavourites: null}

    handleLogin = (email, password) =>{
        try {
          logic.login(email, password)
            .then(() => {
                this.setState({loginFeedback: null})
                return logic.retrieveUser(logic.__userId__, logic.__userApiToken__)
                    .then(user => {
                        console.log(user)
                        this.setState({userName : user.name, userEmail: user.username, userFavourites: user.favourites})
                    }) 
            })
        }catch (message) {
          this.setState({ loginFeedback: message })
        }
    }

    handleRegistration = (name, surname, email, password, passwordConfirmation) => {
        this.setState ({registrationFeedback: null})
        try {
            logic.register(name, surname, email, password, passwordConfirmation) 
                .then(()=>this.setState({modalVisible: true}))
        } catch (message) {
            this.setState ({registrationFeedback: message})
        }
    }


    render() {

        const {handleLogin, handleRegistration} = this

        return <section className="container">
        <Route exact path="/" render={() =>
            <Fragment>
                <div className="columns is-mobile is-centered has-text-centered">
                    <div className="modal is-active is-clipped">
                        <div className="modal-background"></div>
                        <div className="modal-content column is-half-widescreen is-three-fifths-tablet is-three-quarters-mobile is-centered">
                            <h1 className="title is-1 white">Welcome to Marvel App</h1>
                            <h5 className="subtitle is-5 white">Your free Marvel repository</h5>
                            <div className="is-grouped btn_grp">
                                <p className="control"><Link to='/login' className="button is-danger is-outlined is-small is-rounded">Log in</Link></p>
                                <p>&nbsp;</p>
                                <p className="control"><Link to='/register' className="button is-inverted is-outlined is-danger is-small is-rounded">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>} />
            <Route path='/login' render={() => <Login onLogin={handleLogin}/>} />
            <Route path='/register' render={() => <Register onRegistration={handleRegistration}/>} />
        </section>
    }
}

export default Landing