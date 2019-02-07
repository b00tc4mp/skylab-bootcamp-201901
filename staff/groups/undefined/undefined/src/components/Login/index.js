import React,{Component} from 'react'
import Feedback from '../Feedback'


import { withRouter } from 'react-router-dom'
import './index.sass'


class Login extends Component {
    state = {email: '' , password: '' }

    handleEmailInput = event => this.setState({email : event.target.value})
    handlePasswordInput = event => this.setState({password : event.target.value})

    handleFromSubmit = event => {
        event.preventDefault()
        const {state :{email , password} , props:{onLogin}} = this
        onLogin(email, password)
    }

    handleGoBack = event =>{
      event.preventDefault()
      this.props.history.push('/home')
    }

    render() {
        const {handleEmailInput,handlePasswordInput,handleFromSubmit, handleGoBack} = this
        const {feedback} = this.props
        return (

            <section className="login columns is-fullheight">
            <div className="container column is-6">
            <form onSubmit={handleFromSubmit}>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input onChange={handleEmailInput} className="input" type="email" placeholder="Email" required/>
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
                      <input onChange={handlePasswordInput} className="input" type="password" placeholder="Password" required/>
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div className="button-group">
                    <div className="field">
                        <button className="button is-success">Login</button>
                    </div>
                    <div className="field">
                        <button onClick={handleGoBack} className="button">Go back Home</button>
                    </div>
                  </div>


            </form>

            { feedback && <Feedback message={feedback} level="warn" /> }
            </div>
            </section>     
        )

        
    }
}

export default withRouter(Login)