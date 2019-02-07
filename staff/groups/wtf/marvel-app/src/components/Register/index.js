'use strict'

import React, { Component } from 'react'
import Modal from '../Modal'
import Feedback from '../Feedback'

class Register extends Component {
    state = {name: null, surname: null, email: null, password: null, passwordConfirmation: null, feedback: null, modalVisible: false}

    handleNameInput = event => this.setState({name: event.target.value})

    handleSurnameInput = event => this.setState({surname: event.target.value})

    handleEmailInput = event => this.setState({email: event.target.value})

    handlePasswordInput = event => this.setState({password: event.target.value})

    handlePasswordConfirmationInput = event => this.setState({passwordConfirmation: event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation}, props:{onRegistration} } = this

        onRegistration(name, surname, email, password, passwordConfirmation)
    }

    handleOnLanding = event => {
        event.preventDefault()

        const { props: {onLanding} } = this
        onLanding()
    }

    handleCloseModal = () => {
        this.setState({modalVisible: false, registrationFeeback: null})
        const { props: {onLogin} } = this
        onLogin()
   }



    render() {
         const {handleCloseModal, handleOnLanding, handleFormSubmit, handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, props: {feedback, modalVisible, name, surname, email, password, confirmPassword, register, goBack}  } = this
    
        return <section className="register container margin-top">
        <div className="columns is-mobile">
            <div className="modal is-active is-clipped ">
                <div className="modal-background"></div>
                <div className="modal-content column is-half-widescreen is-three-fifths-tablet is-three-quarters-mobile is-centered">
                    <form className="register__form " onSubmit={handleFormSubmit}>
                        <h4 className="subtitle is-4 white">{register}</h4>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input is-small is-rounded" type="text" name="name" placeholder={name} required onChange={handleNameInput} />
                                <span className="icon is-small is-left">
                                    <i className="far fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small is-rounded" type="text" name="surname" placeholder={surname} required onChange={handleSurnameInput} />
                            <span className="icon is-small is-left">
                                <i className="far fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input is-small is-rounded" type="email" name="email" placeholder={email} required onChange={handleEmailInput}/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input is-small is-rounded" type="password" name="password" placeholder={password} required onChange={handlePasswordInput} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input is-small is-rounded" type="password" name="password-confirmation"placeholder={confirmPassword} required onChange={handlePasswordConfirmationInput}/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div>
                            {feedback && <Feedback message={feedback} />}
                        </div>
                        <div className="field is-grouped btn_grp">
                            <p className="control"><button className="button is-outlined is-danger is-small is-rounded" type="submit">{register}</button></p>
                            <p className="control"><a to='/' onClick={handleOnLanding} className="button is-inverted is-outlined is-danger is-small is-rounded">{goBack}</a></p>
                        </div>
                    </form>
                </div>    
            </div>
        </div>
        {modalVisible && <Modal closeModal={handleCloseModal} />}
    </section>
    }
}

export default Register
