import React, {Component} from 'react'

export default class Login extends Component {
    
    state = {email: null, password: null}

    handleEmailInput = event => this.setState({email: event.target.value})

    handlePasswordInput = event => this.setState({password: event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password} } = this

        alert(`Email: ${email}, Password:${password}`)
    }
    render() {

        const { handleEmailInput, handlePasswordInput, handleFormSubmit} = this
        
        return <section className="login" >
        <div className="columns is-mobile is-centered">
            <div className="column">
                <form onSubmit={handleFormSubmit}>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small is-rounded" type="email" name="email" placeholder="Email" required onChange={handleEmailInput}/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input is-small is-rounded" type="password" name="password" placeholder="Pasword"required onChange={handlePasswordInput} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div>
                    </div>
                        <p className="control"><button className="button is-outlined is-danger is-small is-rounded" type="submit">Log In</button></p>
                </form>
            </div>
        </div> 
    </section> 
    }

}