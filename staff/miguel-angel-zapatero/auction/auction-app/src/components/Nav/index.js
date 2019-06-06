import React, { useState } from 'react'
import Menu from '../Menu'
import Login from '../Login'
import Logout from '../Logout'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

function Nav({history}) {

    const [isLogged, setIsLogged] = useState(logic.isUserLoggedIn)

    async function handleLogin(username, password) {
        try {
            await logic.loginUser(username, password)
            setIsLogged(logic.isUserLoggedIn)

            const user = await logic.retrieveUser()
            alert('Hello '+user.name)
            
            history.push('/')
        } catch ({ message }) {
            alert(message) //mirar de poner en useContext?¿?¿
        }
    }

    function handleLogout() {
        logic.logoutUser()
        setIsLogged(logic.isUserLoggedIn)
        history.push('/')
    }

    return <>
        <nav>
            {!isLogged && <Login onLogin={handleLogin}/>}
            {isLogged && <Menu/>}
            {isLogged && <Logout onLogout={handleLogout}/>}
        </nav>
    </>
}

export default withRouter(Nav)