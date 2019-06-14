import React, { Component, Fragment } from 'react'
import { withRouter, Link} from 'react-router-dom'
import Header from '../Header'
import MapContainer from '../MapContainer'
import Feedback from '../Feedback'
import logic from '../../logic';

class SendMessage extends Component {
    state = { text: '', image: null, launchDate: '', userIdTo: '', users: '', selectedLat: '', selectedLng: '', feedback: '' } 

    componentDidMount() {
        try{
            logic.retrieveUsers()
            .then(users => this.setState({users}))
            .catch(({ message }) => this.setState({ feedback: `Couldn't retrieve users: Server ${message}` }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }  
    }

    handleInput = event => this.setState({[event.target.name] : event.target.value})

    handleImageInput = event => this.setState({image: event.target.files[0]})

    handleInitialPosition = (lat,lng) => {
        this.setState({ selectedLat: lat, selectedLng: lng  })
    }

    handlePosition = (lat,lng) => {
        this.setState({ selectedLat: lat, selectedLng: lng  })
    }

    handleFormSubmit = event => {
        event.preventDefault()
        
        const { state:{ text, image, launchDate, userIdTo, selectedLat, selectedLng } } = this
        
        try {
            logic.createMessage(userIdTo, launchDate, [selectedLat, selectedLng], text)
                .then(({_id}) => image && logic.uploadMessagePhoto(image, _id))
                .then(() => this.props.history.push('/success'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        } 
    }

    render() {
        const { handleFormSubmit, handleInput, handleImageInput, handlePosition, handleInitialPosition, state: { users, feedback, selectedLat, selectedLng } } = this

        return <Fragment>
            <Header />
            <section className="sendMessage">
                <div className="sendMessageBox">
                    <h2>Send Message</h2>
                    <form className="sendMessageForm" onSubmit={ handleFormSubmit }>
                        <div class="custom-select">
                            <select name="userIdTo" onChange={ handleInput } >
                                <option>Click to select user</option>
                                {users && users.map(({ id, name, surname }) => <option value={id}> {` ${name} ${surname} `}</option>)}
                            </select>
                        </div>
                        <textarea name="text" placeholder="Text" onChange={ handleInput } required />
                        <input type="file" name="image" onChange={handleImageInput} placeholder="profile image" accept=".gif, .png, .jpeg" />
                        <input type="date" name="launchDate" placeholder="Launch Date" onChange={ handleInput } required />
                        <div className="mapSendMessage">
                        <MapContainer retrievePosition={handlePosition} retrieveInitialPosition={handleInitialPosition}/>
                        </div>
                        <button>Submit</button>    
                    </form>
                    <p>Send later? go back <Link to="/home">home</Link></p>
                    {feedback && <Feedback message={ feedback } />}
                </div>
            </section>
        </Fragment>
    }
}

export default withRouter(SendMessage)