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
import Temp from '../temp';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { SERVER_URL } from '../../config';
import logic from '../../logic';
import { MainProvider } from '../../logic/contexts/main-context';

const gqlClient = new ApolloClient({
  uri: SERVER_URL + '/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

logic.gqlClient = gqlClient;

const App: React.SFC = () => {
  return (
    <ApolloProvider client={gqlClient}>
      <Router>
        <MainProvider gqlClient={gqlClient}>
          <IonApp>
            <IonContent>
              <Switch>
                <Route path="/" exact render={() => <Landing />} />
                <Route path="/temp" render={() => <Temp client={gqlClient} />} />
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
        </MainProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
