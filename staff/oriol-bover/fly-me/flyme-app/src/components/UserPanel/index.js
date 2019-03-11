import React, { useState, useEffect, useRef } from 'react'
import logic from '../../logic';
import './index.sass'


export default function UserPanel() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)
    const [feedback, setFeedback] = useState('')
    const profileImage = useRef(null)

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(user => {
                    setName(user.name)
                    setSurname(user.surname)
                    setEmail(user.email)
                    setImage(user.image)
                })
                .catch(error => setFeedback(error))
        } catch ({ message }) {
            setFeedback(message)
        }
    }, []);

    function handleImage() {
        try {
            logic.uploadUserImage(profileImage.current.files[0])
                .then(res => {
                    setImage(res.user.image)
                })
                .catch(error => setFeedback(error))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    function handleUpdate(e) {
        e.preventDefault()

        try {
            logic.updateUser({ name, surname, email })
                .then(user => {
                    setName(user.name)
                    setSurname(user.surname)
                    setEmail(user.email)
                    setFeedback('changes saved correctly')
                })
                .catch(error => setFeedback(error))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    return (<section className="section">
        <div className="columns is-multiline is-mobile is-centered">
            <div className="column is-three-quarters-mobile is-three-quarters-tablet is-one-fifth-desktop has-text-centered">
                <div className="block">
                    <img src={image ? image : 'http://bcnnow.decodeproject.eu/img/users/no-image.jpg'} className="profile--image" alt="image profile" onClick={() => profileImage.current.click()} />
                </div>
            </div>
            <div className="column is-three-quarters-mobile is-three-quarters-tablet is-four-fifth-desktop">
                <form className="block" onSubmit={e => handleUpdate(e)}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Surname</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="surname" value={surname} onChange={e => setSurname(e.target.value)} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input type="email" className="input" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <input ref={profileImage} style={{ display: "none" }} onChange={handleImage} type="file" />
                    <div className="field">
                        <button className="button">Save</button>
                    </div>
                </form>
                {feedback && <p>{feedback}</p>}
            </div>
        </div>
    </section>)
}