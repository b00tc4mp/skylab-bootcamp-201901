import React from 'react'
import './index.sass'



function Profile({onUpdate, error, onReturn, user}){
let country

    function onCountryChange(e){
        country=e
    }
    function handleSubmit(e) {
        debugger
        e.preventDefault()
        
        const {
            name: { value: name },
            surname: { value: surname },
        } = e.target

        onUpdate(name, surname, country)
    }
    return <main className="container-profile uk-background-muted">
            <header className="container-profile__header">
                <h4 className="uk-heading-line uk-text-primary"><span>Profile</span></h4>
                <button className="uk-button uk-button-default uk-width-small uk-margin-bottom uk-text-muted uk-float-right" onClick={onReturn}>Back</button> 
            </header>
            <div id="profileImage">{user.name.substring(0, 1)}{user.surname.substring(0, 1)}</div>
            <section className="uk-container uk-background-muted">
                <div className="uk-margin">
                    <p className=" uk-text-muted">Manage your account</p>
                </div>
                <form className="uk-form-stacked" onSubmit={handleSubmit}>
                   
                        <label className="uk-legend uk-text-meta uk-text-bold uk-text-muted">Name: </label>
                        <input className="uk-input uk-form-small" id="firstName" type="text" name="name" placeholder="name" defaultValue={user.name}/>
                  
               
                        <label className="uk-legend uk-text-meta uk-text-bold uk-text-muted">Surname: </label>
                        <input className="uk-input uk-form-small" id="lastName" type="text" name="surname" placeholder="surname" defaultValue={user.surname}/>
                   
                    <div className="uk-margin">
                        <label className="uk-legend uk-text-meta uk-text-bold uk-text-muted">Email: </label>
                        <input className="uk-input uk-form-small" type="text" name="email" placeholder="email" defaultValue={user.email} disabled/>
                    </div>
                    <div className="uk-form-controls">
                        <label className="uk-legend uk-text-meta uk-text-bold uk-text-muted">Country: </label>
                        <select className="uk-select uk-form-small" name="country" onChange={event => onCountryChange(event.target.value)} defaultValue={user.country}>
                            <option value="AR">Argentina</option>
                            <option value="BR">Brazil</option>
                            <option value="CL">Chile</option>
                            <option value="CO">Colombia</option>
                            <option value="CZ">Czech Republic</option>
                            <option value="IT">Italy</option>
                            <option value="MX">Mexico</option>
                            <option value="PE">Peru</option>
                            <option value="PL">Poland</option>
                            <option value="PT">Portugal</option>
                            <option value="ES">Spain</option>
                            <option value="TR">Turkey</option>
                        </select>
                    </div>
                    <div className="uk-margin">
                        <label className="uk-legend uk-text-meta uk-text-bold uk-text-muted">Profile: </label>
                        <input className="uk-input uk-form-small" type="text" name="profile" placeholder="profile" defaultValue={user.profile} disabled/>
                    </div>
                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary " >Save Changes</button>
                        <span className="uk-form-danger">{error}</span>
                    </div>
                </form>
            </section>
        </main>

}
export default Profile
