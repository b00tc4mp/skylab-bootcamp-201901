import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import BouncingLoader from '../BouncingLoader'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter (function Conversation ({ selectedChat, history }) {
    const [messages, setMessages] = useState()

    // useEffect(() => {
    //     window.scrollTo(300, 10000000000000000)
    // }, [])

    useEffect(() => {
        //reloadMessages()
        //window.scrollTo(300, 10000000)
        logic.retrieveUser()
            .then(({user}) => {
                logic.messagesFromChat(selectedChat)
                    .then(({messages}) => {
                        messages.map(message => {
                            if (message.userId === user.id) Object.defineProperty(message, 'who', { enumerable: true, configurable: true, writable: true, value: 'from-me' })
                            else Object.defineProperty(message, 'who', { enumerable: true, configurable: true, writable: true, value: 'from-someone' })

                            logic.retrieveUserWithId(message.userId)
                                .then(({user}) => {
                                    Object.defineProperty(message, 'username', { enumerable: true, configurable: true, writable: true, value: user.username })
                                    //console.log(message)
                                })
                        })
                        //setMessages(messages)
                    })
                    .then(() => {setMessages(messages)})
            })
    }, [selectedChat])

    function reloadMessages () {
        //window.scrollTo(300, 10000000000000000)
        logic.retrieveUser()
            .then(({user}) => {
                logic.messagesFromChat(selectedChat)
                    .then(({messages}) => {
                        messages.map(message => {
                            if (message.userId === user.id) Object.defineProperty(message, 'who', { enumerable: true, configurable: true, writable: true, value: 'from-me' })
                            else Object.defineProperty(message, 'who', { enumerable: true, configurable: true, writable: true, value: 'from-someone' })

                            logic.retrieveUserWithId(message.userId)
                                .then(({user}) => {
                                    Object.defineProperty(message, 'username', { enumerable: true, configurable: true, writable: true, value: user.username })
                                    //console.log(message)
                                })
                        })
                        setMessages(messages)
                    })
            })
    }

    setTimeout(reloadMessages, 3000)
 
    return (
        <Fragment>
            <div className='conversation'>
                {messages ? messages.length ? messages.map(({ userId, text, date, who, username }) => {
                    return <div className={`conversation__message conversation__message-${who}`}>
                        <div onClick={e => {e.preventDefault(); history.push(`/user/${userId}`); console.log('click')}}><p>{username}</p></div>
                        <p className={`conversation__message-txt conversation__message-txt-${who}`}>{text}</p>
                        <p className={`conversation__message-date conversation__message-date-${who}`}>{date.substring(12, 16)}</p>
                    </div>
                }) : //<BouncingLoader/>}
                <div className='conversation__none'>
                    <p>there are no messages in this chat, be the first one to send a message</p>
                </div> : <BouncingLoader/>}
            </div> 
        </Fragment>
    )
})