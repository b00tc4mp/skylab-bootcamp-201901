import React, { useState } from 'react';

import Header from '../Header'
import Order from '../../pages/Order'
import Footer from '../Footer'
import Landing from '../../pages/Landing'
import NotFound from '../../pages/NotFound'

import { Switch, Route, Redirect } from 'react-router-dom'

import logic from '../../logic'

function App() {



  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Landing} />
        { logic.isUserLoggedIn ? <Route exact path='/home' component={Order} /> : <Redirect to='/'/>}
      </Switch>
      <Footer />
    </div>
  );

}

export default App;

{/* <Switch>
<Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing lang={lang} onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />

<Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> :
    visible !== 'register-ok' ?
        <Register lang={lang} onRegister={handleRegister} error={error} /> :
        <RegisterOk lang={lang} onLogin={handleLoginNavigation} />
} />

<Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login lang={lang} onLogin={handleLogin} error={error} />} />

<Route path="/home" render={() => logic.isUserLoggedIn ? <Home lang={lang} name={name} onLogout={handleLogout} /> : <Redirect to="/" />} />

<Redirect to="/" />
</Switch> */}