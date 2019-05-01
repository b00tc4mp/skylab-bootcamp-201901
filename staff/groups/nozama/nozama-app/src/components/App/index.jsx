
import React from 'react';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Landing from '../../pages/Landing';
import Login from '../Login';
import Register from '../Register';
import Home from '../../pages/Home';
import logic from '../../logic';
<<<<<<< HEAD

=======
>>>>>>> 74727f7b1c46b3210f32408a6bca1a38d65175d2

function App(props) {
  const handleLogin = (email, password) => logic.loginUser(email, password);

  return (

    <Container>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (!logic.isLoggedIn ? <Landing /> : <Redirect to="/home" />)}
        />
        <Route
          path="/logout"
          render={() => {
            logic.logOut();
            return <Redirect to="/" />;
          }}
        />
        <Route
          path="/register"
          render={() => (!logic.isLoggedIn ? <Register /> : <Redirect to="/home" />)}
        />
        <Route
          path="/login"
          render={() => (!logic.isLoggedIn ? <Login /> : <Redirect to="/home" />)}
        />
        <Route
          path="/home"
          render={() => {
            return logic.isLoggedIn ? <Home /> : <Redirect to="/" />;
          }}
        />
        <Redirect to="/" />
      </Switch>
<<<<<<< HEAD

=======
>>>>>>> 74727f7b1c46b3210f32408a6bca1a38d65175d2
    </Container>
  );
}

export default withRouter(App);
