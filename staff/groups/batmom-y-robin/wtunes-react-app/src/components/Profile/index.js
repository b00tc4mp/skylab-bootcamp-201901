import React from 'react'

function Profile({user, onReturn, onCityChange}){

    return<>
        <h2>Weatunes</h2>
        <p>Welcome to your profile</p>
        <label>Name:<p>{user.name}</p></label>
        <label>Surmane:<p>{user.surname}</p></label>
        <label>Email:<p>{user.email}</p></label>
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
        <button onClick={onReturn}>return</button>
    </>
}
export default Profile