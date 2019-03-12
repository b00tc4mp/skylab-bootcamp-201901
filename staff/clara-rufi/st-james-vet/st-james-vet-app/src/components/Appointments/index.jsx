import React, { Component} from 'react'
import { withRouter  } from 'react-router-dom'

import Calendar from '../Calendar'
import logic from '../../logic'
import './index.sass'



class Appointments extends Component {
   
  state = { users: [], pets: [], appointments: [], error: null, confirmHour:false}
  
 
    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    handleGoHome = event => {
      event.preventDefault()
      this.props.history.push('/home')
      }
    
    // componentDidMount() {
      // this.retrieveUsers()
      // this.retrieveAppointments()
    // }

    // retrieveUsers = async () => {
    //     const users = await logic.retrieveUsers()
    //     this.setState({ users })
    //   }
      
    // // retrieveAppointments = async () => {
    // //   const appointments = await logic.retrieveAppointments()
    // //   this.setState({ appointments })
    // // }

    //   handleSelectOwner = async event => {
    //     event.preventDefault()
    //     const usersId = event.target.value
    //     this.retrievePets(usersId)
    //     console.log(usersId)
    // }

  //   retrievePets = async userId => {
  //       const pets = await logic.retrievePets(userId)
  //       console.log("userId " + userId)
  //       this.setState({ pets })
  //       // debugger)
  //       // await logic.retrieveAppointments()
  //   }

  //   handleSelectPet = async event => {
  //     event.preventDefault()
  //     const petsId = event.target.value
  //     console.log("petsID " + petsId)
  //     const {day,hour} = await logic.retrievePetVisit(petsId)
  //     this.setState({day, hour})

  // }

  

    // handleGoHome = event => {
    //   event.preventDefault()
    //   this.props.history.push('/home')
    // }

    // handleNextMonth = event => {
    //   event.preventDefault() 
    //   this.setState({ month: this.state.month +1 });
      
    //   if(this.state.month === 12){
    //     this.setState({ year: 2020, month: 1 })
    //     console.log(this.state.month)
    //   }
    // }

    // handleLastMont = event => {
    //   event.preventDefault()
    //   this.setState({ month: this.state.month - 1 });
    //   if(this.state.month === 1){
    //     this.setState({ year: 2018, month: 12 })
    //     console.log(this.state.month)
    //   }
    // }

    render() {

        return <section>
        {/* // <form onSubmit={this.handleVisit}> */}
            {/* <section className="calendar">
            <h1>Appointments</h1> */}
              {/* <div className="input__form">
                  <label>Select Owner</label>
                  <select name="owner" onChange={this.handleSelectOwner} >
                  {<option></option>}{this.state.users.map(user => <option name="owner" value={user.id} >{user.name}</option>)}
                  </select>
              </div>
              <div className="input__form">
                  <label>Select Pet</label>
                  <select name="pet" onChange={this.handleSelectPet}>
                  {<option></option>}{this.state.pets.map(pet => <option name="pet" value={pet.id}>{pet.name}</option>)}
                  </select>
              </div> */}
              {/* <div className="arrows">
              {/* <button className="button_calendar" onClick={this.handleNextMonth}>Next Month</button>            */}
              {/* <i className="fas fa-arrow-left arrow" onClick={this.handleLastMont}></i>
              <i className="fas fa-arrow-right arrow" onClick={this.handleNextMonth}></i> */}
              {/* </div> */}
       {/* <Calendar yaer= {this.state.year} ></Calendar> */}
      
       <Calendar year={this.state.year} month={this.state.month} ></Calendar>
       {/* {this.state.appointments.map(appointment => <option name="appointment" value={appointment.id} >{appointment.owner}</option>)} */}
        <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button> 
  
     
         </section>
        
            // </form> 
    }
  }
    
  export default withRouter(Appointments)
  
  
  
  
  