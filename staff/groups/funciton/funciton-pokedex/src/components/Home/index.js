import React from 'react'
import './index.sass'



class Home extends React.Component {

    render(){

        return <div className="login_video">
            <nav className="topContent navigationbar">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">About</a>
                    </li>
                </ul>
            </nav>
            <div className="bottomContent">
                <h3>Welcome to Pokemon Website</h3>
                <p>You are about one click to access...</p>
                <button className="btn btn-danger" onClick={this.props.onHandleShowLogin}>Login</button>
                <button className="btn btn-primary">Register</button>
            </div>
        </div>
    }
}


export default Home