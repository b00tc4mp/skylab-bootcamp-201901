import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';

class VisitOwner extends Component {

    state = { user: '', appointments: [], year: moment().format('YYYY'), month: moment().format('MM'), error: false }


    componentDidMount() {
        this.retrieveAppointments()
        this.retrieveUser()
    }

    retrieveAppointments = async () => {
        let year = this.state.year
        let month = this.state.month
        // console.log(year, month)
        const appointments = await logic.retrieveAppointments(year, month)
        this.setState({ appointments })
    }

    retrieveUser = async () => {
        debugger
        const user = await logic.retrieveUser()
        this.setState({ user : user.id })
        // console.log(user)
        // , () => console.log(this.state.user))
      
    }


    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    handleDeleteVisit = event => {
        event.preventDefault()
        debugger
        const appointmentId = event.target.value;
        this.deleteVisit(appointmentId)
    }

    deleteVisit = async (appointmentId) => {
        try {
            debugger
            await logic.deleteAppointment(appointmentId)

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    render() {

        return <section className="calendar">
                    <div className="input__form">
                    <label>Appointments:</label>
            {
                this.state.appointments.map(({ id, owner, pet, date }) => {
                  
                    this.state.appointments.sort(function (a, b) {
                        return a.date - b.date
                    })
                    console.log(this.state.user)
                    
                        if (owner._id === this.state.user ){
                            return (
                                <div>
                                <tr>
                            <p className="appointment" value={id}>
                                <th>
                                    <p>Day: {date.getDate()}{'/'}{date.getMonth()}</p>
                                  
                                    <p>Hour: {date.getHours()}{':'}{date.getMinutes() + ' h'} Owner :{owner.name}{' '} Pet  :{pet.name}</p>
                                    <button onClick={(e) => this.handleDeleteVisit(e, id)} className="button__delete">Delete</button>
                                </th>
                            </p>
                        </tr>
                        </div>
                    )
                    }
                })
            }
        </div>
            <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button> 
        </section>
    }
}

export default withRouter(VisitOwner)
