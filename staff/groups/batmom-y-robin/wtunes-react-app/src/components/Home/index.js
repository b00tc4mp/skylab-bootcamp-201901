import React, {Component} from 'react' 

class Home extends Component {
    state = {error: null, city: null, preferences:[]}

    render(){
        const {
            props:{onLogout}
        }=this
        return <main className="home">
        <h1>weatunes</h1>
        <button onClick={onLogout}>Logout</button>

        </main>

    }
} 

export default Home