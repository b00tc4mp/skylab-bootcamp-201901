import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import 'bulma/bulma.sass'
import Register from "./components/Register";
import Login from "./components/Login";

export function App() {
  return (
    <div className='App'>
      <Navbar/>
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route exact path='/register' render={() => <Register />} />
        <Route exact path='/login' render={() => <Login />} />

      </Switch>
    </div>
  );
}