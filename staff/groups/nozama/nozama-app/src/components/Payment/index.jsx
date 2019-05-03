import React from 'react';
import { withRouter } from 'react-router-dom';
import { CART_CONFIRMED_PAY } from '../../logic/actions';
import validate from '../../common/validate';
class Payment extends React.Component {
  amount = 0;
  state = {
    cardNumber: '',
    cardName: '',
    expireDate: '',
    cvv: '',
    errorMessage: null,
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { cardNumber, cardName, expireDate, cvv } = this.state;
    try {
      validate.arguments([
        {
          name: 'Card number',
          value: cardNumber,
          type: 'string',
          notEmpty: true,
        },
        {
          name: 'Card name',
          value: cardName,
          type: 'string',
          notEmpty: true,
        },
        {
          name: 'Expire date',
          value: expireDate,
          type: 'string',
          notEmpty: true,
        },
        {
          name: 'cvv',
          value: cvv,
          type: 'string',
          notEmpty: true,
        },
      ]);
      this.props.dispatch({
        action: CART_CONFIRMED_PAY,
        cardNumber,
        cardName,
        expireDate,
        cvv,
        amount: this.amount,
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
      setTimeout(() => this.setState({errorMessage: null}), 4000)
    }
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.history.push("/cart")
  };

  render() {
    this.amount = this.props.cart.reduce((acc, line) => {
      return acc + line.quantity * line.product.originalPrice;
    }, 0);
    return (
      <div className="container">
        {this.state.errorMessage && (
          <div className="alert alert-warning mt-3" role="alert">
            <h5>{this.state.errorMessage}</h5>
          </div>
        )}

        <h3 className="text-center p-3">Amount: {`${this.amount} $`}</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card number</label>
            <input 
              className="form-control"
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="Card number"
              required
              pattern="[0-9]{14,16}"
              onChange={this.handleChange}
              value={this.state.cardNumber}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Card name</label>
            <input
              className="form-control"
              type="text"
              name="cardName"
              id="cardName"
              placeholder="Card name"
              onChange={this.handleChange}
              value={this.state.cardName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expireDate">Expire date</label>
            <input
              className="form-control"
              type="text"
              name="expireDate"
              id="expireDate"
              placeholder="mmyy"
              required
              pattern="[0-9]{4,5}"
              onChange={this.handleChange}
              value={this.state.expireDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">cvv</label>
            <input
              className="form-control"
              type="text"
              name="cvv"
              id="cvv"
              placeholder="cvv"
              required
              pattern="[0-9]{3,4}"
              onChange={this.handleChange}
              value={this.state.cvv}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>
            Pay
          </button>
          <button className="btn btn-secondary btn-block" onClick={this.handleCancel}>
            Back to cart
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Payment);
