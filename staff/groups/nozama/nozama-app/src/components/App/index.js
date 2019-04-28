import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function App() {
  function somethingForTest(e) {
    e.preventDefault();
    console.log('Holitas');
  }

  return (
    <Container>
      <Form onSubmit={somethingForTest}>
        <FormGroup>
          <Label for="name">username</Label>
          <Input type="text" name="username" id="name" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="email" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="Password" />
        </FormGroup>
      </Form>
      <Button>Submit</Button>
    </Container>
  );
}

export default App;
