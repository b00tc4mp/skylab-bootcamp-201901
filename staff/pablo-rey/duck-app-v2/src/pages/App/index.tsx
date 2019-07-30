import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { IonApp, IonContent } from '@ionic/react';
import logic from '../../logic';
import Home from '../Home';
import Cart from '../Cart';
import Landing from '../Landing';
import Login from '../Login';
import Register from '../Register';

import '@ionic/core';
// import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import '../../style.css';

const App: React.SFC = () => {
  return (
    <Router>
      <IonApp>
        <IonContent>
          <Switch>
            {/* <PrivateRoute path="/account" component={Account} /> */}
            <Route
              path="/"
              exact
              render={() => (logic.isLogged ? <Redirect to="/home" /> : <Landing />)}
            />
            <Route
              path="/home"
              render={() => (logic.isLogged ? <Home /> : <Redirect to="/login" />)}
            />
            <Route
              path="/cart"
              render={() => (logic.isLogged ? <Cart /> : <Redirect to="/login" />)}
            />
            <Route
              path="/login"
              render={() => (!logic.isLogged ? <Login /> : <Redirect to="/home" />)}
            />
            <Route
              path="/register"
              render={() => (!logic.isLogged ? <Register /> : <Redirect to="/home" />)}
            />
            <Route
              path="/logout"
              render={() => {
                logic.logout();
                return <Redirect to="/" />;
              }}
            />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </IonContent>
      </IonApp>
    </Router>
  );
};

export default App;
