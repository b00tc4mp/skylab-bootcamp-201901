import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'

export default function Conversation ({ selectedChat }) {
    const [messages, setMessages] = useState()

    useEffect(() => {
        logic.messagesFromChat(selectedChat)
            .then(messages => setMessages(messages))
    }, [])
    console.log(messages)

    return (
        <Fragment>
            {/* {messages.map(message => {
                return <p>p</p>
            })} */}
        </Fragment>
    )
}