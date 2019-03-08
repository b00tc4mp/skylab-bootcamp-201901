import React, { Component} from 'react'
import Calendar from '../Calendar'
import logic from '../../logic'
import './index.sass'



class Appointments extends Component {
   
  state = { users: [], pets: [], name: '', microchip: '', petlicence: '', error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    componentDidMount() {
      this.retrieveUsers()
    }

    handleSelectOwner = async event => {
        event.preventDefault()
        const usersId = event.target.value
        this.retrievePets(usersId)
    }


    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({ users })
    }


    retrievePets = async userId => {
        const pets = await logic.retrievePets(userId)
        console.log("userId " + userId)
        this.setState({ pets })
    }


    handleGoHome = event => {
      event.preventDefault()
      this.props.history.push('/home')
    }


    render() {

        return <form onSubmit={this.handleVisit}>
            <section className="calendar">
            <h1>Appointments</h1>
                <div className="input__form">
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
                </div>

       <Calendar year={2019} month={3} ></Calendar>
       <Calendar year={2019} month={4} ></Calendar>
         <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
         </section>     
        </form>
    } 
  }
  export default Appointments
  
  
  
  
  