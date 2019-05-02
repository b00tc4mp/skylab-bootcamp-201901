import React from 'react'
import './index.sass' 

function Profile({user, onReturn, onCityChange}){

    return<> <main className="mainprofile is-multiline is-centered">
            <section className="column is-6-desktop is-6-tablet is-10-mobile has-text-centered">
                <h2 className="title is-2 is-spaced">Weatunes</h2>
                <p className="subtitle is-spaced">Welcome to your profile {user.name}</p>

            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src="https://cdn1.iconfinder.com/data/icons/circle-outlines-colored/512/User_Account_Avatar_Person_Profile_Login_Human-512.png" alt="Image"/>
                        </figure>
                    </div>
                    <div className="media-content">
                    <div className='content'>
                        <div className="field">
                            <label className="label">Name: {user.name}</label>
                        </div>
                        <div className="field">
                            <label className="label">Surname: {user.surname}</label>
                        </div>
                        <div className="field">
                            <label className="label">Email: {user.email}</label>
                        </div>
                        <div className="select field">
                        <select name="city" onChange={event => onCityChange(event.target.value)} defaultValue={user.city}>
                            <option value="Alaska">Alaska</option>
                            <option value="Auckland">Auckland</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="Cape Town">Cape Town</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Helsinki">Helsinki</option>
                            <option value="London">London</option>
                            <option value="New York">New York</option>
                            <option value="Paris">Paris</option>
                            <option value="Toronto">Toronto</option>
                            <option value="Warsaw">Warsaw</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </article>
            </div>
            <div className="buttons is-right">
                <button className="button is-primary is-medium is-right" onClick={onReturn}>Return</button>
            </div>
        </section>
    </main>
    </>
}
export default Profile