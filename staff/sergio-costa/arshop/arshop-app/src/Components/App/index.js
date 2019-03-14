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
import Results from '../Results'
import CitySelector from '../CitySelector';
import ArCompo from '../ArCompo'
//#endregion

class App extends Component {

    productSelected = id => {
        this.setState({productId: id})
        this.props.history.push(`/product/${id}`)
    }

    exclude = () => {
        const pathname = this.props.location.pathname
        return (
            pathname.includes('login') || pathname.includes('register') || pathname.includes('/upload/product') || pathname.includes('/user/profile') || pathname.includes(`product/`)
        )
    }

    handleOnSearch = query => {
        this.props.history.push(`/search/${query}`)
    }

    render() {
        return <main className="app">
            {!this.exclude() && <Header onSearch={this.handleOnSearch} />}
            <Aside></Aside>
            <Route exact path="/ar/camera"/>
            <Route exact path="/search/:query" render={props => <Results query={props.match.params.query} onProductSelect={this.productSelected} /> }/>
            <Route exact path="/product/:id" render={props => <ProductDetails productId={props.match.params.id}/>}/>
            <Route exact path="/register" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Register/>} />
            <Route exact path="/login" render={() => logic.isUserLoggedIn ? <Redirect to='/'/>: <Login />} />
            <Route exact path="/upload/product" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UploadProduct />}/>
            {/* <Route exact path="/select/city" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <CitySelector />}/> */}
            <Route  path="/user/profile" render={() => !logic.isUserLoggedIn ? <Redirect to='/'/> : <UserProfile onProductSelect={this.productSelected}/>}/>
            <Route exact path="/"/>
            <Route exact path="/" render={() => <LandingPage onProductSelect={this.productSelected}/>}/>
            
        </main>
    }
}
export default withRouter(App)