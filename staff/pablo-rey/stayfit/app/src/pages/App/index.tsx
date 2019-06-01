import '@ionic/core';
// import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonApp, IonContent } from '@ionic/react';
import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import '../../style.css';
import Home from '../Home';
import Landing from '../Landing';
import Login from '../Login';
import Register from '../Register';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { SERVER_URL } from '../../config';

const client = new ApolloClient({
  uri: SERVER_URL + '/graphql',
});

const App: React.SFC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <IonApp>
          <IonContent>
            <Switch>
              {/* <PrivateRoute path="/account" component={Account} /> */}
              <Route path="/" exact render={() => <Landing client={client}/>} />
              <Route path="/home" render={() => <Home />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/register" render={() => <Register />} />
              <Route
                path="/logout"
                render={() => {
                  // logic.logout();
                  return <Redirect to="/" />;
                }}
              />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </IonContent>
        </IonApp>
      </Router>
    </ApolloProvider>
  );
};

export default App;
