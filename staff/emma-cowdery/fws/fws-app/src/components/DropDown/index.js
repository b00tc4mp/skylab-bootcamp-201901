import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import { withRouter } from 'react-router-dom'
import stringContainsAny from '../NavBar/string-contains-any'
import Feedback from '../Feedback'

export default withRouter(function DropDown (props) {
    const [user, setUser] = useState()
    const [image, setImage] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState() 

    const { history: { location: { pathname } } } = props

    useEffect(() => {
        try {
            logic.retrieveUser()
            .then(({user}) => {
                setUser(user)
                
                if(user.profilePicture) setImage({backgroundImage: `url(${user.profilePicture})`})
                else setImage({backgroundImage: `url(images/default-user.png)`})
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
    }, [])

    const handleLogout = () => {
        try {
            logic.logout()
            if (!logic.isUserLoggedIn) props.history.push('/landing')
        } catch ({message}) {
            setFeedback(message)
            setLevel('warning')
            setType('banner')
        }
    }
    return (
        <Fragment>
            <div className='drop-down' onClick={e => {e.preventDefault(); props.setShowDropdown(false)}}>
                <div className='drop-down__content'>
                    <div className='drop-down__content-icondiv' onClick={e => {e.preventDefault(); props.setShowDropdown(false)}}>
                        <div className='drop-down__content-img' style={ image }></div>
                        <i className="fas fa-chevron-up drop-down__content-arrow"></i>
                    </div>
                    <div className='drop-down__content-linksdiv'>
                        {stringContainsAny(pathname, '/user/') ? <button className='drop-down__content-button drop-down__content-button-highlited'><i className="far fa-user drop-down__content-button-icon"></i> Profile</button> : <button onClick={e => {e.preventDefault(); props.history.push(`/user/${user.id}`)}} className='drop-down__content-button'><i className="far fa-user drop-down__content-button-icon"></i> Profile</button>}
                        <span className='drop-down__content-line'></span>
                        {stringContainsAny(pathname, '/chats') ? <button className='drop-down__content-button drop-down__content-button-highlited'><i className="far fa-comments drop-down__content-button-icon"></i> Chats</button> : <button onClick={e => {e.preventDefault(); props.history.push('/chats')}} className='drop-down__content-button'><i className="far fa-comments drop-down__content-button-icon"></i> Chats</button>}
                        <span className='drop-down__content-line'></span>
                        {stringContainsAny(pathname, '/my-events') ? <button className='drop-down__content-button drop-down__content-button-highlited'><i className="far fa-calendar drop-down__content-button-icon"></i> Events</button> : <button onClick={e => {e.preventDefault(); props.history.push('/my-events')}} className='drop-down__content-button'><i className="far fa-calendar drop-down__content-button-icon"></i> Events</button>}
                        <span className='drop-down__content-line'></span>
                        <button onClick={e => {e.preventDefault(); handleLogout(); props.setShowDropdown(false)}} className='drop-down__content-button'><i className="fas fa-sign-out-alt drop-down__content-button-icon"></i> Logout</button>
                    </div>
                 </div> 
            </div>
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </Fragment>
    )
})