import React, { Component } from 'react';
import './index.sass';

class BotonRegister extends React.Component{
    constructor(){
        super()
    }

    handleRegisterClick = event => {
        event.preventDefault()
        this.props.onRegister()
    }

    render(){
        return <section className="registersection">
               <button className="btn btn-secondary" onClick={this.handleRegisterClick}>Register</button>
            </section>
    } //ojo con el this, que si no se pone no funciona por contextos!!!!!!
}

export default BotonRegister