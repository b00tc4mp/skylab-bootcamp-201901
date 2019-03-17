import React, { Fragment, useState, useEffect } from 'react'
import logic from '../../logic'
import './index.sass'
import NavBar from '../NavBar'

export default function UserProfile ({ setShowRightBar, setShowDropdown, userId }) {
    const [image, setImage] = useState()
    const [profileStyle, setProfileStyle] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        if (userId) {
            logic.retrieveUserWithId(userId)
            .then(({user}) => {
                setUser(user)
                if (user.image) setProfileStyle({backgroundImage: `url(${image})`})
                else setProfileStyle({backgroundImage: `url(images/default-user.png)`})
            })
        } else {
            logic.retrieveUser()
            .then(({user}) => {
                setUser(user)
                if (user.image) setProfileStyle({backgroundImage: `url(${image})`})
                else setProfileStyle({backgroundImage: `url(images/default-user.png)`})
            })
        }
    })

    return (
        <Fragment>
            <NavBar setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            {user && <div style={ profileStyle } className='user-profile'>
                
            </div>}
        </Fragment>
    )
}