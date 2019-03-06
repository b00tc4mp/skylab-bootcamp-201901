import React, { Component } from 'react'

import logic from '../../logic';



class Register_Pet extends Component {

    state = { users: [], owner: null, name: '', specie: '', breed: '', color: '', gender: '', birthdate: '', microchip: '', petlicence: '', neutered: '', vaccionations: '', controls: '', details: '', isRegisterPet: false, error: null }

    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({ users })
    }

    handleSelectChange = async event => {
        event.preventDefault()
        const userId = event.target.value
        console.log(userId)
        if (!userId) return
        this.setState({ owner: userId })
    }

    componentDidMount() {
        this.retrieveUsers()
    }


    handleRegisterSubmit = event => {
        event.preventDefault()
        const { state: { owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details } } = this
        this.registerPet(owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)

    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }


    registerPet = async (owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details) => {
        try {
            await logic.registerPet(owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
            this.setState({ isRegisterPet: true, error: false })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {

        return <form onSubmit={this.handleRegisterSubmit}>
            <section class="form">
                <p className="title__form">Pet's details:</p>
                <div className="input__form">
                    <label>Select Owner</label>
                    <select name="owner" onChange={this.handleSelectChange}>
                        {this.state.users.map(user => <option name="owner" value={user.id}>{user.name}</option>)}
                    </select>
                </div>
                <div className="input__form">
                    <label>Name</label>
                    <input type="name" name="name" onChange={this.handleOnChange} required></input>
                </div>
                <div className="input__form">
                    <label>Specie</label>
                    <select name="specie" onChange={this.handleOnChange}>
                        <option>Select an option:</option>
                        <option name="specie" value="dog" onChange={this.handleOnChange}>Dog</option>
                        <option name="specie" value="cat" onChange={this.handleOnChange}>Cat</option>
                        <option name="specie" value="reptile" onChange={this.handleOnChange}>Reptile</option>
                    </select>
                    <div className="input__form">
                        <label>Breed</label>
                        <input type="text" name="breed" onChange={this.handleOnChange}></input>
                    </div>
                    <div className="input__form">
                        <label>Color</label>
                        <input type="text" name="color" onChange={this.handleOnChange} required></input>
                    </div>
                    <div className="input__form">
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
                    </div>

                    <div className="input__form">
                        <label>Birth Date</label>
                        <input onChange={this.handleOnChange} name="birthdate" type="date" placeholder="Birth Day" required />
                    </div>
                    <div className="input__form">
                        <label>Microchip</label>
                        <input type="microchip" name="microchip" onChange={this.handleOnChange}></input>
                    </div>
                    <div className="input__form">
                        <label>Pet licence</label>
                        <input type="petlicence" name="petlicence" onChange={this.handleOnChange}></input>
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
                    <div className="input__form">
                        <label>Vaccionations and booster shots:</label>
                        <textarea name="vaccionations" onChange={this.handleOnChange} rows="20"></textarea>
                    </div>
                    <div className="input__form">
                        <label>Veterinary controls:</label>
                        <textarea name="controls" onChange={this.handleOnChange} rows="20"></textarea>
                    </div>
                    <div className="input__form">
                        <label>Details of clinical interests:</label>
                        <textarea name="details" onChange={this.handleOnChange} rows="10"></textarea>
                    </div>

                    <button type="submit" class="button">Sign in</button>
                    <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
                    {this.state.error && <p className="feedback__Error">{this.state.error}</p>}
                    {this.state.isRegisterPet && <p className="feedback__Ok">You have successfully registered {this.state.name}</p>}
            
                </div>
            </section>
        </form>

            }
        }
        export default Register_Pet
