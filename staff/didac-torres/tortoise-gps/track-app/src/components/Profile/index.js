import React from 'react'
import './index.sass'

function Profile({ onUpdateProfile, onDeleteProfile, error, message, user }) {

    function handleSubmitUpdate(e) {
        debugger
        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            email: {value: email}
        } = e.target

        onUpdateProfile(name, surname, email)
    }

    function handleSubmitPOI(e) {
        e.preventDefault()

        const {
            accept: { value: accept }
        } = e.target

        onDeleteProfile(accept)
    }

    return <main>
    <section className='main-profile'>
        <div className='update-container'>
            <span className="update-help help is-danger">{error}</span>
            <h2 className='update-title title'>My Profile</h2>
            <form onSubmit={handleSubmitUpdate}>
                <div className='update-columns columns is-8 is-2-offset is-desktop'>
                    <div className='update-column column is-half is-desktop'>
                        <input className="input field is-rounded is-warning" type="text" name="name" placeholder={user? user.name:'Name'} autoFocus/>
                    </div>
                    <div className='update-column column is-half is-desktop'>
                        <input className="input field is-rounded is-warning" type="text" name="surname" placeholder={user ? user.surname : 'Surname'}/>
                    </div>
                    </div>
                    <div className='update-columns columns is-8 is-2-offset is-desktop'>
                    <div className='update-column column is-half is-desktop'>
                        <input className="input field is-rounded is-warning" type="email" name="email" placeholder={user? user.email : 'Email'}/>
                    </div>
                    <div className='update-column column is-half is-desktop'>
                        <input className="button-update button is-rounded is-warning" type="submit" value="UPDATE" />
                    </div>
                    </div>
            </form>
            <hr/>
            <h2 className='update-title title'>Delete User</h2>
            <form onSubmit={handleSubmitPOI}>
               
                <div className='update-columns columns is-8 is-2-offset is-desktop'>
                    <div className='update-column column is-half is-desktop'>
                        <input className="delete-input input field is-rounded is-warning" type="text" name="accept" placeholder="WRITE ACCEPT TO PROCCED" pattern="ACCEPT" required/>
                    </div>
                    <div className='update-column column is-half is-desktop'>
                        <input className="button-delete button is-rounded is-warning" type="submit" value="DELETE" />
                    </div>
                    </div>
            <span className="warn-help help is-warning">**This process is irreversible and will permanently delete all of your data.</span>
            </form>
        </div>
    </section>
    </main>

}

export default Profile