'use strict'

//#region IMPORTS
import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'
import Register from '../Register'
import Login from '../Login'
import LandingPage from '../LandingPage'
import Header from '../Header'
import Aside from '../Aside'
import UploadProduct from '../UploadProduct'
import UserProducts from '../UserProducts'
//#endregion

class App extends Component {

    hideIfIncludesPath = () => {
        const pathname = this.props.location.pathname
        return (
            pathname.includes('login') || pathname.includes('register') || pathname.includes('/upload/product') || pathname.includes('/user/products')
        )
    }

    render() {
        return <main className="app">
            {!this.hideIfIncludesPath() && <Header/>}
            <Aside></Aside>
            <Route exact path="/register" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Register/>} />
            <Route exact path="/login" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Login />} />
            <Route exact path="/upload/product" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UploadProduct />}/>
            <Route exact path="/user/products" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UserProducts />}/>
            <Route exact path="/"/>
            <Route exact path="/" render={() => <LandingPage />}/>
        </main>
    }
}
export default withRouter(App)