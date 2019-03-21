import React, { Fragment, useState } from 'react'
import './index.sass'
import logic from '../../logic'
import Feedback from '../Feedback'

export default function HowTo ({setShowHowTo}) {
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState() 

    function handleDontShowHowTo() {
        try {
            logic.dontShowHowTo()
            .then(res => setShowHowTo(res.howTo))
            .catch(err => {
                setFeedback(err.message)
                setLevel('warning')
                setType('banner')
            })
        } catch ({message}) {
            setFeedback(message)
            setLevel('warning')
            setType('banner')
        }
    }

    return (
        <Fragment>
            <div className='how-to'>
                <div className='how-to__content'>
                    <i className="fas fa-times how-to__close" onClick={e => {e.preventDefault(); setShowHowTo(false)}}/>
                    <p className='how-to__info'>To create an event, just select any restaurant of your liking.<br/>After creating the event, you will have to call the restaurant and make a reservation under the reservation name you picked when creating the event.</p>
                    <button className='how-to__never' onClick={e => {e.preventDefault(); handleDontShowHowTo()}}>don't show again</button>
                </div>
            </div>
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </Fragment>
    )
}