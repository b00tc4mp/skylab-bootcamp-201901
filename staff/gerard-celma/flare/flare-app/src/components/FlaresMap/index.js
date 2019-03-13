import React, { Component, Fragment } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { Link } from 'react-router-dom'
import Feedback from '../Feedback'
import logic from '../../logic';

class FlaresMap extends Component {
    state = { markers: null, feedback: null }
      
    componentWillMount() {
        try {
        logic.retrieveAllMessages()
            .then(messages => {
                this.setState({ markers: messages })
            })
            .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
    const { state: { markers, feedback } } = this

    return <Fragment>
        <Link to="/home">Back home</Link>
        {!markers && <div><i className="fas fa-spinner fa-pulse"></i><p>Loading Map</p></div>}
        {markers &&
        <Map
            google={this.props.google}
            style={{
            width: "1200px",
            height: "600px"
            }}
            initialCenter = {{
            lat: 41.3983838,
            lng: 2.199942128836028
            }}
            zoom={2.5}
        >
            {this.state.markers.map((marker) => (
                <Marker
                title = { marker.title }
                position = {{ lat: marker.position[0], lng: marker.position[1] }}
                name = { marker.name }
                />
            ))}
        </Map>
        }
        {feedback && <Feedback message={feedback} />}
    </Fragment>
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAaqKkPfqRQS0OKc8Q2Y8pNnvhXbUyj3wI')
  })(FlaresMap)