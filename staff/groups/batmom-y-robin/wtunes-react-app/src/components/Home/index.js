import React, {Component} from 'react'
import Header from '../Header'
import logic from '../../logic'
class Home extends Component {
    state = {error: null}

    render(){
        const {
            props: {onLogout, user}
        }=this
        return <main className="home">
        <h1>weatunes</h1>
        <button onClick={onLogout}>Logout</button>
        {user && <Header city={user.city} preferences={user.preferences}/>}
        </main>

    } 
}

export default Home