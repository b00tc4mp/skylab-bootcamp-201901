import React,{Component} from 'react'



class Login extends Component {
    state = {email: '' , password: '' }

    handleEmailInput = event => this.setState({email : event.target.value})
    handlePasswordInput = event => this.setState({password : event.target.value})

    handleFromSubmit = event => {
        event.preventDefault()
        const {state :{email , password} , props:{onLogin}} = this
        onLogin(email, password)
    }


    render() {
        const {handleEmailInput,handlePasswordInput,handleFromSubmit} = this
        return (
            <section>
                <h1>Login</h1>
                <form onSubmit={handleFromSubmit}>
                    <label>E-mail:</label>
                    <input type="text" name="email" onChange={handleEmailInput}></input>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handlePasswordInput}></input>
                    <button>Login</button>
                </form>
            </section>
        )

        
    }
}

export default Login