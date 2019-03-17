import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';
import './index.sass'

class VisitOwner extends Component {

    state = { user: '', appointments: [], year: moment().format('YYYY'), month: moment().format('MM'), error: false, noAppointments: true }


    componentDidMount() {
        this.retrieveAppointments()
        this.retrieveUser()
    }

    retrieveAppointments = async () => {
        let year = this.state.year
        let month = this.state.month
        const appointments = await logic.retrieveAppointments(year, month)
        this.setState({ appointments })
        if (this.state.appointments !== 0) { this.setState({ noAppointments: true }) }
    }

    retrieveUser = async () => {
        debugger
        const user = await logic.retrieveUser()
        this.setState({ user: user.id })
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
            <div className="input__form">
                <label>Appointments:</label>
                {
                    this.state.appointments.map(({ id, owner, pet, date }) => {
                        this.state.appointments.sort(function (a, b) {
                            return a.date - b.date
                        })
                        if (owner._id === this.state.user) {
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
                {this.state.noAppointments && <div className="no__appointments">
                    {/* <div className="noAppointments"> */}
                        <p>You don't have any appointment</p>
                        <p>If you want one, you can call at 01792 205000</p>
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
