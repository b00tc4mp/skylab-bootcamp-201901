import React, { Component } from 'react'
import './index.css'
import logic from '../../logic'
import Forms from './forms'
import DeleteProfile from './delete-profile';
import swal from 'sweetalert2'

class Update extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            surname: '',
            phone: '',
            address: '',
            email: '',
            newEmail: '',
            password: '',
            newPassword: ''
        }
    }

    componentDidMount() {
        logic.retrieveUser()
            .then(user => {

                this.setState({
                    name: user.name,
                    surname: user.surname,
                    address: user.address,
                    email: user.email,
                    phone: user.phone
                })
            })
    }

    handleSubmitUpdate = (e) => {
        e.preventDefault()
        const { name, surname, phone, address, email, password, newEmail, newPassword } = this.state

        logic.updateUser(name, surname, phone, address, email, password, newEmail, newPassword)
            .then(res => {
                    this.props.history.push('/')
                    swal('Profile updated successfully!')
            }).catch(err => {
                swal(err.message)
            })

    }

    handlerCapturingName = (e) => {
        this.setState({ name: e.target.value })
    }

    handlerCapturingSurname = (e) => {
        this.setState({ surname: e.target.value })
    }

    handlerCapturingPhone = (e) => {
        this.setState({ phone: e.target.value })
    }

    handlerCapturingAddress = (e) => {
        this.setState({ address: e.target.value })
    }

    handlerCapturingEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlerCapturingNewEmail = (e) => {
        this.setState({ newEmail: e.target.value })
    }

    handlerCapturingPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handlerCapturingNewPassword = (e) => {
        this.setState({ newPassword: e.target.value })
    }


    render() {
        return (
            <main className="my_container register-app">
                <div className="container">
                    <div className="py-5 text-center title">
                        <h2>Update</h2>
                    </div>
                    <div className="main-container">
                        <form className="form-register" onSubmit={this.handleSubmitUpdate} noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" className="form-control" name="name" placeholder="name" autoFocus="" onChange={this.handlerCapturingName} value={this.state.name} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" name="surname" placeholder="surname" onChange={this.handlerCapturingSurname} value={this.state.surname} />
                                </div>
                            </div>
                            <Forms type="text" label='Phone' placeholder="phone" captureInput={this.handlerCapturingPhone} inputField={this.state.phone} />
                            <Forms type="text" label='Address' placeholder="address" captureInput={this.handlerCapturingAddress} inputField={this.state.address} />
                            <Forms type="text" label='Email' placeholder="email" captureInput={this.handlerCapturingEmail} inputField={this.state.email} />
                            <Forms type="text" label='New email' placeholder="insert new email" captureInput={this.handlerCapturingNewEmail} inputField={this.state.newEmail} />
                            <Forms type="password" label='Password' placeholder="password" captureInput={this.handlerCapturingPassword} inputField={this.state.password} />
                            <Forms type="password" label='New password' placeholder="insert new password" captureInput={this.handlerCapturingNewPassword} inputField={this.state.newPassword} />
                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block register-submit" type="submit">Update profile</button>

                        </form>
                        <div className="py-5 text-center title">
                            <h2>Danger Zone: delete profile</h2>
                        </div>
                        <DeleteProfile />
                    </div>
                </div>
            </main>

        )
    }
}

export default Update