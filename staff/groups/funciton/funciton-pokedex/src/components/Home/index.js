import React from 'react'
import './index.sass'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Home extends React.Component {

    goToRoute = name => this.props.history.push(name)

    render() {

        return <div className="login_video">

            <img className="funcpokedex" src={require('../../funcitons-pokedex-title.png')}></img>
                <div className="bottomContent">
                    <h3>Welcome to Pokemon Website</h3>
                    <p>One Click away from your pokedex...</p>
                    <button className="btn btn-danger" onClick={() => this.goToRoute('/login')}>Login</button>
                    <button className="btn btn-primary" onClick={() => this.goToRoute('/register')}>Register</button>
                </div>
                <ToastContainer/>
        </div>
            }
        }
        
        
export default Home