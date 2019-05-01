import React from 'react'
import './index.sass' 

function Profile({user, onReturn, onCityChange}){

    return<> <main className="main">
     <section className="column is-6-desktop is-6-tablet is-6-mobile is-one-fifth">
        <div className="has-text-centered field">
            <h2 className="title is-2">Weatunes</h2>
            <p className="subtitle">Welcome to your profile</p>
        </div >
        <div class="field">
            <label class="label">Name: {user.name}</label>
        </div>
        <div class="field">
            <label class="label">Surname: {user.surname}</label>
        </div>
        <div class="field">
            <label class="label">Email: {user.email}</label>
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
        <button className="button is-primary" onClick={onReturn}>return</button>
        </section>
        </main>
    </>
}
export default Profile