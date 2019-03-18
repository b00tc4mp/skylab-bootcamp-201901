import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import NavBar from '../NavBar'

export default function UserProfile ({ setShowRightBar, setShowDropdown, userId }) {
    const [image, setImage] = useState()
    const [profileStyle, setProfileStyle] = useState()
    const [userProfile, setUserProfile] = useState(null)
    const [editImg, setEditImg] = useState(false)
    const [user, setUser] = useState()
    const [mobile, setMobile] = useState(false)
    const [editInfo, setEditInfo] = useState(false)
    const [about, setAbout] = useState('explain a bit about yourself')
    const [instagram, setInstagram] = useState('enter a link to your profile')
    const [twitter, setTwitter] = useState('enter a link to your profile')
    const [facebook, setFacebook] = useState('enter a link to your profile')
    const [events, setEvents] = useState(0)

    useEffect(() => {
        logic.retrieveUser()
            .then(({user}) => {
                setUser(user)
                if (user && user.instagram) setInstagram(user.instagram)
                if (user && user.twitter) setTwitter(user.twitter)
                if (user && user.facebook) setFacebook(user.facebook)
                if (user && user.about) setAbout(user.about)
            })

        if (userId) {
            logic.retrieveUserWithId(userId)
            .then(({user}) => {
                setUserProfile(user)
                if (user.image) setProfileStyle({backgroundImage: `url(${image})`})
                else setProfileStyle({backgroundImage: `url(images/default-user.png)`})
            })
            .then(() => {
                logic.retrieveEvents(userId)
                    .then(_events => {
                        if (!_events.length) setEvents(0)
                        else {
                            _events.map(event => {
                                if (String(new Date()).substring(6, 12) > event.eventDate.substring(6, 12)) setEvents(events + 1)
                            })
                        }
                        
                    })
                    .catch(err => {
                        if (err) setEvents(err)
                    })
            })
            .catch(err => {
                //set feedback
            })
        } else {
            logic.retrieveUser()
            .then(({user}) => {
                setUserProfile(user)
                if (user.image) setProfileStyle({backgroundImage: `url(${image})`})
                else setProfileStyle({backgroundImage: `url(images/default-user.png)`})
            })
            .then(() => {
                logic.userEvents()
                    .then(_events => {
                        if (!_events.length) setEvents(0)
                        else {
                            _events.map(event => {
                                if (String(new Date()).substring(6, 12) > event.eventDate.substring(6, 12)) setEvents(events + 1)
                            })
                        }
                    })
                    .catch(err => {
                        if(err) setEvents(err)
                    })
            })
            .catch(err => {
                //set feedback
            })
        }

        if (window.innerWidth < 1200) setMobile(true)
    }, [])

    const handleUploadPicture = () => {
        try {
            logic.updateProfilePicture(image)
                .then(({user}) => setUserProfile(user))
                .then(() => {
                    setEditImg(false)
                })
                .catch(err => {
                    //set feedback
                })
        } catch {
            //set feedback
        }
    }

    const handleUpdateInformation = () => {
        try {
            logic.updateUser(about, instagram, twitter, facebook)
                .then(user => {
                    if (user) setEditInfo(false)
                })
                .catch(err => {
                    console.log(err)
                    //set feedback
                })
        } catch {
            //set feedback
        }
    }

    

    return (
        <Fragment>
            <NavBar setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            {user && userProfile && <div className='user-profile'>
                <div className='user-profile__header'>
                    {mobile ? <div style={ profileStyle } className='user-profile__header-img'>
                        {user.id === userProfile.id && <div className='user-profile__header-img-button' onClick={e => {e.preventDefault(); setEditImg(true)}}><i className="far fa-edit"></i></div>}
                    </div> : <div className='user-profile__header-div'>
                        <div style={ profileStyle } className='user-profile__header-img'>
                            {user.id === userProfile.id && <div className='user-profile__header-img-button' onClick={e => {e.preventDefault(); setEditImg(true)}}><i className="far fa-edit"></i></div>}
                        </div>
                    </div>}
                    <div className='user-profile__header-info'>
                        <p className='user-profile__header-username'>{userProfile.username}</p>
                        <div className='user-profile__header-socials'>
                            {/* <a href='https://www.instagram.com/vacadery/' target="_blank"><i className="fab fa-instagram user-profile__header-socials-icon"></i></a>
                            <a href='https://www.facebook.com/EmmaCowdery' target="_blank"><i className="fab fa-facebook-square user-profile__header-socials-icon"></i></a> */}
                            {userProfile && userProfile.instagram !== 'enter a link to your profile' && <a href={userProfile.instagram} target="_blank"><i className="fab fa-instagram  user-profile__header-socials-icon"></i></a>}
                            {userProfile && userProfile.twitter !== 'enter a link to your profile' && <a href={userProfile.twitter} target="_blank"><i className="fab fa-twitter-square  user-profile__header-socials-icon"></i></a>}
                            {userProfile && userProfile.facebook !== 'enter a link to your profile' && <a href={userProfile.facebook} target="_blank"><i className="fab fa-facebook-square  user-profile__header-socials-icon"></i></a>}
                        </div>
                    </div>
                    {!mobile && <div className='user-profile__line'></div>}
                </div>
                <div className='user-profile__body'>
                    {user.id === userProfile.id && !editInfo && <i className="far fa-edit" onClick={e => {e.preventDefault(); setEditInfo(true)}}></i>}
                    {editInfo ? <div className='user-profile__body-edit'>
                        <p className='user-profile__body-edit-title'>Social Media</p>
                        <div className='user-profile__body-edit-inputs'>
                            <p className='user-profile__body-edit-text'>Instagram</p>
                            <input className='user-profile__body-edit-input' type='text' placeholder='instagram' defaultValue={instagram} onChange={e => {e.preventDefault(); setInstagram(e.target.value)}}></input>
                            <p className='user-profile__body-edit-text'>Twitter</p>
                            <input className='user-profile__body-edit-input' type='text' placeholder='twitter' defaultValue={twitter} onChange={e => {e.preventDefault(); setTwitter(e.target.value)}}></input>
                            <p className='user-profile__body-edit-text'>Facebook</p>
                            <input className='user-profile__body-edit-input' type='text' placeholder='facebook' defaultValue={facebook} onChange={e => {e.preventDefault(); setFacebook(e.target.value)}}></input>
                        </div>
                        <p className='user-profile__body-edit-title'>About</p>
                        <textarea className='user-profile__body-edit-input' rows='6' cols='70' maxLength='300' defaultValue={about}></textarea>
                        <div className='user-profile__body-edit-buttons'>
                            <button className='user-profile__body-edit-button user-profile__body-edit-button-cancel' onClick={e => {e.preventDefault(); setEditInfo(false)}}>Cancel</button>
                            <button className='user-profile__body-edit-button user-profile__body-edit-button-update' onClick={e => {e.preventDefault(); handleUpdateInformation()}}>Update</button>
                        </div>
                    </div>
                    :
                    <div className='user-profile__body-info'>
                        {userProfile.about !== 'no-about' && <div className='user-profile__body-about'>
                            <p>{user.info.about}</p>
                        </div>}
                        <div className='user-profile__body-events'>
                            <p>{events}</p>
                        </div>
                        {userProfile.favouriteRestaurants.length && <div className='user-profile__body-favourites'>

                        </div>}
                    </div>}
                </div>
                {editImg && <div className='user-profile__upload'>
                    <div className='user-profile__upload-content'>
                        <i className="fas fa-file-upload user-profile__upload-icon"></i>
                        <input className='user-profile__upload-input' type='file' name='image' onChange={e => {e.preventDefault(); setImage(e.target.files[0])}}/>
                        <div className='user-profile__upload-buttons'>
                            <button className='user-profile__upload-buttons-upload' onClick={e => {e.preventDefault(); handleUploadPicture()}}>Upload</button>
                            <button className='user-profile__upload-buttons-cancel' onClick={e => {e.preventDefault(); setEditImg(false)}}>Cancel</button>
                        </div>
                    </div>
                </div>}
            </div>}       
        </Fragment>
    )
}