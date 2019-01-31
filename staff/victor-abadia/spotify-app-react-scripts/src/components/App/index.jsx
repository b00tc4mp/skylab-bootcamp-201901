'use strict'

class App extends React.Component {
    state = { loginVisible: true, registerVisible: false, homeVisible: false }

    handleClickRegisterButton = () => {
        this.setState({ loginVisible: false, registerVisible: true });
    };

    handleClickLoginButton = () => {
        this.setState({ loginVisible: true, registerVisible: false });
    };

    handleLogin = (thisEmail, thisPassword) => {
        try {
            logic.login(thisEmail, thisPassword, (user) => {

                this.setState({ loginVisible: false, homeVisible: true })

            })
        } catch (error) {
            console.log(error.message)
        }

    }

    handleRegister = (thisName, thisSurname, thisEmail, thisPassword, thisPasswordConfirmation) => {
        try {
            logic.register(thisName, thisSurname, thisEmail, thisPassword, thisPasswordConfirmation, () => {
                this.setState({ loginVisible: true, registerVisible: false })
            })
        } catch (error) {
            console.log(error.message)
        }

    }

    render() {
        return <div>
            {this.state.loginVisible && <Login onHandleSubmit={this.handleLogin} changePageFunc={this.handleClickRegisterButton} />}
            {this.state.registerVisible && <Register onHandleSubmit={this.handleRegister} changePageFunc={this.handleClickLoginButton} />}
            {this.state.homeVisible && <Home />}
        </div>
    }
}