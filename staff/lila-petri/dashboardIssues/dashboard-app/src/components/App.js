import React, { Component } from 'react'
import logic  from '../logic'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import HomeAdmin from './HomeAdmin'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
//import '../../node_modules/bulma/css/bulma.css'


class App extends Component{
    state = { user: null, error: null , profile: null}
    handleRegisterNavigation = () => this.props.history.push('/register')

    handleLoginNavigation = () => this.props.history.push('/login')

    handleRegister = async (name, surname, email, password, profile, country) => {
        try {
            
            await logic.registerUser(name, surname, email, password, profile, country)
            
            this.setState({ name, error: null }, () => this.props.history.push('/login'))
            
            } catch (error) {
                this.setState({ error: error.message})
            }
        }
    handleLogin = async (email, password) => {
        try {
            await logic.loginUser(email, password)
            const user = await logic.retrieveUser()
        
            this.setState({ user, profile: user.profile, error: null }, () => this.props.history.push('/home'))
        
        } catch (error) {
            this.setState({ error: error.message})
        }
    }

    handleLogout = () => {
        logic.logoutUser()

        this.props.history.push('/')
    }
    async componentDidMount() {
        if(logic.isUserLoggedIn){
            try{
                const user = await logic.retrieveUser()
                this.setState({ user, profile: user.profile})

            }catch(error){
                this.setState({ error: error.message })
            }

        }

        // switch(this.props.location.pathname) {
        //     case '/orders':
        //         this.handleOrders()
        //     break;
        //     case '/favorites':
        //         this.handleFavorites()
        //     break;
        //     case '/cart':
        //         this.handleCart()
        //     break;


        }
    

    render(){

        const {
            state: {user, error, profile},
            handleRegisterNavigation,
            handleLoginNavigation,
            handleRegister,
            handleLogin,
            handleLogout

        } = this
        return <>
        
        <Switch>
            <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />
            <Route path="/register" render={()=> logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onRegister={handleRegister} error={error} goLogin={handleLoginNavigation}/> }/>
            <Route path="/login" render={() => logic.isUserLoggedIn  ? (profile ==='product-expert'? <Redirect to="/home" /> : <Redirect to="/homeAdmin" />): <Login onLogin={handleLogin} error={error} goRegister={handleRegisterNavigation}/>} />
            <Route path="/home" render={() => logic.isUserLoggedIn ? (profile ==='product-expert'? <Home user={user} onLogout={handleLogout} /> : <Redirect to="/homeAdmin" />) : <Redirect to="/" />} />
            <Route path="/homeAdmin" render={() => logic.isUserLoggedIn ?(profile !== 'product-expert'? <HomeAdmin onLogout={handleLogout} error={error}/>: <Redirect to="/home" />) : <Redirect to="/" />} />
        </Switch>

        </>
    }

}


export default withRouter(App)