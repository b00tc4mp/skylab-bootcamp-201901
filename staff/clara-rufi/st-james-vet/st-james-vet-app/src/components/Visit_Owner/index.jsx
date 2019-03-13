import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'


class VisitOwner extends Component {

    state = { appointments: [], error: false }


    componentDidMount() {
        this.retrieveAppointments()
    }

    retrieveAppointments = async () => {
        const appointments = await logic.retrieveAppointments()
        this.setState({ appointments })
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

        return <form>
             <section className="form">
            <p className="title__form">Owner's visits:</p>
            <div className="input__form">
            <div>
                <table>
                  
                        
                {this.state.appointments.map(appointment => <h3 name="appointment_owner" value={appointment.id}>pet:{appointment.pet}{' '} date: {appointment.dayDb}</h3>)}
                <button onClick={this.handleDeleteVisit} className="button__delete">Delete</button>
                
                
                </table>
            </div>
            </div>
            <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
            </section>
        </form>

    }
}

export default withRouter(VisitOwner)
