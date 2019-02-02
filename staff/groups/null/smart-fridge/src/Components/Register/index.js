import React from 'react'
import './index.sass'

class Register extends React.Component {

    state = { name: '', surname: '', email: '', password: '', confirmPassword: '' }

    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnamedInput = event => this.setState({ surname: event.target.value })
    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handleConfirmPasswordInput = event => this.setState({ confirmpassword: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, confirmPasword }, props: { onRegister } } = this

        onRegister(name, surname, email, password, confirmPasword)
    }

    handleLoginButton = event => {
        event.preventDefault()

        this.props.registerToLogin()
    }

    render() {
        return <section className="register">
            <div className="register__box container pl-lg-5 pr-lg-5">
                <h2 className="col-2 mt-3">Register</h2>
                <form onSubmit={this.handleFormSubmit} className="login__form form-group container mb-3 " >
                    <div className="row mr-2">
                        <label htmlFor="name" className="col col-md-3 col-sm-12 flex mt-1">Name</label>
                        <input onChange={this.handleNameInput} type="text" className="col col-md-9 col-12 form-control mt-1" name="name" placeholder="Name" required />
                        <label htmlFor="surname" className="col col-md-3 col-sm-12 flex mt-1">Surname</label>
                        <input onChange={this.handleSurnameInput} type="text" className="col col-md-9 col-12 form-control mt-1" name="surname" placeholder="Surname" required />
                        <label htmlFor="email" className="col col-md-3 col-sm-12 flex mt-1">Email</label>
                        <input onChange={this.handleEmailInput} type="email" className="col col-md-9 col-12 form-control mt-1" name="email" placeholder="Email" required />
                        <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Password</label>
                        <input onChange={this.handlePasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required />
                        <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Confirm Password</label>
                        <input onChange={this.handlePasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="confirmPassword" placeholder="Confirm Password" required />

                        <div className='mt-4 col-12 p-0'>
                            <h2 className="text-center mt-3">About you</h2>
                            <div className='mt-2 col-12 flex'>
                                <input className='mr-2' type="radio" id="male" name="drone" value="male" />
                                <label className='mr-5' for="male">Male</label>
                                <input className='mr-2' type="radio" id="female" name="drone" value="female" />
                                <label for="female">Female</label>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-4'>
                                    <label htmlFor="height" className="flex mt-1">Height (cm)</label>
                                    <input onChange={this.handleHeightInput} type="text" className="form-control mt-1" name="height" placeholder="Height (cm)" required />
                                </div>
                                <div className='col-12 col-md-4'>
                                    <label htmlFor="weigth" className="flex mt-1">Weigth (kg)</label>
                                    <input onChange={this.handleWeidthInput} type="text" className="form-control mt-1" name="weigth" placeholder="Weigth (kg)" required />
                                </div>
                                <div className='col-12 col-md-4'>
                                    <label htmlFor="birthDay" className="flex mt-1">Birth Day</label>
                                    <input onChange={this.handleBirthInput} type="text" className="form-control mt-1" name="birthDay" placeholder="Birth Day" required />
                                </div>
                            </div>
                            <div className='row mt-5'>
                                <label htmlFor="lifestyle" className="col col-md-3 col-sm-12 flex mt-1">Life Style</label>
                                <select name="lifestyle" className="col col-md-9 col-12 form-control mt-1">
                                    <option value="SL">Sedentary or Light activity (1 or 2 times per month)</option>
                                    <option value="AM">Active or Moderate active (1 or 2 times per week)</option>
                                    <option value="V">Vigorously active (4 times per week or more)</option>
                                </select>
                            </div>

                        </div>

                    </div>
                    <div className="row login-flex mt-3">
                        <div className="col-md-3 col-0"></div>
                        <button type="submit" className="btn btn-dark col-12 col-md-6 mr-2">Register</button>
                        <button onClick={this.handleLoginButton} className="btn btn-outline-light col-12 col-md-2 mt-2 mt-sm-0">Login</button>
                    </div>
                </form>
            </div>
        </section>
    }

}

export default Register