import React, { useContext, useEffect } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

import './index.sass'

export default function SharedSkylabers({ encryptedIds, retrieveEncryptedIds, skylabersShared }) {

    const { feedback } = useContext(AppContext)

    useEffect(() => {
        retrieveEncryptedIds(encryptedIds)
    }, [])

    return (
        <div className='shared-container'>
            <div className='shared-container__header'>
                <h5>Your Skylabers</h5>
            </div>
            <div className='shared-container__content'>
                {skylabersShared && skylabersShared.map(res => {
                    return (
                        <div className='shared-container__content-res'>
                            <p>{res.name}&nbsp;{res.surname}</p>
                            <a rel="noopener noreferrer" href={`mailto:${res.email}`} target='_top'><i className='far fa-envelope icon'></i>&nbsp;{res.email ? res.email : ''}</a>
                            <a rel="noopener noreferrer" href={`https://api.whatsapp.com/send?phone=${res.telephone}`} target='_blank'><i className='fab fa-whatsapp icon'></i>&nbsp;{res.telephone}</a>
                            <a rel="noopener noreferrer" href={`https://github.com/${res.git}`} target='_blank'><i className='fab fa-github icon'></i>&nbsp;{res.git}</a>
                            <a rel="noopener noreferrer" href={`https://www.linkedin.com/in/${res.linkedin}`} target='_blank'><i className='fab fa-linkedin icon'></i>&nbsp;{res.linkedin}</a>
                        </div>
                    )
                })}
            </div>
            {feedback && <Feedback />}
        </div>
    )
}