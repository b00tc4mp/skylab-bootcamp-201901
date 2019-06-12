import '@ionic/core';
import '@ionic/core/css/ionic.bundle.css';
import { IonApp, IonContent, IonToast } from '@ionic/react';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import logic from '../../logic';
import { MainContext, MainProvider } from '../../logic/contexts/main-context';
import '../../style.css';
import Admin from '../AdminHome';
import Landing from '../Landing';
import Login from '../Login';
import Register from '../Register';
import Superadmin from '../SuperadminHome';
import Home from '../UserHome';



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
                {({ refreshUserData, user, role, errorMessage, setErrorMessage }) => {
                  if (!user) refreshUserData()
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
