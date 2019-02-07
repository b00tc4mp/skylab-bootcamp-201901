import React from 'react'
import './index.sass'



class Home extends React.Component {

    goToRoute = name => this.props.history.push(name)

    render() {

        return <div className="login_video">

            <img src={require('../../funcitons-pokedex-title.png')}></img>
                <div className="bottomContent">
                    <h3>Welcome to Pokemon Website</h3>
                    <p>You are about one click to access...</p>
                    <button className="btn btn-danger" onClick={() => this.goToRoute('/login')}>Login</button>
                    <button className="btn btn-primary" onClick={() => this.goToRoute('/register')}>Register</button>
                </div>
        </div>
            }
        }
        
        
export default Home