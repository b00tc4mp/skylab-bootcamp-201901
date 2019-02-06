import React, { Component } from 'react'
import userStorage from '../../localstorage'
import { Link } from 'react-router-dom'



class User extends Component {
    state = { user: userStorage.auth }

    render() {



        const { state: { user } } = this

        return <section>
            <Link to="/home" className="button">
                Search Moar
                    </Link>
            <div>
                <label>
                    Name:
            </label>
                <p>
                    {user.name}
                </p>
            </div>
            <div>
                <label>
                    Surname:
            </label>
                <p>
                    {user.surname}
                </p>
            </div>
            <div>
                <label>
                    Email:
            </label>
                <p>
                    {user.email}
                </p>
            </div>


        </section >
    }
}

export default User