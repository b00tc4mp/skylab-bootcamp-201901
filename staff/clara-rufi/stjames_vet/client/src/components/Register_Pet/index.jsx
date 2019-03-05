import React, { Component } from 'react'
import './index.sass'
import logic from '../../logic';



class Register_Pet extends Component {

    state = { name: '', specie: '', breed: '', color: '', gender: '', birthdate: '', microchip: '', petlicence: '', neutered: '', vaccionations: '', controls: '', details: '', error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    handleRegisterSubmit = event => {
        event.preventDefault()
        const { state: { name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details} } = this
        this.registerPet({ name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details })

    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }


    registerPet = async (name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details) => {
        try {
            console.log('logged', logic.__userId__)
            debugger
            await logic.registerPet(name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
            console.log('logged', logic.__userId__)
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {

        return <form className="register" onSubmit={this.handleRegisterSubmit}>
            <p className="title__form">Pet's details:</p>
            <label>Select Owner</label>
             <select name="owner" onChange={this.handleOnChange}>
            <option>Select an option:</option>
            {/* <option name= "owner" value="name" onChange={this.handleOnChange}>user: users.map({ users.name }</option> */}
            </select>    
            <div className="form-group row">
                <label for="validationDefault01" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-7">
                    <input type="name" name="name" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>

            {/* server.get('/usersList', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });
}); */}
      
            <label>Specie</label>
             <select name="specie" onChange={this.handleOnChange}>
            <option>Select an option:</option>
            <option name="specie" value="dog" onChange={this.handleOnChange}>Dog</option>
            <option name="specie" value="cat" onChange={this.handleOnChange}>Cat</option>
            <option name="specie" value="reptile" onChange={this.handleOnChange}>Reptile</option>
            </select>

            <div className="form-group row">
                <label for="validationDefault01" className="col-sm-2 col-form-label">Breed</label>
                <div className="col-sm-7">
                    <input type="breed" name="breed" onChange={this.handleOnChange} className="form-control" id="inputEmail3" ></input>
                </div>
            </div>
            <div className="form-group row">
                <label for="validationDefault01" className="col-sm-2 col-form-label">Color</label>
                <div className="col-sm-7">
                    <input type="name" name="color" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>
  
            <label>Gender</label>
                <div className="radio">
                    <label>
                        <input type="radio" name="gender" value="male" onChange={this.handleOnChange} />
                    male
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="gender" value="female" onChange={this.handleOnChange} />
                    female
                    </label>
                </div>
  
            <div className='form-group row'>
                <label for="validationDefault01" className="col-sm-2 col-form-label">Birth Date</label>
                <div className="col-sm-7">
                <input onChange={this.handleOnChange} name="birthdate" type="date" className="form-control" placeholder="Birth Day" required />
            </div>
            </div>
            <div className="form-group row">
                <label for="validationDefault01" className="col-sm-2 col-form-label">Microchip</label>
                <div className="col-sm-7">
                    <input type="microchip" name="microchip" onChange={this.handleOnChange} className="form-control" id="inputEmail3"></input>
                </div>
            </div>
            <div className="form-group row">
                <label for="validationDefault01" className="col-sm-2 col-form-label">Pet licence</label>
                <div className="col-sm-7">
                    <input type="petlicence" name="petlicence" onChange={this.handleOnChange} className="form-control" id="inputEmail3"></input>
                </div>
            </div>
   
            <label>Neutered</label>
            <div className="radio">  
                <label>
                    <input type="radio" name="neutered" value="yes" onChange={this.handleOnChange} />
                yes
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" name="neutered" value="no" onChange={this.handleOnChange} />
                no
                </label>
            </div>
            <div class="col-lg-3">
            <div class="form-group">
            <p className="title_register">Vaccionations and booster shots:</p>
                <textarea class="form-control" name="vaccionations" onChange={this.handleOnChange} rows="20"></textarea>
            </div>
            <div class="form-group">
            <p className="title_register">Veterinary controls:</p>
                <textarea class="form-control" name= "controls" onChange={this.handleOnChange} rows="20"></textarea>
            </div>
            <div class="form-group">
            <p className="title_register">Details of clinical interests:</p>
                <textarea class="form-control" name="details" onChange={this.handleOnChange} rows="10"></textarea>
            </div> 
            </div>
                <button type="submit" class="btn btn-primary login">Sign in</button>
                <button className="goHome" onClick={this.handleGoHome}>GoHome</button>
                {this.state.error && <p className= "feedbackError">{this.state.error}</p>} 
                {this.state.isRegister && <p className= "feedbackOk">You have successfully registered!</p>}
            </form>

    }
}
export default Register_Pet
