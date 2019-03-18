import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import ChatsNav from '../ChatsNav'
import Conversation from '../Conversation'
import MessageSubmit from '../MessageSubmit'
import NavBar from '../NavBar'
import { format } from 'util';

export default function Chats ({ setShowRightBar, setShowDropdown }) {
    const [selectedChat, setSelectedChat] = useState(false)
    const [mobile, setMobile] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const [chatName, setChatName] = useState()
    const [message, setMessage] = useState()

    useEffect(() => {
        if (window.innerWidth < 1200) setMobile(true)
    }, [window.innerWidth])

    const handleSendMessage = () => {
        logic.addMessageToChat(selectedChat, message)
            .catch(err => console.log(err)) //set feedback
    }

    return (
        <Fragment>
            <NavBar setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            <div className='chats'>
                {showNav && <ChatsNav setSelectedChat={setSelectedChat} setShowNav={setShowNav} setChatName={setChatName}/>}
                {!mobile && <ChatsNav setSelectedChat={setSelectedChat} setShowNav={setShowNav} setChatName={setChatName}/>}
                {mobile && !showNav && <div className='chats__to-nav' onClick={e => {e.preventDefault(); setShowNav(true)}}><p className='chats__to-nav-txt'>chats <i class="fas fa-chevron-right"></i></p></div>}
                <div>
                    {selectedChat ? <div>
                        <div className='chats__header'>
                            <p className='chats__header-name'>{chatName}</p>
                        </div>
                        <Conversation selectedChat={selectedChat}/>
                        <div className='chats__submit'>
                            <input className='chats__submit-input' type='text' onChange={e => {e.preventDefault(); setMessage(e.target.value)}}></input>
                            <button className='chats__submit-button' onClick={e => {e.preventDefault(); handleSendMessage()}}>send</button>
                        </div>
                    </div> : <div className='chat__no-messages'>
                        <p className='chat__no-messages-title'>select a chat to view it's messages</p>
                        <i className="far fa-comments chat__no-messages-logo"></i>
                    </div>}
                </div>
            </div>
        </Fragment>
    )
}