import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import ChatsNav from '../ChatsNav'
import Conversation from '../Conversation'
import MessageSubmit from '../MessageSubmit'

export default function Chats () {
    const [selectedChat, setSelectedChat] = useState()

    console.log(selectedChat)

    return (
        <Fragment>
            <ChatsNav setSelectedChat={setSelectedChat}/>
            <div>
                {selectedChat && <Conversation selectedChat={selectedChat}/>}
                {/* <MessageSubmit/> */}
            </div>
        </Fragment>
    )
}