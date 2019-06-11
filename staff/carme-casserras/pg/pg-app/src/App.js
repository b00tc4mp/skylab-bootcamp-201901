import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import './index.sass'
import logic from './logic'
import Maps from './components/Maps'
import Login from './components/Login'
import Register from './components/Register'
import CategorySearch from './components/Categorysearch'
import AddThing from './components/Addthing'
import LocationSearch from './components/Locationsearch'
import CategoryResults from './components/Categoryresults'
import RetrieveThing from './components/Retrievething'
import UserThings from './components/Userthings'
import Nav from './components/Nav'
import Footer from './components/Footer'

export default function App() {
  

  return (
    <div className="App">
      {/* <Route exact path='/' component={Maps} /> */}
      <Nav/>
      <Footer />
      {/* <Maps/> */}
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/search/category' component={CategorySearch} />
      <Route exact path='/things' component={AddThing} />
      <Route exact path='/search/locations' render={() => logic.isUserLoggedIn ? <LocationSearch/> : <Redirect to="/Login"/> } />
      <Route exact path='/search/category/:category' component={CategoryResults} />
      <Route exact path='/thing/:id' component={RetrieveThing} />
      <Route exact path='/search/user/things' render={() => logic.isUserLoggedIn ? <UserThings/> : <Redirect to="/Login"/>} />

    </div>
  )

}