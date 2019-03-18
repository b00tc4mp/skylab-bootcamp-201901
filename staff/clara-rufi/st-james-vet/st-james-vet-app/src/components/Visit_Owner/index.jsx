import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';
import './index.sass'

class VisitOwner extends Component {

    state = { user: '', appointmentsOwner: [], year: moment().format('YYYY'), month: moment().format('MM'), error: false, noAppointments: true, deleteVisit: false }


    componentDidMount() {
        this.retrieveAppointmentsOwner()
        this.retrieveUser()
    }

    retrieveAppointmentsOwner = async () => {
        debugger
        const appointmentsOwner = await logic.retrieveAppointmentsOwner()
        this.setState({ appointmentsOwner })
        // console.log(this.state.appointmentsOwner.length)
        // console.log(this.state.appointmentsOwner)
    }

    retrieveUser = async () => {
        const user = await logic.retrieveUser()
        this.setState({ user: user.id })
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    handleDeleteVisit = event => {
        event.preventDefault()
        const Id = event.target.value;
        this.deleteVisit(Id)
    }

    deleteVisit = async (Id) => {
        try {
            await logic.deleteAppointment(Id)
            this.setState({ deleteVisit: true, visitConfirmed: false })
            this.retrieveAppointmentsOwner()
        } catch ({ message }) {
            this.setState({ error: message, visitConfirmed: false })
        }
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    render() {

        const { state: { appointmentsOwner } } = this
        
        // let count = 0
        // if (count === 0) { this.setState({ noAppointments: true }) }
        return <form>
            <div className="input__form">
                <h1>Appointments:</h1>
                {              
                    appointmentsOwner.map(({ id, owner,pet, date }) => {
                        appointmentsOwner.sort(function (a, b) {
                            return a.date - b.date
                        })
                        let dateVisit = new Date(date)
                        console.log(dateVisit)
                        // var res = date1.slice(0, 21);
                        if (owner._id === this.state.user) {
                            return (
                                <tr>
                                    <p className="appointment" value={id}>
                                        <th>
                                            Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
                                            <br/>
                                            Hour:{' '}{dateVisit.getUTCHours() + 2}{':'}{dateVisit.getMinutes()}{'h'}
                                            <br/>
                                            Pet:{' '}{pet.name}{owner.name}
                                            <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button>
                                    </th>
                                    </p>
                                </tr>
                            )
                        // }
                        // count=+1
                        // console.log(count)
                       
                    }
                })
                }
                {this.state.deleteVisit && <p className="feedback feedback__success">Appointment succesfully deleted</p>}
                {this.state.noAppointments && <div className="no__appointments">
                    {/* <div className="noAppointments"> */}
                    {/* <p>You don't have any appointment</p> */}
                   
                  
                    <p>If you want an appointment or modify it, you can call at 01792 205000</p>
                    <p>Or send us an email: stjamesvet@stjamesvet.com</p>
                   
                </div>
                    // </div>
                }
            </div>
            <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
        </form>
    }
}

export default withRouter(VisitOwner)
