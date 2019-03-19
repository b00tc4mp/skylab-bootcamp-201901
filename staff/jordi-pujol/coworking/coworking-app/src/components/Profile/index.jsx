import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic';
import Feedback from '../Feedback'

class Profile extends Component {

    state = { active: true, name: '', surname: '', email: '', companyName: '', username: '', image: null, age: '', time: null, feedback: null }

    componentWillMount() {
        logic.retrieveUser()
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

        logic.updateUserPhoto(image)
            .then(user => this.setState({ image: user.image }))
    }

    handleEditProfile = event => {
        event.preventDefault()

        if (this.state.active) this.setState({ active: false })
    }

    render() {

        const { state: { active, name, surname, email, companyName, age, username, time, image, feedback }, handleOnUploadPhoto, handleTimeInput, handleNameInput, handleSurnameInput, handleEmailInput, handleCompanyNameInput, handleInterestsInput, handleAgeInput, handleSubmitForm, handleEditProfile, handleImageInput } = this

        return <section className="profile">
            {/* <button className='btn btn--success' onClick={handleOnUploadPhoto}>Upload image</button> */}
            <div className="profile__content">
                <img className="backgroundImage" src={image} />
                <form className="profile__content--form">
                    {/* <input className='input--small' type='file' name='image' onClick={handleOnUploadPhoto}/> */}
                    {/* <img className="profile__content--form--userImage" src="https://pm1.narvii.com/6345/537c878cad3a8b3630df52f128b12ce5d3bcdf6b_00.jpg" /> */}
                    <div className="profile__content--form--inputs">
                        <input className="profile__content--name" type="text" value={name} disabled />
                        <input className="profile__content--company" type="text" value={companyName} disabled />
                    </div>
                </form>
                <input className='input--small' type='file' name='image' onChange={e => this.setState({ image: e.target.files[0] }, () => handleOnUploadPhoto())} />
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

{/* <section className="profile">
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
        </section> */}
