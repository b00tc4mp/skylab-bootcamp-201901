import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
//import IntroLanding from './IntroLanding'
import logic from '../../../logic'
import './index.sass'


function Profile() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        async function retrieveUser(){
            const user = await logic.retrieveUser()
            setUser(user)
        }
        retrieveUser()
    },[])
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {
            name: { value: name },
            surname: { value: surname },
            username: { value: username },
            email: { value: email },
            password: { value: password }
        } = e.target

        const res = await logic.updateUser(name, surname, username, email, password)
        console.log(res)
    }

    return user && <div class="breadcrumb is-centered" aria-label="breadcrumbs" >
        <form onSubmit={handleSubmit}>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label boldtext">Name</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" name="name" placeholder={user.name}/>
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label boldtext">Surname</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" name="surname" placeholder={user.surname}/>
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label boldtext">Username</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" name="username" placeholder={user.username}/>
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label boldtext">Email</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" name="email" type="email" placeholder={user.email}/>
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label boldtext">Password</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" name="password" type="password" placeholder={user.password}/>
                        </p>
                    </div>
                </div>
            </div>
            <button class="button is-medium is-fullwidth">
                <div class="menu-label has-text-centered">
                    <p class="lighttext ">Update</p>
                </div>
            </button>
        </form>
    </div>
}


export default withRouter(Profile)