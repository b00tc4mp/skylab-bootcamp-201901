import React, {Component, Fragment} from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { toast } from 'react-toastify';
import logic from '../../logic'

class UpdateUser extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConf: '', loginFeedback: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handlePasswordConfInput = event => this.setState({ passwordConf: event.target.value })
    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    //Aqui haría falta cargar el mail del usuario y dejarlo como no editable, el resto sí-.


    componentWillMount() {
        return logic.retrieveUser()
            .then(user => {
                this.setState({name: user.name})
                this.setState({surname: user.surname})
                this.setState({email: user.email})
                this.setState({password: user.password})
                this.setState({passwordConf: user.passwordConf})
            })
    }


    handleFormSubmit = (event) => {
        event.preventDefault()
        try {
            this.setState({ loginFeedback: '' })
            logic.updateUser(this.state.name, this.state.surname, this.state.email, this.state.password, this.state.passwordConf)
                .then(() => this.notify()) //Aquí dar feedback
                .catch(({ message }) => this.notify(message))
        } catch ({ message }) {
          this.notify(message)
        }
    }

    notify = (error) => {
        error ? 
        toast.warn("There was something wrong...", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
          })
          :
        toast.info("User Updated", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
          });
    }

    render() {
        return (
            <Fragment>
                <div className="coverright">
                    <div className="formcontact">
                        <form onSubmit={this.handleFormSubmit}>
                            <div>
                                <label htmlFor="uname"><b>Name</b></label>
                                <input type="text" value={this.state.name} placeholder="Name..." onChange={this.handleNameInput} required /> <br/>
                                <label htmlFor="psw"><b>Surname</b></label>
                                <input type="uname" value={this.state.surname} placeholder="Surname..." onChange={this.handleSurnameInput} required /><br/>
                                <label htmlFor="psw"><b>email</b></label>
                                <input type="email" value={this.state.email} onChange={this.handleEmailInput} required disabled/><br/>
                                <label htmlFor="psw"><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" onChange={this.handlePasswordInput} required /><br/> 
                                <label htmlFor="psw"><b>Password</b></label>
                                <input type="password" placeholder="Re-Enter Password" onChange={this.handlePasswordConfInput} required /><br/>
                                <div className="form-buttoncontainer">
                                    <button type="submit" className="btn btn-info">Update</button>
                                </div>
                                {this.state.loginFeedback && <Feedback message={this.state.loginFeedback} level="warn" />}
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default UpdateUser;