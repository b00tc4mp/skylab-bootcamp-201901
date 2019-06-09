import React, {useState} from 'react'

function Profile({user, onUpdate}) {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    // const [avatar, setAvatar] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()

        onUpdate({name, surname, email})
    }

    return <>
        <div className="" data-uk-grid>
            <img className="uk-width-auto" src={user && user.avatar} alt="user avatar photo"/>
            <form>
                <h3 className="uk-text-uppercase">{user && `${user.name} ${user.surname}`}</h3>
                {/* <div class="uk-margin"> */}
                <div data-uk-form-custom>
                    <input type="file"/>
                    <button className="uk-button uk-button-default" type="button" tabIndex="-1">Select your photo</button>
                {/* </div> */}
                </div>
            </form>
        </div>
            

        <form className="uk-form-horizontal uk-margin-large" onSubmit={handleSubmit}>
            <div className="uk-margin">
                <label className="uk-form-label">Name</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="text" name="name" placeholder={user && user.name} onChange={e => setName(e.target.value)}/>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label">Surname</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="text" name="surname" placeholder={user && user.surname} onChange={e => setSurname(e.target.value)}/>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label">Email</label>
                <div className="uk-form-controls">
                    <input className="uk-input" type="email" name="email" placeholder={user && user.email} onChange={e => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="uk-margin">
                <label className="uk-form-label"></label>
                <div className="uk-form-controls">
                    <button className="uk-button">Update</button>
                </div>
            </div>
        </form>
    </>
}

export default Profile