import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'

export default function Conversation ({ selectedChat }) {
    const [messages, setMessages] = useState()

    // useEffect(() => {
    //     window.scrollTo(300, 10000000000000000)
    // }, [])

    useEffect(() => {
        logic.retrieveUser()
            .then(({user}) => {
                logic.messagesFromChat(selectedChat)
                    .then(({messages}) => {
                        messages.map(message => {
                            if (message.userId === user.id) Object.defineProperty(message, 'who', { enumerable: true, configurable: true, writable: true, value: 'from-me' })
                            else Object.defineProperty(message, 'who', { enumerable: true, configurable: true, writable: true, value: 'from-someone' })
                        })
                        setMessages(messages)
                    })
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
                        })
                        setMessages(messages)
                    })
            })
    }

    setTimeout(reloadMessages, 3000)
 
    return (
        <Fragment>
            {window.scrollTo(0,document.body.scrollHeight)}
            <div className='conversation'>
                {messages && messages.length ? messages.map(({ userId, text, date, who }) => {
                    return <div className={`conversation__message conversation__message-${who}`}>
                        <p className={`conversation__message-txt conversation__message-txt-${who}`}>{text}</p>
                        <p className={`conversation__message-date conversation__message-date-${who}`}>{date.substring(12, 16)}</p>
                    </div>
                }) : <div className='conversation__none'>
                    <p>there are no messages in this chat, be the first one to send a message</p>
                </div>}
            </div> 
        </Fragment>
    )
}