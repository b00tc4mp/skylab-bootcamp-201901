import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic';
import Feedback from '../Feedback'

class OthersProfile extends Component {

    state = { name: '', surname: '', email: '', companyName: '', interests: '', age: '', feedback: null }

    componentWillMount() {

        const { props: { username } } = this

        logic.retrieveUserProfile(username)
            .then(({ name, surname, email, companyName, interests, age }) => {
                this.setState({ name })
                this.setState({ surname })
                this.setState({ email })
                this.setState({ companyName })
                this.setState({ age })
                this.setState({ interests })
            })
    }

    // componentWillReceiveProps() {
    //     const { props: { username } } = this

    //     logic.retrieveUserProfile(username)
    //     .then(({ name, surname, email, companyName, interests, age }) => {
    //         this.setState({ name })
    //         this.setState({ surname })
    //         this.setState({ email })
    //         this.setState({ companyName })
    //         this.setState({ age })
    //         this.setState({ interests })
    //     })
    // }


    render() {

        const { state: { name, surname, email, companyName, age, interests, feedback }, handleNameInput, handleSurnameInput, handleEmailInput, handleCompanyNameInput, handleInterestsInput, handleAgeInput } = this

        return <section className="profile">
            <div className="profile__content">
                <img className="backgroundImage" src="http://www.fabricaramis.com/imgs/imagenesFabricaRamis/banners/coworking.jpg" />
                <form className="profile__content--form">
                    <img className="profile__content--form--userImage" src="https://pm1.narvii.com/6345/537c878cad3a8b3630df52f128b12ce5d3bcdf6b_00.jpg" />
                    <div className="profile__content--form--inputs">
                        <input className="profile__content--name" type="text" value={name} disabled />
                        <input className="profile__content--company" type="text" value={companyName} disabled />
                    </div>
                </form>
                <div className="profile__info">
                    <h3>Basic Info</h3>
                    <form className="profile__form">
                        <div>
                            <label>Name:</label>
                            <input className="profile__form--info" type="text" onChange={handleNameInput} value={name} disabled />
                        </div>
                        <div>
                            <label>Surname:</label>
                            <input className="profile__form--info" type="text" onChange={handleSurnameInput} value={surname} disabled />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input className="profile__form--info" type="email" onChange={handleEmailInput} value={email} disabled={true} />
                        </div>
                        <div>
                            <label>Company Name:</label>
                            <input className="profile__form--info" type="text" onChange={handleCompanyNameInput} value={companyName} disabled />
                        </div>
                        <div>
                            <label>Age:</label>
                            <input className="profile__form--info" type="text" onChange={handleAgeInput} value={age} disabled />
                        </div>
                        <div>
                            <label>Interests:</label>
                            <textarea className="profile__form--info interests" type="text" onChange={handleInterestsInput} value={interests} disabled />
                        </div>
                    </form>
                </div>
            </div>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default withRouter(OthersProfile)