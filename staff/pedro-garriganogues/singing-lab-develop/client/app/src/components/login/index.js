import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'
import logic from '../../logic'
import './index.css'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmitLogin = (e) => {
        e.preventDefault()


        const { email, password } = this.state
        if (email !== "" || password !== "") {

            logic.login(email, password)
                .then(res => {
                    this.props.onLogin()

                }).catch(err => swal(`Woopsy! try entering a valid email and password`))
        }
    }


    handlerCapturingEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handlerCapturingPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className="login-app">
                <form className="form-signin" onSubmit={this.handleSubmitLogin}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" name="email" placeholder="email" onChange={this.handlerCapturingEmail} value={this.state.email} />
                    <br />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" name="password" placeholder="password" onChange={this.handlerCapturingPassword} value={this.state.password} />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" defaultValue="remember-me" /> Remember me
                        </label>
                    </div>
                    <p className="mt-2">You don't have an account? <Link to="/register" style={{color: "lightgrey", fontWeight: "bold"}}>Sign up</Link></p>
                    <button className="btn btn-lg btn-primary btn-block login-submit" type="submit">Sign in</button>
                    
                </form>
            </div>
        )
    }
}
export default Login