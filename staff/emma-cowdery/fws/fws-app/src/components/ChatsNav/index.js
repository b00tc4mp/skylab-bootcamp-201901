import React, { Fragment, useState, useEffect} from 'react'
import logic from '../../logic'
import './index.sass'

export default function ChatsNav ({ setSelectedChat }) {
    const [chats, setChats] = useState()
    //const [newMessages, setNewMessages] = useState()

    useEffect(() => {
        logic.userChats()
            .then(chats => setChats(chats.chats))
    }, [])

    //console.log(chats)
    return (
        <Fragment>
            {chats && chats.map(({ userIds, chatName, eventId, id, message: { text, userId, date } } ) => {
                return <div onClick={e => {e.preventDefault(); setSelectedChat(id)}}>
                    <h2>{chatName}</h2>
                    <p>{text}</p>
                </div>
            })}
        </Fragment>
    )
}