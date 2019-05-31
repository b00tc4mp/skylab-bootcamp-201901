import React, { useState, useEffect, Fragment }  from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import { AppContext } from '../AppContext'


//import logic from '../../logic'

import Header from '../Header'
import Landing from '../Landing'
//import Register from '../Register'
//import RegisterOk from '../RegisterOk'
//import Login from '../Login'
//import Home from '../Home'


function App(props) {

  const [userLanguage, setUserLanguage] = useState('en')
  /*
  useEffect(() => {
    logic.isUserLoggedIn && logic.retrieveUser()
        .then(user => setUserLanguage(user.language))
  }, [userLanguage])
  */


  return (
    <Fragment>
        <AppContext.Provider value={{ userLanguage, setUserLanguage }}>
          <Header/>
          <Route exact path="/" render={()=> <Landing />} />
 
          
        </AppContext.Provider>
    </Fragment>
  )
}

export default withRouter(App)
