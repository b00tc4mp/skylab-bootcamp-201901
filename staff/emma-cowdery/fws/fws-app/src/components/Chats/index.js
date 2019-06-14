import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import ChatsNav from '../ChatsNav'
import Conversation from '../Conversation'
import NavBar from '../NavBar'
import Feedback from '../Feedback'

export default function Chats ({ setShowRightBar, setShowDropdown }) {
    const [selectedChat, setSelectedChat] = useState(false)
    const [mobile, setMobile] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const [chatName, setChatName] = useState()
    const [message, setMessage] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState() 

    useEffect(() => {
        if (window.innerWidth < 1200) setMobile(true)
    }, [])

    const handleSendMessage = () => {
        try {
            logic.addMessageToChat(selectedChat, message)
            .then(()=> setMessage(''))
            .then(() => window.scrollTo(0, 100000000))
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

    return (
        <Fragment>
            <NavBar setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            <div className='chats'>
                {showNav && <ChatsNav setSelectedChat={setSelectedChat} setShowNav={setShowNav} setChatName={setChatName}/>}
                {!mobile && <div className='chats__nav'><ChatsNav setSelectedChat={setSelectedChat} setShowNav={setShowNav} setChatName={setChatName}/></div>}
                {mobile && !showNav && <div className='chats__to-nav' onClick={e => {e.preventDefault(); setShowNav(true)}}><p className='chats__to-nav-txt'>chats <i className="fas fa-chevron-right"></i></p></div>}
                <div className='chats__messaging'>
                    {selectedChat ? <div>
                        <div className='chats__header'>
                            <p className='chats__header-name'>{chatName}</p>
                        </div>
                        <Conversation selectedChat={selectedChat}/>
                        <form className='chats__submit' onSubmit={e => {e.preventDefault(); handleSendMessage()}}>
                            <input className='chats__submit-input' type='text' value={message} onChange={e => {e.preventDefault(); setMessage(e.target.value)}}></input>
                            <button className='chats__submit-button' type='submit'>send</button>
                        </form>
                    </div> : <div className='chats__no-messages'>
                        <p className='chats__no-messages-title'>select a chat to view it's messages</p>
                        <i className="far fa-comments chats__no-messages-logo"></i>
                    </div>}
                </div>
            </div>
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </Fragment>
    )
}