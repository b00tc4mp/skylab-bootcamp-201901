import React, {Component, Fragment} from 'react'
import './index.sass'
import SideBar from '../sidebar';
class UpdateUser extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConf: '', loginFeedback: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handlePasswordConfInput = event => this.setState({ passwordConf: event.target.value })
    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    //Aqui haría falta cargar el mail del usuario y dejarlo como no editable, el resto sí-.
    render() {
        return (
            <Fragment>
                <div>
                    <SideBar/>
                </div>
                <div className="rightsidebar c_updateuser">
                    <form onSubmit={this.handleFormSubmit}>
                        <div >
                            <label htmlFor="uname"><b>Name</b></label>
                            <input type="text" value={this.state.name} placeholder="Name..." onChange={this.handleNameInput} required /> <br/>
                            <label htmlFor="psw"><b>Surname</b></label>
                            <input type="uname" value={this.state.surname} placeholder="Surname..." onChange={this.handleSurnameInput} required /><br/>
                            <label htmlFor="psw"><b>email</b></label>
                            <input type="email" value={this.state.email} placeholder="Enter email..." onChange={this.handleEmailInput} required readonly/><br/>
                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" value={this.state.password} placeholder="Enter Password" onChange={this.handlePasswordInput} required /><br/> 
                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" value={this.state.passwordConf} placeholder="Re-Enter Password" onChange={this.handlePasswordConfInput} required /><br/>
                            <div className="form-buttoncontainer">
                                <button type="submit" className="btn btn-info">Update</button>
                                <button type="button" className="btn btn-danger" onClick={this.goBack}>Cancel</button>
                            </div>
                            {/* <label>
                            <input type="checkbox" checked="checked" name="remember"/> Remember me
                            </label> */}
                        </div>
                        {/* {this.state.loginFeedback && <Feedback message={this.state.loginFeedback} level="warn" />} */}

                    </form>
                </div>
            </Fragment>
        )
    }
}
export default UpdateUser;