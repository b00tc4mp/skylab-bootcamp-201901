import React, { Fragment, useState, useEffect} from 'react'
import logic from '../../logic'
import './index.sass'

export default function ChatsNav ({ setSelectedChat, setShowNav, setChatName }) {
    const [chats, setChats] = useState()
    //const [newMessages, setNewMessages] = useState()

    useEffect(() => {
        logic.userChats()
            .then(chats => {
                if (chats) setChats(chats.chats)
            })
    }, [])

    console.log(chats)

    return (
        <Fragment>
            <div className='chats-nav'>
                {chats ? <div className='chats-nav__chats'>
                    {chats.map(({ chatName, id,  message, userIds }) => {
                    return <div onClick={e => {e.preventDefault(); setSelectedChat(id); setChatName(chatName); setShowNav(false)}} className='chats-nav__chat'>
                        <div className='chats-nav__info'>
                            <div className='chats-nav__top'>
                                <p className='chats-nav__name'>{chatName}</p>
                                <p className='chats-nav__users'>{userIds.length} stranger</p>
                            </div>
                            {message && <div className='chats-nav__content'><p className='chats-nav__content-txt'>{message.text.substring(0, 15)}...</p><p className='chats-nav__content-date'>{message.date.substring(5, 9)}</p></div>}
                        </div>
                        <i className="fas fa-chevron-right chats-nav__arrow"/>
                    </div>
                    })}
                </div> : <div className='chats-nav__no-chats'>
                    <p>no chats to display</p>
                </div>}
                <div className='chats-nav__background' onClick={e => {e.preventDefault(); setShowNav(false)}}>

                </div>
            </div>
            
            {/* {chats && chats.map(({ userIds, chatName, eventId, id, message: { text, userId, date } } ) => {
                return <div onClick={e => {e.preventDefault(); setSelectedChat(id)}}>
                    <h2>{chatName}</h2>
                    <p>{text}</p>
                    <p>lalal</p>
                </div>
            })} */}
        </Fragment>
    )
}