import React, {Component} from 'react'
import logic from '../../logic'


class EditOwner extends Component {

    state = { users: [], name: '', surname: '', idCard: '', phone: '',  adress: '', city: '', email: '', error: null }
    
    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })
    
        retrieveUsers = async () => {
            const users = await logic.retrieveUsers()
            this.setState({users})
        }

        retrieveUser = async () => {
            const user = await logic.retrieveUser()
            this.setState({user})

        }

        handleSelectChange = async event => {
            debugger
            event.preventDefault()
            const userId = event.target.value
            console.log(userId)
            const users = await logic.retrieveUser(userId)
            this.setState({users})
        }

        componentDidMount() {
            this.retrieveUsers()
        }


        handleEditProfile = event => {
            event.preventDefault()
            const { state: { name, surname, idCard, phone, adress, city, email} } = this
            this.editProfile(name, surname, idCard, phone, adress, city, email)
        }


        editProfile = async (name, surname, idCard, phone, adress, city, email) => {
            try {
                debugger
                await logic.updateUser(name, surname, idCard, phone, adress, city, email)
                console.log('edit user!!')
                // this.setState({isRegister: true, error: null})
            } catch ({ message }) {
                this.setState({ error: message })
            }
        }

        handleGoHome = event => {
            event.preventDefault()
            this.props.history.push('/home')
        }

        // handleSelect = event =>{
           
        //     user.find({}, function(err, users){
        //         users.forEach(function(user){
        //             userMap[user.name] = user
        //         })
        //         res.sent(userMap)
        //     })
        // }
        /* server.get('/usersList', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });
}); */
        render(){

        return <form className="register" onSubmit={this.handleEditProfile} >
        <p className="title__form">Owner's details:</p>
        <label onClick={this.handleSelect}>Select Owner</label>
            <select name="owner" onChange={this.handleSelectChange}>
                <option>Select an option:</option>
                {this.state.users.map(user => <option name= "owner" value={user.id}>{user.name}</option>)}
            </select>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-7">
                <input value={this.state.name} type="name" name="name" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required/>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label" required>Surname</label>
            <div className="col-sm-7">
                <input value={this.state.surname} type="surname" name="surname" onChange={this.handleOnChange} className="form-control" id="inputPassword3" required></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Id Card</label>
            <div className="col-sm-7">
                <input value={this.state.idCard} type="idCard" name="idCard" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Phone</label>
            <div className="col-sm-7">
                <input value={this.state.phone} type="phone" name="phone" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Adress</label>
            <div className="col-sm-7">
                <input value={this.state.adress} type="adress" name="adress" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">City</label>
            <div className="col-sm-7">
                <input value={this.state.city} type="city" name="city" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
            </div>
        </div>
      
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-7">
                <input value={this.state.email} type="email" name="email" onChange={this.handleOnChange} className="form-control" id="inputPassword3" required></input>
            </div>
        </div>
        <button type="submit" className="button">Sign in</button>
        <button className="button" onClick={this.handleGoHome}>Go Home</button>
        {this.state.error && <p className= "feedbackError">{this.state.error}</p>} 
        {this.state.isRegister && <p className= "feedbackOk">You have successfully registered!</p>}
    </form>
    }
}


export default EditOwner