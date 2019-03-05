import React, { Component } from 'react'
import './index.sass'
import logic from '../../logic';



class Register_Pet extends Component {

    state = { users: [], name: '', specie: '', breed: '', color: '', gender: '', birthdate: '', microchip: '', petlicence: '', neutered: '', vaccionations: '', controls: '', details: '', isRegister: false ,error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({users})
    }

    handleSelectChange = async event => {
        event.preventDefault()
        const userId = event.target.value 
        if (!userId) return
        const {name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details} = await logic.retrieveUser(userId)
        this.setState({name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details})
    }

    componentDidMount(){
        this.retrieveUsers()
    }


    handleRegisterSubmit = event => {
        debugger
        event.preventDefault()
        const { state: { name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details} } = this
        this.registerPet({ name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details })

    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/')
    }


    registerPet = async (name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details) => {
        try {
            await logic.registerPet(name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
            this.setState({isRegister: true})
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {

        return <form className="register" onSubmit={this.handleRegisterSubmit}>
            <p className="title__form">Pet's details:</p>
            <label>Select Owner</label>
             <select name="owner" onChange={this.handleSelectChange}>
             {this.state.users.map(user => <option name= "owner" value={user.id}>{user.name}</option>)}
            </select>    
            <div className="form-group row">
                <label for="validationDefault01" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-7">
                    <input type="name" name="name" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
                </div>
            </div>
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
           
            <button type="button" class="btn btn-primary login">Sign in</button>
            <button className="button__home" onClick={this.handleGoHome}>Go Home</button>
            {this.state.error && <p className= "feedbackError">{this.state.error}</p>} 
            {this.state.isRegister && <p className= "feedback__Ok">You have successfully registered {this.state.name}</p>}
            </div>
        </form>

    }
}
export default Register_Pet
