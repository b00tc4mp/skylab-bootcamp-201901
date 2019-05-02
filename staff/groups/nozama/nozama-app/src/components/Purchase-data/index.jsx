import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class PurchaseData extends React.Component {

  state = {
    cardNumber: '',
    cardName: '',
    expireDate: '',
    cvv: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    const {cardNumber, cardName, expireDate, cvv} = this.state
    this.props.onPay({cardNumber, cardName, expireDate, cvv})
  }

  handleCancel = e => {
      e.preventDefault()
      this.props.onCancel()
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} >
          <FormGroup>
            <Label for="cardNumber">Card number</Label>
            <Input
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="Card number"
              onChange={this.handleChange}
              value={this.state.cardNumber}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cardName">Card name</Label>
            <Input
              type="text"
              name="cardName"
              id="cardName"
              placeholder="Card name"
              onChange={this.handleChange}
              value={this.state.cardName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="expireDate">Expire date</Label>
            <Input
              type="text"
              name="expireDate"
              id="expireDate"
              placeholder="Expire date"
              onChange={this.handleChange}
              value={this.state.expireDate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cvv">cvv</Label>
            <Input
              type="text"
              name="cvv"
              id="cvv"
              placeholder="cvv"
              onChange={this.handleChange}
              value={this.state.cvv}
            />
          </FormGroup>
          <Button block color="primary" onClick={handleSubmit}>
            Pay
          </Button>
          <Button block color="secondary" onClick={handleCancel}>
            Back to cart
          </Button>

        </Form>
      </Container>
    );
  }
}

export default PurchaseData