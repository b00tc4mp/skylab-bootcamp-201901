import React from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Landing from "../../pages/Landing";
import Login from "../Login";
import Register from "../Register";
import logic from "../../logic";
import Product from '../Products/product-hor-slim'
import ProductHorizontalSlim from "../Products/product-hor-slim";


function App(props) {
  const handleLogin = (email, password) => logic.loginUser(email, password);

  return (
    <Container>    
      <ProductHorizontalSlim/>  
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path="/register" render={() => logic.isUserLoggedIn ? 
            <Redirect to="/home" /> 
              :
            <Register/> 
                } />
          <Route path='/login' component={Login} />
        </Switch>

    </Container>
  );
}

export default withRouter(App);
