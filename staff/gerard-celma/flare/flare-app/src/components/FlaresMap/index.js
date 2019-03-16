import React, { Component, Fragment } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import logic from '../../logic'
import './index.sass'

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
        <Header />
        <div className="flaresMap">
            {!markers && <div><i className="fas fa-spinner fa-pulse"></i><p>Loading Map</p></div>}
            {markers &&
            <div className="flaresMapGoogle">
                <Map
                google={this.props.google}
                style={{
                width: "100%",
                height: "100%"
                }}
                initialCenter = {{
                lat: 41.3983838,
                lng: 2.199942128836028
                }}
                zoom={2.2}
            >
                {this.state.markers.map((marker) => (
                    <Marker
                    title = { marker.title }
                    position = {{ lat: marker.position[0], lng: marker.position[1] }}
                    name = { marker.name }
                    />
                ))}
            </Map>
            </div>
            }
        </div>
    </Fragment>
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAaqKkPfqRQS0OKc8Q2Y8pNnvhXbUyj3wI')
  })(FlaresMap)