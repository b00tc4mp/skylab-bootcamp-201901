import React from 'react';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from '../../pages/Landing';
import Login from '../Login';
import Register from '../Register';

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register/" component={Register} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
