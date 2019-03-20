import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic';
import Feedback from '../Feedback'

class Profile extends Component {

    state = { active: true, name: '', surname: '', email: '', companyName: '', username: '', image: '', age: '', time: null, feedback: null }

    componentWillMount() {

        try{
            return logic.retrieveUser()
                .then(({ name, surname, email, companyName, username, age, time, image }) => {
                    this.setState({ name })
                    this.setState({ surname })
                    this.setState({ email })
                    this.setState({ companyName })
                    this.setState({ age })
                    this.setState({ username })
                    this.setState({ time })
                    this.setState({ image })
                })
                .catch(({message}) => this.setState({feedback: message}))
        }
        catch ({message}) {
            this.setState({feedback: message})
        }
    }


    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handleCompanyNameInput = event => this.setState({ companyName: event.target.value })

    handleAgeInput = event => this.setState({ age: event.target.value })

    handleInterestsInput = event => this.setState({ username: event.target.value })

    handleTimeInput = event => this.setState({ time: event.target.value })

    handleImageInput = event => this.setState({ image: event.target.files[0] })


    handleSubmitForm = event => {
        event.preventDefault()

        const { state: { name, surname, email, companyName, username, age, feedback } } = this

        try {
            return logic.updateUser({ name: name, surname: surname, companyName: companyName, age: age, username: username })
                .then(() => this.setState({ feedback: null, active: true }))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleOnUploadPhoto = event => {

        const { state: { image } } = this

        try {
            return logic.updateUserPhoto(image)
                .then(user => this.setState({ image: user.image }))
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

        const { state: { active, name, surname, email, companyName, age, username, time, image, feedback }, handleOnUploadPhoto, handleTimeInput, handleNameInput, handleSurnameInput, handleEmailInput, handleCompanyNameInput, handleInterestsInput, handleAgeInput, handleSubmitForm, handleEditProfile, handleImageInput } = this

        return <section className="profile">
            <div className="profile__content">
                <form className="profile__content--form">
                    {image ? <img className="profile__content--form--userImage" src={image} /> : <img className="profile__content--form--userImage" src="data:image/png;base64,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" />}
                    <div className="profile__content--form--inputs">
                        <input className="profile__content--name" type="text" value={name} disabled />
                        <input className="profile__content--company" type="text" value={companyName} disabled />
                    </div>
                    <input className="upload_image" type='file' name='image' onChange={e => this.setState({ image: e.target.files[0] }, () => handleOnUploadPhoto())} />
                </form>
                <div className="profile__info">
                    <form className="profile__button" onSubmit={handleEditProfile}>
                        <button className="edit">Edit Profile</button>
                    </form>
                    <form onSubmit={handleSubmitForm} className="profile__form">
                        <div>
                            <p>Name:</p>
                            <input className="profile__form--info" type="text" onChange={handleNameInput} value={name} disabled={active} />
                        </div>
                        <div>
                            <p>Surname:</p>
                            <input className="profile__form--info" type="text" onChange={handleSurnameInput} value={surname} disabled={active} />
                        </div>
                        <div>
                            <p>Username:</p>
                            <input className="profile__form--info" type="text" onChange={handleInterestsInput} value={username} disabled={active} />
                        </div>
                        <div>
                            <p>My Time:</p>
                            <input className="profile__form--info" type="text" onChange={handleTimeInput} value={time} disabled />
                        </div>
                        <div>
                            <p>Email:</p>
                            <input className="profile__form--info" type="email" onChange={handleEmailInput} value={email} disabled={true} />
                        </div>
                        <div>
                            <p>Company Name:</p>
                            <input className="profile__form--info" type="text" onChange={handleCompanyNameInput} value={companyName} disabled={active} />
                        </div>
                        <div>
                            <p>Age:</p>
                            <input className="profile__form--info" type="text" onChange={handleAgeInput} value={age} disabled={active} />
                        </div>
                        <button className="save" hidden={active}>Save Changes</button>
                    </form>
                </div>
            </div>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default withRouter(Profile)