import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import BouncingLoader from '../BouncingLoader'
import { withRouter, Route, Redirect } from 'react-router-dom'
import Feedback from '../Feedback'

export default withRouter (function Conversation ({ selectedChat, history }) {
    const [messages, setMessages] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState() 

    useEffect(() => {
        reloadMessages()
    }, [selectedChat])

    function reloadMessages () {
        try {
            logic.retrieveUser()
            .then(({user}) => {
                logic.messagesFromChat(selectedChat)
                    .then(({messages}) => {
                        let mapping = messages.map(message => {
                            if (message.userId === user.id) Object.defineProperty(message, 'who', { enumerable: true, configurable: true, writable: true, value: 'from-me' })
                            else Object.defineProperty(message, 'who', { enumerable: true, configurable: true, writable: true, value: 'from-someone' })

                            return logic.retrieveUserWithId(message.userId)
                                .then(({user}) => {
                                    message.username = user.username
                                    return message
                                })
                                .catch(err => {
                                    setFeedback(err.message)
                                    setLevel('warning')
                                    setType('banner')
                                })
                            })

                        return Promise.all(mapping).then(messages => setMessages(messages))

                    })
                    .catch(err => {
                        setFeedback(err.message)
                        setLevel('warning')
                        setType('banner')
                    })
            })
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

    setTimeout(reloadMessages, 3000)
 
    return (
        <Fragment>
            <div className='conversation'>
                {messages ? messages.length ? messages.map(({ userId, text, date, who, username }) => {
                    return <div className={`conversation__message conversation__message-${who}`}>
                        <div onClick={e => {e.preventDefault(); history.push(`/user/${userId}`); console.log('click')}}><p className='conversation__message-username'>{username}</p></div>
                        <p className={`conversation__message-txt conversation__message-txt-${who}`}>{text}</p>
                        <p className={`conversation__message-date conversation__message-date-${who}`}>{date.substring(12, 16)}</p>
                    </div>
                }) :
                <div className='conversation__none'>
                    <p>there are no messages in this chat, be the first one to send a message</p>
                </div> : <BouncingLoader/>}
            </div> 
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </Fragment>
    )
})