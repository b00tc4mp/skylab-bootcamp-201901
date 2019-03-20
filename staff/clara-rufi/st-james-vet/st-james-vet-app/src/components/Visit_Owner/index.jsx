/* eslint-disable */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';
import './index.sass'

class VisitOwner extends Component {

    state = { user: '', appointmentsOwner: [], year: moment().format('YYYY'), month: moment().format('MM'), error: false, askDelete: false }


    componentDidMount() {
        this.retrieveAppointmentsOwner()
        this.retrieveUser()
    }

    retrieveAppointmentsOwner = async () => {
        const appointmentsOwner = await logic.retrieveAppointmentsOwner()
        this.setState({ appointmentsOwner })
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
            this.setState({ askDelete: true, visitConfirmed: false, deleteVisit: false })
        } catch ({ message }) {
            this.setState({ error: message, visitConfirmed: false })
        }
    }

    handleConfirmDeleteOK = event => {
        event.preventDefault()
        this.setState({ askDelete: false, deleteVisit: true, error: false })
        this.retrieveAppointmentsOwner()
    }

    handleConfirmDeleteNO = event => {
        event.preventDefault()
        this.setState({ askDelete: false, error: false })
    }


    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }


    visitOwnerDetails = (id, owner, pet, date) => {
        let dateVisit = date
        var today = new Date()
        return (
            <tr>
                <p className="appointment" value={id}>
                    <th>
                        Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
                        <br />
                        Hour:{' '}{date.getHours()}{':'}{date.getMinutes()  === 0 ? '00 h' : date.getMinutes() + ' h'}
                        <br />
                        Pet:{' '}{pet.name}
                        <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button>
                    </th>
                </p>
            </tr>
        )
    }


    visitOwner = (id, owner, pet, date) => {
        let dateVisit = date
        var today = new Date()
        if (dateVisit.getUTCFullYear() > today.getUTCFullYear())

            return (this.visitOwnerDetails(id, owner, pet, date))

        if (
            dateVisit.getUTCFullYear() === today.getUTCFullYear()
            &&
            dateVisit.getUTCMonth() + 1 > today.getUTCMonth() + 1
        ) {
            return (this.visitOwnerDetails(id, owner, pet, date))
        }

        if (dateVisit.getUTCMonth() + 1 == today.getUTCMonth() + 1 && (today.getUTCDate() + 2 < dateVisit.getUTCDate())) {
            return this.visitOwnerDetails(id, owner, pet, date)
        }

        return (
            <tr>
                <p className="appointment" value={id}>
                    <th>
                        Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
                        <br />
                        Hour:{' '}{date.getUTCHours()}{':'}{date.getUTCMinutes()  === 0 ? '00 h' : date.getUTCMinutes() + ' h'}
                        <br />
                        Pet:{' '}{pet.name}
                    </th>
                </p>
            </tr>
        )
    }

    render() {

        const { state: { appointmentsOwner }, visitOwner } = this

        return <form className= "form__vet">
            <div className="input__form">
                <h1>Appointments:</h1>
                
                {
                    appointmentsOwner.map(({ id, owner, pet, date }) => {

                        appointmentsOwner.sort(function (a, b) {
                            return a.date - b.date
                        })

                        if (owner._id === this.state.user) {
                            return visitOwner(id, owner, pet, date)
                        }
                    })
                }
                {this.state.askDelete && <p className="feedback feedback__confirmation">Are you sure you want to delete this visit?</p>}
                {this.state.askDelete && <button onClick={this.handleConfirmDeleteOK} className="button__confirm">Yes</button>}
                {this.state.askDelete && <button onClick={this.handleConfirmDeleteNO} className="button__confirm">No</button>}
                {this.state.deleteVisit && <p className="feedback feedback__success">Appointment succesfully deleted</p>}
                {<div className="no__appointments">
                    <p>You can only delete visits with a date greater than 2 days</p>
                    <p>If you want an appointment or modify it, you can call at 01792 205000, or send us an email: stjamesvet@stjamesvet.com</p>
                </div>

                }
            </div>
            <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
        </form>
    }
}

export default withRouter(VisitOwner)
