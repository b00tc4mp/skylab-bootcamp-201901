import React, { Component, Fragment } from 'react'
import { withRouter, Link} from 'react-router-dom'
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
                .then(({_id}) => logic.uploadMessagePhoto(image, _id))
                .then(() => this.props.history.push('/success'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        } 
    }

    render() {
        const { handleFormSubmit, handleInput, handleImageInput, handlePosition, handleInitialPosition, state: { users, feedback, selectedLat, selectedLng } } = this

        return <section className="sendMessage">
            <p>hola</p>
            {feedback && <Feedback message={ feedback } />}
            <form onSubmit={ handleFormSubmit }>
            <select name="userIdTo" onChange={ handleInput } >
                <option>Select user</option>
                {users && users.map(({ id, name, surname }) => <option value={id}>{`${name} ${surname} `}</option>)}
            </select>
                <textarea name="text" placeholder="Text" onChange={ handleInput } required />
                <input type="file" name="image" onChange={handleImageInput} placeholder="profile image" accept=".gif, .png, .jpeg" />
                <input type="date" name="launchDate" placeholder="Launch Date" onChange={ handleInput } required />
                <button>Submit</button>    
            </form>
            <Link to="/home">Back home</Link>
            <MapContainer retrievePosition={handlePosition} retrieveInitialPosition={handleInitialPosition}/>
        </section>
    }
}

export default withRouter(SendMessage)