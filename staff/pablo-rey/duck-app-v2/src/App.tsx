import React, { useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { IonApp, IonContent } from '@ionic/react';
import logic from './logic';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './style.css';
import { StaticContext } from 'react-router';

const App: any = withRouter(({ history }) => {
  const onLogin = (email: string, password: string) => {
    logic.loginUser(email, password).then(() => {
      if (logic.isLogged) history.push('/home');
    });
  };

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
            <Route path="/login" render={() => <Login errorMessage={null} onLogin={onLogin} />} />
            <Route path="/home" component={Home} />
            <Route
              path="/logout"
              render={() => {
                logic.logout();
                return <Redirect to="/" />;
              }}
            />
            {/* <RequiresTutorialRoute path="/login" component={Login} /> */}
            {/* <RequiresTutorialRoute path="/support" component={Support} /> */}
            {/* <RequiresTutorialRoute path="/signup" component={Signup} /> */}
            {/* <RequiresTutorialRoute path="/" component={AppStack} /> */}
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </IonContent>
      </IonApp>
    </Router>
  );
});

const AppContainer: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppContainer;
