import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Feedback from '../Feedback'
import logic from '../../logic'

class Profile extends Component {
    state = { user: null, image: null, name: null, surname: null, email: null, feedback: null }

    componentWillMount() {
        try{
            logic.retrieveUser()
            .then(user => {
                this.setState({user})
                this.setState({ name: user.name })
                this.setState({ surname: user.surname })
                this.setState({ email: user.email })
            })
            .catch(({ message }) => this.setState({ feedback: `Couldn't retrieve users: Server ${message}` }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }  
    }

    handleInput = event => this.setState({[event.target.name] : event.target.value})

    handleImageInput = event => this.setState({image: event.target.files[0]})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { image, name, surname, email } } = this

        try {
            logic.updateUser(name, surname, email)
                .then(() => image && logic.updateUserPhoto(image))
                .then(() => this.props.history.push('/success'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { handleFormSubmit, handleImageInput, handleInput, state: { feedback, user, name, surname, email } } = this

        return <Fragment>
            {user &&
            <section className="profile">
                <p>Profile</p>
                <form onSubmit={ handleFormSubmit }>
                    <p><img src={user.image}/></p>
                    <input type="file" name="image" onChange={handleImageInput} placeholder="profile image" accept=".gif, .png, .jpeg" /> <br/>
                    <label htmlFor="uname"><b>Name</b></label>
                    <input type="text" value={name} name="name" onChange={handleInput} placeholder="name..." required /> <br/>
                    <label htmlFor="psw"><b>Surname</b></label>
                    <input type="uname" value={surname} name="surname" onChange={handleInput} required /><br/>
                    <label htmlFor="psw"><b>Email</b></label>
                    <input type="email" value={email} name="email" onChange={handleInput} required /><br/>
                    <button>Submit</button> 
                </form>
                <Link to="/home">Back home</Link>
                {feedback && <Feedback message={ feedback } />}
            </section>
        }
        </Fragment>
    }
}

export default withRouter(Profile)