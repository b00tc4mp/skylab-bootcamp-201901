import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic';


export default function Navbar() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(user => {
                    setName(user.name)
                    setSurname(user.surname)
                })
                .catch(error => console.log(error))
        } catch ({ message }) {
            console.log(message)
        }
    }, []);

    function logOut() {
        logic.logOutUser()
    }

    return (<nav className="navbar is-primary">
        <div className="navbar-brand">
            <Link to="/admin" className="navbar-item">
                <h1 className="title">FLYME-APP</h1>
            </Link>
            <div className="navbar-burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div className="navbar-menu">
            <div className="navbar-end">
                <div className="navbar-item has-dropdown is-hoverable">
                    <div className="navbar-link">{name} {surname}</div>
                    <div className="navbar-dropdown">
                        <Link to="/admin/user" className="navbar-item">
                            <div>
                                <span className="icon is-small">
                                    <i className="fas fa-user-circle"></i>
                                </span>
                                &nbsp;Profile
                            </div>
                        </Link>
                        <Link to="/admin/report" className="navbar-item">
                            <div>
                                <span className="icon is-small">
                                    <i className="fas fa-bug"></i>
                                </span>
                                &nbsp;Report Bug
                            </div>
                        </Link>
                        <a href="#" className="navbar-item" onClick={() => logOut()}>
                            <div>
                                <span className="icon is-small">
                                    <i className="fas fa-sign-out-alt"></i>
                                </span>
                                &nbsp;Logout
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>)
}