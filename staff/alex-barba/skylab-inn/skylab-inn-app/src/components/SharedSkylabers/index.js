import React , {useEffect} from 'react'

import './index.sass'

export default function SharedSkylabers({ encryptedIds, retrieveEncryptedIds, skylabersShared }) {

    useEffect(() => {
        retrieveEncryptedIds(encryptedIds)
    },[])

    return (
        <div className='shared-container'>
            <div className='shared-container__header'>
                <h5>Your Skylabers</h5>
            </div>
            <div className='shared-container__content'>
                {skylabersShared && skylabersShared.map(res => {return (
                    <div className='shared-container__content-res'>
                        <p>{res.name}&nbsp;{res.surname}</p>
                        <a href={`mailto:${res.email}`} target='_top'><i className='far fa-envelope icon'></i>&nbsp;{res.email ? res.email : ''}</a>
                        <a href={`https://api.whatsapp.com/send?phone=${res.telephone}`} target='_blank'><i className='fab fa-whatsapp icon'></i>&nbsp;{res.telephone}</a>
                        <a href={`${res.git}`} target='_blank'><i className='fab fa-github icon'></i>&nbsp;{res.git}</a>
                        <a href={`${res.linkedin}`} target='_blank'><i className='fab fa-linkedin icon'></i>&nbsp;{res.linkedin}</a>
                    </div>
                )
                })}
            </div>
        </div>
    )
}