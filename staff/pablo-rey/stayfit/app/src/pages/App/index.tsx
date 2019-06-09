import '@ionic/core';
// import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { IonApp, IonContent, IonToast } from '@ionic/react';
import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import '../../style.css';
import Home from '../UserHome';
import Landing from '../Landing';
import Login from '../Login';
import Register from '../Register';
import Admin from '../AdminHome';
import Superadmin from '../SuperadminHome';
import Temp from '../temp';
import Temp2 from '../temp2';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { SERVER_URL } from '../../config';
import logic from '../../logic';
import { MainProvider, MainContext } from '../../logic/contexts/main-context';

const gqlClient = new ApolloClient({
  uri: SERVER_URL + '/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

logic.gqlClient = gqlClient;

const App: React.SFC = () => {
  if (logic.token) {
  }
  return (
    <ApolloProvider client={gqlClient}>
      <Router>
        <MainProvider gqlClient={gqlClient}>
          <IonApp>
            <IonContent>
              <MainContext.Consumer>
                {({ role, errorMessage, setErrorMessage }) => {
                  return (
                    <>
                      <IonToast
                        isOpen={!!errorMessage}
                        onDidDismiss={() => setErrorMessage(null)}
                        message={errorMessage}
                        position="top"
                        duration={3000}
                        buttons={[
                          {
                            text: 'Close',
                            role: 'cancel',
                            handler: () => setErrorMessage(null),
                          },
                        ]}
                      />
                      <Switch>
                        <Route path="/temp" render={() => <Temp client={gqlClient} />} />
                        <Route path="/temp2" render={() => <Temp2 client={gqlClient} />} />
                        <Route
                          path="/"
                          exact
                          render={() => {
                            switch (role) {
                              case 'SUPERADMIN_ROLE':
                                return <Redirect to="/superadmin" />;
                              case 'ADMIN_ROLE':
                              case 'STAFF_ROLE':
                                return <Redirect to="/admin" />;
                              case 'USER_ROLE':
                              case 'GUEST_ROLE':
                                return <Redirect to="/home" />;
                              default:
                                return <Landing />;
                            }
                          }}
                        />
                        <Route path="/login" render={() => <Login />} />
                        <Route path="/register" render={() => <Register />} />
                        <Route
                          path="/home"
                          render={props =>
                            ['USER_ROLE', 'GUEST_ROLE'].includes(role) ? <Home {...props} /> : <Redirect to="/" />
                          }
                        />
                        {/* <Route path="/home" component={Home} /> */}
                        <Route
                          path="/admin"
                          render={() => (['ADMIN_ROLE', 'STAFF_ROLE'].includes(role) ? <Admin /> : <Redirect to="/" />)}
                        />
                        <Route
                          path="/superadmin"
                          render={() => (role === 'SUPERADMIN_ROLE' ? <Superadmin /> : <Redirect to="/" />)}
                        />
                        <Route
                          path="/logout"
                          render={() => {
                            // logic.logout();
                            return <Redirect to="/" />;
                          }}
                        />
                        <Route path="*" render={() => <Redirect to="/" />} />
                      </Switch>
                    </>
                  );
                }}
              </MainContext.Consumer>
            </IonContent>
          </IonApp>
        </MainProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
