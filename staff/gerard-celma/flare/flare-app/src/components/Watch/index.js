import React, { Component, Fragment } from 'react'
import { withRouter, Link} from 'react-router-dom'
import CanvasLetters from '../CanvasLetters'
import Feedback from '../Feedback'
import logic from '../../logic'
import './index.sass'


let userPosition

class Watch extends Component {
    state = { userMessages: null, feedback: null, matchedMessage: null }

    componentWillMount() {
        try {
            logic.retrieveReceivedMessages()
                .then(({ msgReceived }) => {
                    this.setState({ userMessages: msgReceived }, 
                    this.getPosition)
                })
                .catch(err => console.error(err))
        } catch(err) {
            console.error(err)
        }
    }

    getPosition() {
        
        if(navigator.geolocation) {
            userPosition = navigator.geolocation.watchPosition(this.captureBrowserPosition, this.geolocationError,
                {
                    timeout: 10000,
                    enableHighAccuracy: true, 
                    maximumAge: Infinity
                })
        }
    }

    captureBrowserPosition = (position) => {
        const { state:{ userMessages } } = this
 
        console.log(position)
        console.log(userMessages)

        userMessages.map(message => {
            let lowLatMessage = message.position[0] - 0.000150
            let highLatMessage = message.position[0] + 0.000150
            let lowLngMessage = message.position[1] - 0.000150
            let highLngMessage = message.position[1] + 0.000150

            let actualDate = new Date().toJSON().slice(0, 10)
            let _launchDate = message.launchDate.slice(0,10)

            if(((position.coords.latitude > lowLatMessage && position.coords.latitude < highLatMessage) && (position.coords.longitude > lowLngMessage && position.coords.longitude < highLngMessage)) && actualDate >= _launchDate) {
                // when match --> clear watchPosition and redirect to show message  
                navigator.geolocation.clearWatch(userPosition)
                this.props.history.push({
                    pathname: '/read-message',
                    state: { matchedMessage: message }
                  })
            }
        })
    }
    
    geolocationError = (err) =>{
        this.setState({ feedback: err.message })
    }

    handleBackClick = () => {
        // clear watchPosition
        navigator.geolocation.clearWatch(userPosition)
        this.props.history.push('/home')
    }


    render() {
        const { state: { userMessages, feedback }, handleBackClick } = this

        let getMessages = userMessages
        
        return <Fragment>
            {!getMessages && <div><i className="fas fa-spinner fa-pulse"></i><p>Loading Watch Mode</p></div>}
            {getMessages && <section className="watch">
                <button onClick={handleBackClick}>Stop Watch Mode</button>
                <div className="canvasLetters">
                <CanvasLetters />
                </div>
                {feedback && <Feedback message={ feedback } />}
            </section>
            }
        </Fragment>
    }
}

export default withRouter(Watch)