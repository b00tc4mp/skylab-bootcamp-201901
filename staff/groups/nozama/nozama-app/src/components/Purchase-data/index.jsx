import React, { useEffect } from 'react';
import { CART_CONFIRMED_PAY } from '../../logic/actions'
import validate from '../../common/validate'
class PurchaseData extends React.Component {

  state = {
    cardNumber: '',
    cardName: '',
    expireDate: '',
    cvv: '',
    errorMessage: null
  };

  handleChange = e => {

    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    const {cardNumber, cardName, expireDate, cvv} = this.state
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
      ])
      this.props.dispatch({action: CART_CONFIRMED_PAY,  cardNumber, cardName, expireDate, cvv})
    }
    catch(error){
      this.setState({ errorMessage: error.message})
    }
  }

  handleCancel = e => {
      e.preventDefault()
      this.props.onCancel()
  }

  render() {
    return (
      <div className="container">
          {this.state.errorMessage && <div class="alert alert-warning" role="alert">
            <h5>{this.state.errorMessage}</h5>
          </div>}
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="cardNumber">Card number</label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="Card number"
              onChange={this.handleChange}
              value={this.state.cardNumber}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Card name</label>
            <input
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
              type="text"
              name="expireDate"
              id="expireDate"
              placeholder="Expire date"
              onChange={this.handleChange}
              value={this.state.expireDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">cvv</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              placeholder="cvv"
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

export default PurchaseData