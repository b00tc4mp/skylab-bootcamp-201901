import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap'
import {withRouter, Link} from 'react-router-dom'
import logic from '../../logic'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isLogged: false
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {email, password} = this.state
    logic.loginUser(email, password)
    this.props.history.push('/home')
  }

  render() {
    return <Container>
      <Form>
        <FormGroup>
          <Label for="email" >Email</Label>
          <Input 
          type="text"
          name="email"
          id="email"
          placeholder="email"
          onChange={this.handleChange}
          value={this.state.email}
          />
        </FormGroup>
        <FormGroup>
        <Label for="password" ></Label>
          <Input 
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={this.handleChange}
          value={this.state.password}
          />
        </FormGroup>
        <Button block color="primary" >Submit</Button>
      </Form>
      <Link to="/register" color="link" block>
            Go to register
      </Link>
    </Container>
  }
}

export default withRouter(Login)