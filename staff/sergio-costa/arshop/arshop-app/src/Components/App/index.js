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
import UserProfile from '../UserProfile'
import ProductDetails from '../ProductDetails'
//#endregion

class App extends Component {

    hideIfIncludesPath = () => {
        const pathname = this.props.location.pathname
        return (
            pathname.includes('login') || pathname.includes('register') || pathname.includes('/upload/product') || pathname.includes('/user/profile')
        )
    }

    render() {
        return <main className="app">
        {/* <ProductDetails></ProductDetails> */}
            {!this.hideIfIncludesPath() && <Header/>}
            <Aside></Aside>
            <Route exact path="/register" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Register/>} />
            <Route exact path="/login" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Login />} />
            <Route exact path="/upload/product" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UploadProduct />}/>
            <Route  path="/user/profile" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UserProfile />}/>
            {/* <Route exact path="/user/products" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UserProducts />}/> */}
            <Route exact path="/"/>
            <Route exact path="/" render={() => <LandingPage />}/>
            
        </main>
    }
}
export default withRouter(App)