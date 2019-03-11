import React , {useEffect} from 'react'

export default function SharedSkylabers({ encryptedIds, retrieveEncryptedIds, skylabersShared }) {

    useEffect(() => {
        retrieveEncryptedIds(encryptedIds)
    },[])

    return (
        <section>
            <h5>Skylabers</h5>
            {skylabersShared && skylabersShared.map(res => {return <p>{res.name}</p> })}
        </section>
    )
}