import React, { Fragment, useEffect, useState } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import stringContainsAny from '../NavBar/string-contains-any'
import Feedback from '../Feedback'

export default withRouter(function RightBar (props) {
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
        logic.logout()
        if (!logic.isUserLoggedIn) props.history.push('/landing')
    }

    return (
        <Fragment>
            {user && <div className='right-bar'>
                <div className='right-bar__empty' onClick={e => {e.preventDefault(); props.setShowRightBar(false)}}></div>
                <div className='right-bar__options'>
                    <div className='right-bar__profile'>
                        <div className='right-bar__img' style={ image }></div>
                        <div>
                            <p className='right-bar__username'>{user.username}</p>
                            <p className='right-bar__email'>{user.email}</p>
                        </div>
                    </div>
                    {stringContainsAny(pathname, '/user/') ? <button className='right-bar__button right-bar__button-highlited'><i className="far fa-user right-bar__button-icon"></i> Profile</button> : <button onClick={e => {e.preventDefault(); props.history.push(`/user/${user.id}`)}} className='right-bar__button'><i className="far fa-user right-bar__button-icon"></i> Profile</button>}
                    <span className='right-bar__line'></span>
                    {stringContainsAny(pathname, '/chats') ? <button className='right-bar__button right-bar__button-highlited'><i className="far fa-comments right-bar__button-icon"></i> Chats</button> : <button onClick={e => {e.preventDefault(); props.history.push('/chats')}} className='right-bar__button'><i className="far fa-comments right-bar__button-icon"></i> Chats</button>}
                    <span className='right-bar__line'></span>
                    {stringContainsAny(pathname, '/my-events') ? <button className='right-bar__button right-bar__button-highlited'><i className="far fa-calendar right-bar__button-icon"></i> Events</button> : <button onClick={e => {e.preventDefault(); props.history.push('/my-events')}} className='right-bar__button'><i className="far fa-calendar right-bar__button-icon"></i> Events</button>}
                    <span className='right-bar__line'></span>
                    <button onClick={e => {e.preventDefault(); handleLogout(); props.setShowRightBar(false)}} className='right-bar__button-logout'><i className="fas fa-sign-out-alt right-bar__button-icon"></i> Logout</button>
                </div>
            </div>}
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </Fragment>
    )
})