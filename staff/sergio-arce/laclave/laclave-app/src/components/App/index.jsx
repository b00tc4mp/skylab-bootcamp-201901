import React, { Component } from "react"
import Register from "../Register"
import logic from "../../logic"
import Login from '../Login'
import UserProfile from '../UserProfile'
import Menu from '../Menu'
import Create from '../Create'
import HomePage from '../HomePage'
import CreateArtist from '../CreateArtist'
import Detail from '../Detail'
// toast notification
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Route, withRouter, Redirect, Switch } from "react-router-dom"
// normalize
import "normalize.css"

class App extends Component {

    state = { results: false }

    // register user (registrar usuario)
    handleRegister = (name, username, email, emailConfirm, password, passwordConfirm) => {
        try {
            logic.registerUser(name, username, email, emailConfirm, password, passwordConfirm)
                .then(() => {
                    toast('you have registered correctly!')
                    this.props.history.push('/login')
                }) 
                .catch(error => toast(error.message))
        } catch (error) {
            toast(error.message)
        }
    }

    // login - session start (logearse - iniciar sesión)
    handleLogin = (email, password) => {
        try {
            logic.loginUser(email, password)
                .then(() => {
                    toast('you have logged in correctly!')
                    this.props.history.push('/')
                })
                .catch(error => toast(error.message))

        } catch (error) {
            toast(error.message)
        }
    }

    // logout session (salir de la sesión)
    handleLogout = () => {
        logic.logOutUser()
        this.setState({ userLogged: false })
        toast('you have successfully logged out!')
        this.props.history.push('/')
    }

    // update the user (actualiza el usuario)
    handleUserUpdate = userData => {
        try {
            logic.updateUser(userData)
                .then(() => {
                    toast('user updated correctly!')
                    this.setState({ userData })
                })
                .catch(error => toast(error.message))
        } catch (error) {
            toast(error.message)
        }
    }

    // not used - search only congresses (busca sólo congresos)
    handleSearchCongresses = query => {
        try {
            logic.searchCongresses(query)
                .then(results => this.setState({ results }))
                .catch(({ message }) => toast(message))
        } catch (error) {
            toast(error.message)
        }
    }

    // not used - search only artists (busca sólo artistas)
    handleSearchArtist = query => {

        try {
            logic.searchArtist(query)
                .then(results => this.setState({ 
                    
                    results 
                
                }))
                .catch(({ message }) => toast(message))
        } catch (error) {
            toast(error.message)
        }
    }

    handleCreateArtist = (name) => {

        logic.createArtist(name)
    }
 
    // search items - search artists and congresses (busca artistas y congresos)
    handleSearchItems = query => {
        try {

            logic.searchItems(query)
                .then(mixedResults => {
                    this.setState({ results: mixedResults.artists.concat(mixedResults.congresses) })
                    this.props.history.push('/')      
                })
                .catch(({ message }) => toast(message))
        } catch (error) {
            toast(error.message)
        }
    }

    // => redirect to '/login'
    handleGoToLogin = () => (this.props.history.push('/login'))

    // => redirect to '/register'
    handleGoToRegister = () => ( this.props.history.push('/register'))

    // => redirect to '/profile'
    handleGoToProfile = () => ( this.props.history.push('/profile'))

     // => redirect to '/create'
    handleGoToCreate = () => ( this.props.history.push('/create'))
    

    render() {

        return (
            <>
                <ToastContainer />

                    <Menu 
                        isUserLoggedIn={logic.isUserLoggedIn} 
                        onUserProfile={this.handleGoToProfile} 
                        onLogout={this.handleLogout}
                        onSearchArtist={this.handleSearchItems}
                        onGoToCreate={this.handleGoToCreate}
                        onGoToLogin={this.handleGoToLogin} 
                        onGoToRegister={this.handleGoToRegister}
                    />
                <Switch>

                    {/* la homepage es pública; no es necesario comprobar que el usuario está logeado */}
                    <Route exact path="/"
                        render={() => <HomePage 
                                        onResults={this.state.results} 
                                        // todo => búsqueda de congresos y artistas
                                        onSearchItems={this.handleSearchItems} 
                                      />} 
                    />

                     {/* si el usario intenta ir a /profile y NO está logeado le hace un redirect a '/' */}
                     <Route exact path="/create-congres" 
                        render={() => logic.isUserLoggedIn ?       
                                        <Create onCreateArtist={ this.handleCreateArtist}/> : 
                                        <Redirect to="/"/>} 
                    />

                    {/* si el usario intenta ir a /profile y NO está logeado le hace un redirect a '/' */}
                     <Route exact path="/create-artist" 
                        render={() => logic.isUserLoggedIn ?       
                                        <CreateArtist onCreateArtist={ this.handleCreateArtist}/> : 
                                        <Redirect to="/"/>} 
                    />                   

                    {/* si el usario intenta ir a /profile y NO está logeado le hace un redirect a '/' */}
                    <Route exact path="/profile" 
                        render={() => logic.isUserLoggedIn ? 
                                        <UserProfile 
                                            onRetrieveUser={this.handleRetrieveUser} 
                                            onUpdateProfile={this.handleUserUpdate} 
                                        /> : 
                                        <Redirect to="/" />} 
                    />

                    {/* si el usuario intenta ir a /register y está logeado se le hace un redirect hacia la homepage '/' */}
                    <Route exact path="/register/" 
                        render={() => logic.isUserLoggedIn ? 
                                      <Redirect to="/" /> : 
                                      <Register onRegister={this.handleRegister} />  
                                } 
                    />

                    {/* si el usuario intenta ir a /login y está logeado se le hace un redirect hacia la homepage '/' */}                    
                    <Route exact path="/login" 
                        render={() => logic.isUserLoggedIn ? 
                                        <Redirect to="/" /> : 
                                        <Login onLogin={this.handleLogin}  />} 
                    />

                    {/* si el usuario carga una url con la estructura /item/5cfe96553174e7e1b166efab */}                    
                    <Route exact path="/item/:itemId" 
                        render={() => <Detail /> } 
                    />
                </Switch>
            </>
        )
  }
}

export default withRouter(App)
