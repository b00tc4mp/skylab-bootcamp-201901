import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic';
import Feedback from '../Feedback'

class Profile extends Component {

    state = { active: true, name: '', surname: '', email: '', companyName: '', interests: '', age: '', feedback: null }

    componentWillMount() {
        logic.retrieveUser()
            .then(({ name, surname, email, companyName, interests, age }) => {
                this.setState({ name })
                this.setState({ surname })
                this.setState({ email })
                this.setState({ companyName })
                this.setState({ age })
                this.setState({ interests })
            })
    }


    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handleCompanyNameInput = event => this.setState({ companyName: event.target.value })

    handleAgeInput = event => this.setState({ age: event.target.value })

    handleInterestsInput = event => this.setState({ interests: event.target.value })


    handleSubmitForm = event => {
        event.preventDefault()

        const { state: { name, surname, email, companyName, interests, age, feedback } } = this

        try {
            return logic.updateUser({ name: name, surname: surname, companyName: companyName, age: age, interests: interests })
                .then(() => this.setState({ feedback: null, active: true }))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleEditProfile = event => {
        event.preventDefault()

        if (this.state.active) this.setState({ active: false })
    }

    render() {

        const { state: { active, name, surname, email, companyName, age, interests, feedback }, handleNameInput, handleSurnameInput, handleEmailInput, handleCompanyNameInput, handleInterestsInput, handleAgeInput, handleSubmitForm, handleEditProfile } = this

        return <section className="profile">
            <h2>Profile</h2>
            <div className="profile__content">
                <div className="profile__content--img">
                    <p>Profile Image</p>
                    <img src="https://pm1.narvii.com/6345/537c878cad3a8b3630df52f128b12ce5d3bcdf6b_00.jpg" />
                </div>
                <div className="">
                    <h3>Basic Info</h3>
                    <form onSubmit={handleSubmitForm} className="profile__form">
                        <div>
                            <label>Name</label>
                            <input className="profile__form--info" type="text" onChange={handleNameInput} value={name} disabled={active} />
                        </div>
                        <div>
                            <label>Surname</label>
                            <input className="profile__form--info" type="text" onChange={handleSurnameInput} value={surname} disabled={active} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input className="profile__form--info" type="email" onChange={handleEmailInput} value={email} disabled={true} />
                        </div>
                        <div>
                            <label>Company Name</label>
                            <input className="profile__form--info" type="text" onChange={handleCompanyNameInput} value={companyName} disabled={active} />
                        </div>
                        <div>
                            <label>Age</label>
                            <input className="profile__form--info" type="text" onChange={handleAgeInput} value={age} disabled={active} />
                        </div>
                        <div>
                            <label>Interests</label>
                            <textarea className="profile__form--info interests" type="text" onChange={handleInterestsInput} value={interests} disabled={active} />
                        </div>
                        <button>Save Changes</button>
                    </form>
                    <form onSubmit={handleEditProfile}>
                        <button>Edit info</button>
                    </form>
                </div>
            </div>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default withRouter(Profile)