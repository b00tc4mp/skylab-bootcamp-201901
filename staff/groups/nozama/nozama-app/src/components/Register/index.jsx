import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {
  state = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="surname">Surname</Label>
            <Input
              type="text"
              name="surname"
              id="surname"
              placeholder="surname"
              onChange={this.handleChange}
              value={this.state.surname}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </FormGroup>
          <Button block color="primary">
            Submit
          </Button>
          <Link to="/login" color="link" block>
            Go to login
          </Link>
        </Form>
      </Container>
    );
  }
}
