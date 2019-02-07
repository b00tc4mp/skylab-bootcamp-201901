import React,{Component} from 'react'
import Feedback from '../Feedback'

import { withRouter } from 'react-router-dom'

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
      this.props.history.push('/')
    }

    render() {
        const {handleEmailInput,handlePasswordInput,handleFromSubmit, handleGoBack} = this
        const {feedback} = this.props
        return (

            <section className="login columns is-fullheight">
            <div className="container column is-10">
            <form onSubmit={handleFromSubmit}>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input onChange={handleEmailInput} class="input" type="email" placeholder="Email" required/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input onChange={handlePasswordInput} class="input" type="password" placeholder="Password" required/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control">
                      <button class="button is-success">Login</button>
                    </p>
                  </div>
            </form>
                  <div class="field">
                    <p class="control">
                      <button onClick={handleGoBack} class="button is-info">Go back Home</button>
                    </p>
                  </div>
            { feedback && <Feedback message={feedback} level="warn" /> }
            </div>
            </section>     
        )

        
    }
}

export default withRouter(Login)