import React, { useState } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom'
import Register from './components/Register'
import { Home } from './pages/Home'
import { Login } from './components/Login'
import { Event } from './pages/Event'
import logic from './logic'
import './index.scss'



export function App({ history }) {



  return (
    <>
      <Switch>
        <Route exact path='/event/:id' component={Event} />} />
        <Route exact path='/home' component={Home} />} />
        <Route exact path='/register' component={Register}/>
        <Route exact path='/' component={Login}/>
      </Switch>
    </>
  );
}

