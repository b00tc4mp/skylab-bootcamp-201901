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

    productSelected = id => {
        this.setState({productId: id})
        this.props.history.push(`/product/${id}`)
    }

    render() {
        return <main className="app">
            <Aside></Aside>
            <Route path="/product/:id" render={props => <ProductDetails productId={props.match.params.id}/>}/>
            <Route exact path="/register" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Register/>} />
            <Route exact path="/login" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Login />} />
            <Route exact path="/upload/product" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UploadProduct />}/>
            <Route  path="/user/profile" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UserProfile onProductSelect={this.productSelected}/>}/>
            <Route exact path="/"/>
            <Route exact path="/" render={() => <LandingPage onProductSelect={this.productSelected}/>}/>
            
        </main>
    }
}
export default withRouter(App)