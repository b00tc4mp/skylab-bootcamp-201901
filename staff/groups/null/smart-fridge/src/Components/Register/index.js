import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

class Register extends React.Component {

    state = { 
        name: '', 
        surname: '', 
        email: '', 
        password: '', 
        confirmPassword: '', 
        gender:'', 
        height: null, 
        weigth: null, 
        birthDay:'', 
        lifeStyle: 'sedentary' 
    }

    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handleConfirmPasswordInput = event => this.setState({ confirmPassword: event.target.value })

    handleGenderInput= event => this.setState({gender: event.currentTarget.value})
    handleHeightInput= event => this.setState({height: parseInt(event.target.value)})
    handleWeidthInput= event => this.setState({weigth: parseInt(event.target.value)})
    handleBirthInput= event => this.setState({birthDay: event.target.value})
    handleLifeStyleInput = event => this.setState({lifeStyle: event.target.value})


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, confirmPassword, gender, height, weigth, birthDay, lifeStyle }, props: { onRegister } } = this

        onRegister(name, surname, email, password, confirmPassword, gender, height, weigth, birthDay, lifeStyle)
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
                        <input onChange={this.handleConfirmPasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="confirmPassword" placeholder="Confirm Password" required />

                        <div className='mt-4 col-12 p-0'>
                            <h2 className="text-center mt-3">About you</h2>
                            <div className='mt-2 col-12 text-center'>
                                <input onChange={this.handleGenderInput} className='mr-2' type="radio" id="male" name="gender" value="male" required/>
                                <label className='mr-5' for="male">Male</label>
                                <input onChange={this.handleGenderInput} className='mr-2' type="radio" id="female" name="gender" value="female" required />
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
                                    <input onChange={this.handleBirthInput} type="date" className="form-control mt-1" name="birthDay" placeholder="Birth Day" required />
                                </div>
                            </div>
                            <div className='row mt-5'>
                                <label htmlFor="lifestyle" className="col col-md-3 col-sm-12 flex mt-1">Life Style</label>
                                <select onChange={this.handleLifeStyleInput} value={this.state.value} name="lifestyle" className="col col-md-9 col-12 form-control mt-1">
                                    <option value="sedentary">Sedentary or Light activity (1 or 2 times per month)</option>
                                    <option value="active">Active or Moderate active (1 or 2 times per week)</option>
                                    <option value="vigorouse">Vigorously active (4 times per week or more)</option>
                                </select>
                            </div>

                        </div>

                    </div>
                   
                    <div className="row mt-3">
                    {this.props.feedback && <Feedback message={this.props.feedback}/>}
                            <div className="col-md-3 col-0"></div>
                            <button type="submit" className="btn btn-dark col-12 col-sm-6">Register</button>
                            <div className="p-0 pt-2 pt-sm-0 pl-sm-2 col-12 col-sm-6 col-md-3">
                                <button onClick={this.handleLoginButton} href="#" className="btn btn-outline-light col-12">Login</button>
                            </div>
                        </div>
                </form>
            </div>
        </section>
    }

}

export default Register