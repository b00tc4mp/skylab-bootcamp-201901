import React, { Component } from 'react'
import { withRouter, Link} from 'react-router-dom'
import MapContainer from '../MapContainer'
import Feedback from '../Feedback'
import logic from '../../logic';

class SendMessage extends Component {
    state = { text: '', launchDate: '', userIdTo: '', users: '', selectedLat: '', selectedLng: '', feedback: '' } 

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

    handlePosition = (lat,lng) => {
        this.setState({ selectedLat: lat, selectedLng: lng  })
    }

    handleFormSubmit = event => {
        event.preventDefault()
        
        const { state:{ text, launchDate, userIdTo, selectedLat, selectedLng } } = this
        
        try {
            logic.createMessage(userIdTo, launchDate, [selectedLat, selectedLng], text)
            .then(() => this.props.history.push('/success'))
            .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        } 
    }

    render() {
        const { handleFormSubmit, handleInput, handlePosition, state: { users, feedback } } = this

        return <section className="sendMessage">
            <p>hola</p>
            {feedback && <Feedback message={ feedback } />}
            <form onSubmit={ handleFormSubmit }>
            <select name="userIdTo" onChange={ handleInput }>
                <option>Select user</option>
                {users && users.map(({ id, name, surname }) => <option value={id}>{`${name} ${surname} `}</option>)}
            </select>
                <textarea name="text" placeholder="Text" onChange={ handleInput } required />
                <input type="date" name="launchDate" placeholder="Launch Date" onChange={ handleInput } />
                <button>Submit</button>    
            </form>
            <Link to="/home">Back home</Link>
            <MapContainer retrievePosition={handlePosition}/>
        </section>
    }
}

export default withRouter(SendMessage)