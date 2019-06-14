import React, { useState } from 'react'
import Feedback from '../Feedback'
import logic from '../../logic'
import './index.sass'

export default function Reporter() {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [feedback, setFeedback] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()

        try {
            logic.sendReport({ subject, message })
                .then(res => {
                    if (res.status) {
                        setFeedback('Mail send it correctly')
                        setSubject('')
                        setMessage('')
                    }
                })
                .catch(error => setFeedback(error))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    return (<section className="section">
        <p>You can report any problem, incident or bug that has occurred during the course of use.</p>
        {feedback && <Feedback message={feedback} />}
        <form className="block reporter" onSubmit={e => handleSubmit(e)} >
            <div className="field">
                <label className="label">Subject</label>
                <div className="control">
                    <input type="text" className="input" placeholder="subject" value={subject} onChange={e => setSubject(e.target.value)} required />
                </div>
            </div>
            <div className="field">
                <label className="label">Message</label>
                <div className="control">
                    <textarea className="input reporter--message" value={message} onChange={e => setMessage(e.target.value)} required />
                </div>
            </div>
            <div className="field">
                <button className="button">Send</button>
            </div>
        </form>
    </section>)
}