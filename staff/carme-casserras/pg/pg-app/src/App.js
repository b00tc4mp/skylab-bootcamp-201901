import React, {Component}  from 'react'
import { Route, Redirect } from 'react-router-dom'
import './index.sass'

import logic from './logic'
import Login from './components/Login'
import Register from './components/Register'
import CategorySearch from './components/Categorysearch'
import AddThing from './components/Addthing'

export default function App() {




  return (
    <div className="App">
      {/* <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} />} /> */}
      {/* <Route exact path="/register" render={() => <Register onRegister={handleRegister} error={error}/>} /> */}
      {/* <Route exact path="/login" render={() => <Login onLogin={handleLogin} error={error}/>} /> */}
      <Route exact path='/register'   component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/search/category' render={() => logic.isUserLoggedIn ? <Redirect to='/register' /> : <CategorySearch/>} />
      <Route exact path='/things' render={() => logic.isUserLoggedIn ? <Redirect to='/register' /> : <AddThing/>} />
      {/* <Route exact path='/things' component={AddThing} /> */}
    </div>
  )

}
