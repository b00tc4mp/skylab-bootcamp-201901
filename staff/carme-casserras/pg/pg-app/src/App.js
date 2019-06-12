import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import './index.sass'
import logic from './logic'
import Login from './components/Login'
import Register from './components/Register'
import CategorySearch from './components/Categorysearch'
import CategoryResults from './components/Categoryresults'
import AddThing from './components/Addthing'
import LocationSearch from './components/Locationsearch'
import LocationResults from './components/Locationresults'
import RetrieveThing from './components/Retrievething'
import UserThings from './components/Userthings'
import Nav from './components/Nav'
import Footer from './components/Footer'

function App() {
  
  return (
    <div className="App">
      <Nav/>
      <Footer />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/search/category' component={CategorySearch} />
      <Route exact path='/things' component={AddThing} />
      <Route path='/search/locations/:locationPoint' render={(props) => logic.isUserLoggedIn ? <LocationResults locationPoint={props.match.params.locationPoint}/>: <Redirect to="/Login"/> } />
      <Route exact path='/search/locations' render={() => logic.isUserLoggedIn ? <LocationSearch/> : <Redirect to="/Login"/> } />
      <Route exact path='/search/category/:category' component={CategoryResults} />
      <Route exact path='/thing/:id' component={RetrieveThing} />
      <Route exact path='/search/user/things' render={() => logic.isUserLoggedIn ? <UserThings/> : <Redirect to="/Login"/>} />

    </div>
  )

}

export default withRouter(App)