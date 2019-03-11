import React, { useState } from 'react'
import logic from '../../logic'


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
                        setFeedback('Mail send it correctyl')
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
        {feedback && <p>{feedback}</p>}
        <form className="block" onSubmit={e => handleSubmit(e)} >
            <div className="field">
                <label className="label">Subject</label>
                <div className="control">
                    <input type="text" className="input" placeholder="subject" value={subject} onChange={e => setSubject(e.target.value)} required />
                </div>
            </div>
            <div className="field">
                <label className="label">Subject</label>
                <div className="control">
                    <textarea className="input" value={message} onChange={e => setMessage(e.target.value)} required />
                </div>
            </div>
            <div className="field">
                <button className="button">Send</button>
            </div>
        </form>
    </section>)
}