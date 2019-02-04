import React from 'react'
import Nav from '../Nav'
import InputsFridge from '../InputsFridge'
import { withRouter, Route } from 'react-router-dom'
import './index.sass'


class Home extends React.Component{


    render(){
        
        return <main className="home">
                <Nav user={this.props.user} onLogout={this.handleUser} />
                <InputsFridge />
            </main>

    }
}

export default withRouter(Home)