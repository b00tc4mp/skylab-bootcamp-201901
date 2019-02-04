import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import userStorage from '../../localstorage'
import './index.sass'
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import Header from '../Header'
import Footer from '../Footer'



function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />}
    />
  )
}


class App extends Component {
  //state = {isAuth: false}

  // componentWillMount(){
  //     this.setState({isAuth: !!userStorage.auth})
  // }

  render() {
    return <main className="app">
      {/* { this.state.isAuth && <Route exact path="/" component={Home} />} */}
      < Header />
      < Redirect from="/" to="/home" />
      < PrivateRoute authed={!!userStorage.auth} path='/home' component={Home} />
      < PublicRoute authed={!!userStorage.auth} path='/login' component={Login} />
      < Route exact path="/register" component={Register} />
      <Footer />
      {/* < Route path="/login" component={Login} /> */}
    </main>
  }
}

export default App