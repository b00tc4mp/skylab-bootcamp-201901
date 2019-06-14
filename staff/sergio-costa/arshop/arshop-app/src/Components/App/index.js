'use strict'

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
import AnotherUserProfile from '../AnotherUserProfile'
import ProductDetails from '../ProductDetails'
import Results from '../Results'
import CitySelector from '../CitySelector'
import CategorySelector from '../CategorySelector'
import ArCompo from '../ArCompo'
import ArViewer from '../ArViewer'
import ChatViewer from '../ChatsViewer'
import Messages from '../Messages'

class App extends Component {

    state = { city: '', category: '', username: null }

    productSelected = id => {
        this.setState({ productId: id })
        this.props.history.push(`/product/${id}`)
    }

    exclude = () => {
        const pathname = this.props.location.pathname
        return (
            pathname.includes('login') || pathname.includes('register') || pathname.includes('/upload/product') || pathname.includes('/user/profile') || pathname.includes(`product/`) || pathname.includes('/ar/camera') || pathname.includes(`/profile`) || pathname.includes('/chat') || pathname.includes('ar/camera')
        )
    }

    handleOnSearch = query => {
        this.props.history.push(`/search/${query}`)
    }

    handleOnClickCity = city => {
        this.setState({ city })
        this.props.history.push('/upload/product')
    }

    handleOnClickCategory = category => {
        this.setState({ category })
        this.props.history.push('/upload/product')
    }

    onUser = username => {
        this.setState({ username })
    }

    handleAnotherUser = userid => {
        this.props.history.push(`/${userid}/profile`)
    }

    handleOnChatClick = id => {
        this.props.history.push(`/chat/${id}`)
    }

    handleOnProductId = id => {
        this.props.history.push(`/ar/camera/${id}`)
    }

    render() {
        return <main className="app">
            {!this.exclude() && <Header onSearch={this.handleOnSearch} />}
            <Aside username={this.state.username} />
            <Route exact path="/ar/camera/:id" render={props => <ArCompo productId={props.match.params.id}/>} />
            <Route exact path="/search/:query" render={props => <Results query={props.match.params.query} onProductSelect={this.productSelected} />} />
            <Route exact path="/product/:id" render={props => <ProductDetails productId={props.match.params.id} anotherUser={this.handleAnotherUser} onProductId={this.handleOnProductId} />} />
            <Route exact path="/register" render={() => logic.isUserLoggedIn ? <Redirect to='/' /> : <Register />} />
            <Route exact path="/login" render={() => logic.isUserLoggedIn ? <Redirect to='/' /> : <Login onUser={this.onUser} />} />
            <Route exact path="/upload/product" render={() => !logic.isUserLoggedIn ? <Redirect to='/' /> : <UploadProduct city={this.state.city} category={this.state.category} />} />
            <Route exact path="/select/city" render={() => !logic.isUserLoggedIn ? <Redirect to='/' /> : <CitySelector onClickCity={this.handleOnClickCity} />} />
            <Route exact path="/select/category" render={() => !logic.isUserLoggedIn ? <Redirect to='/' /> : <CategorySelector onClickCategory={this.handleOnClickCategory} />} />
            <Route path="/user/profile" render={() => !logic.isUserLoggedIn ? <Redirect to='/' /> : <UserProfile onProductSelect={this.productSelected} />} />
            <Route exact path="/chat" render={() => !logic.isUserLoggedIn ? <Redirect to='/' /> : <ChatViewer onChatClick={this.handleOnChatClick}/>} />
            <Route exact path="/:userid/profile" render={props => <AnotherUserProfile onProductSelect={this.productSelected} userid={props.match.params.userid} />} />
            <Route exact path="/chat/:id" render={props => <Messages chatId={props.match.params.id} />} />
            {/* <Route exact path="/"/> */}
            <Route exact path="/" render={() => <LandingPage onProductSelect={this.productSelected} />} />

        </main>
    }
}
export default withRouter(App)