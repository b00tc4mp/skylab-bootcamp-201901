import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import userStorage from '../../localstorage'
import './index.sass'
import Login from '../Login'
import Home from '../Home'

class App extends Component {

    state = {isAuth: false}
    
    componentWillMount(){
        this.setState({isAuth: !!userStorage.auth})
    }

    render() {
        return <main className = "app">
            { this.state.isAuth && <Route exact path="/" component={Home} />}
            { !this.state.isAuth && <Route path="/login" component={Login} />}
        </main>
    }
}

export default App