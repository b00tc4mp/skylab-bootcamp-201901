import React, { Component, Fragment } from 'react'

import Nav from '../Nav'
import cat_dog from '../images/cat_dog.png'
import Footer from '../Footer'

import './index.sass'

class Home extends Component {

    handleVisit = event => {
        event.preventDefault()
        this.props.history.push('/visit')
    }

   
    handleAppointments = event =>{
        event.preventDefault()
        this.props.history.push('/appointments')
    }

    

    render(){

    return <Fragment>
    <Nav className= "fixed"></Nav>
     <div className= "home"> 
        {/* <button className= "button__home" onClick={this.handleRegisterOwner}>Register Owner</button> */}
        {/* <button className= "button__home" onClick={this.handleEditOwner}>Edit Owner</button> */}
        {/* <button className= "button__home" onClick={this.handleRegisterPet}>Register Pet</button> */}
        <button className= "button" onClick={this.handleVisit}>Visit</button>
        {/* <button className= "button__home" onClick={this.handleEditPet}> Edit Pet</button> */}
        <button className= "button" onClick={this.handleAppointments}>Appointment</button>
    </div>   
    <div>
        <img className= "img__Home" src={cat_dog} alt=""></img>
    </div>
    <Footer className='fixed'></Footer>
</Fragment>
}

}


export default Home