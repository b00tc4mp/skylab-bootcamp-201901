import React , { useState }from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route  } from "react-router-dom";
import {  withRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import "bulma/bulma.sass";
import Register from "./components/Register";
import Login from "./components/Login";
import Detail from './components/Detail'
import logic from './logic';



function App({history}) {
  const [userName, setUserName] = useState('')
  const [productDetail, setProductDetail] = useState({})

  
 

  const handleProductDetail = async (id) => {
    console.log(id)
    history.push(`/detail/${id}`)

  }


  const userLogged = ( async () => {
    if(logic.isUserLoggedIn) {
      const userBd = await logic.retrieveUser(logic.__userToken__)
      setUserName(userBd.name)
    }
  })

  return (
    <div className='App'>
      <Navbar  userLogged={userLogged} username={userName}/>
      <Switch>
        <Route exact path='/landing' render={() => <Landing handleProductDetail={handleProductDetail} />} />
        <Route exact path='/register' render={() => <Register />} />
        <Route exact path='/login' render={() => <Login userIsLogged={userLogged} />} />
        <Route exact path={`/detail/:id`} render={() => <Detail userLogged={userLogged} />} /> 
      </Switch>
    </div>
  );
}

export default withRouter(App)