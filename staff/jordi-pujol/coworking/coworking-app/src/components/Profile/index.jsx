import React, { Component } from 'react'
import {Route, withRouter} from 'react-router-dom'
import logic from '../../logic';

class Profile extends Component {

    state = { active: true, name:'', surname:'', email:'', companyName:''}

    componentWillMount() {
        logic.retrieveUser()
            .then(({name, surname, email})=>{
                this.setState({name})
                this.setState({surname})
                this.setState({email})
            })
    }


    handleNameInput = event => this.setState({name: event.target.value})

    handleSurnameInput = event => this.setState({surname: event.target.value})

    handleEmailInput = event => this.setState({email: event.target.value})

    handleCompanyNameInput = event => this.setState({companyName: event.target.value})


    handleSubmitForm = event => {
        event.target.value()

        const {state: {name, surname, email, companyName}} = this

        // call logic updateUser
    }

    handleEditProfile = event => {
        event.preventDefault()

        this.setState({active: false})
    }

    render() {

        const { state: {active, name, surname, email}, handleNameInput, handleSurnameInput, handleEmailInput, handleCompanyNameInput, handleSubmitForm, handleEditProfile} = this

        return <section className="profile">
            <h2>Profile</h2>
            <h3>Basic Info</h3>
                <form onSubmit={handleSubmitForm} className="profile__form">
                    <input className="profile__form--info" type="text" onChange={handleNameInput} placeholder={name} disabled={active}/>
                    <input className="profile__form--info"type="text" onChange={handleSurnameInput} placeholder={surname} disabled={active}/>
                    <img url="https://pm1.narvii.com/6345/537c878cad3a8b3630df52f128b12ce5d3bcdf6b_00.jpg"></img>
                    <input className="profile__form--info" type="email" onChange={handleEmailInput} placeholder={email}/>
                    <input className="profile__form--info" type="text" onChange={handleCompanyNameInput}/>
                    <button>Save Changes</button>
                </form>
                <form onSubmit={handleEditProfile}>
                    <button>Edit info</button>
                </form>
        </section>
    }
}

export default withRouter(Profile)