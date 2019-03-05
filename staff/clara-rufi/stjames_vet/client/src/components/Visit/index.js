import React, { Component } from 'react'
import logic from '../../logic'


class Visit extends Component {

    state = { vaccionations: '', controls: '', details: '', error: null }

    // handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    retrievePet = async (userId) => {
        const { vaccionations, controls, details } = await logic.retrievePet(userId)
        this.setState({ vaccionations, controls, details })
    }

    componentDidMount() {
        this.retrievePet()
    }


    // handleEditProfile = event => {
    //     event.preventDefault()
    //     const { state: { name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details } } = this
    //     this.editPet(name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
    // }


    // editProfile = async (name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details) => {
    //     try {
    //         debugger
    //         await logic.updatePet(name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
    //         console.log('edit user!!')
    //         // this.setState({isRegister: true, error: null})
    //     } catch ({ message }) {
    //         this.setState({ error: message })
    //     }
    // }

    retrievePet() {
        // server.get('/usersList', function(req, res) {
        // User.find({}, function(err, users) {
        //     var userMap = {};

        //     users.forEach(function(user) {
        //     userMap[user._id] = user;
        //     });

        //     res.send(userMap);  
        // });
        // }); 
    }

    render() {

        return <form className="register" onSubmit={this.handleRegisterSubmit}>
            <p className="title__form">Visit:</p>
            <div>
            <label>Select Owner</label>
            <select name="owner" onChange={this.handleOnChange}>
                <option>Select an option:</option>
                {/* <option name= "owner" value="name" onChange={this.handleOnChange}>user: users.map({ users.name }</option> */}
            </select>
            </div>
            <div>
            <label>Select Pet</label>
            <select name="owner" onChange={this.handleOnChange}>
                <option>Select an option:</option>
                {/* <option name= "owner" value="name" onChange={this.handleOnChange}>user: users.map({ users.name }</option> */}
            </select>
            </div>
           

                <div class="form-group">
                    <p className="title_register">Vaccionations and booster shots:</p>
                    <textarea value={this.state.vaccionations} class="form-control" name="vaccionations" onChange={this.handleOnChange} rows="20"></textarea>
                </div>
            
                <div class="form-group">
                    <p className="title_register">Veterinary controls:</p>
                    <textarea value={this.state.controls} class="form-control" name="controls" onChange={this.handleOnChange} rows="20"></textarea>
                </div>
                
                <div class="form-group">
                    <p className="title_register">Details of clinical interests:</p>
                    <textarea value={this.state.details} class="form-control" name="details" onChange={this.handleOnChange} rows="10"></textarea>
                </div>
            
            {/* <button type="submit" className="button">Edit</button> */}
            <button className="button" onClick={this.handleGoHome}>Go Home</button>
            {this.state.error && <p className="feedbackError">{this.state.error}</p>}
            {this.state.isRegister && <p className="feedbackOk">You have successfully edited !</p>}
            
            </form>
           
            
        }
    }

export default Visit
