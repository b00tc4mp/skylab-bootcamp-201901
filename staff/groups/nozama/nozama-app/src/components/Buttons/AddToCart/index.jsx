import React from 'react';

function ButtonAddToCart(props) {
  return (
    <button type="button" className="btn btn-secondary" onClick={props.onClick}>
      <i className="fas fa-cart-arrow-down"></i>
    </button>
  );
}

export default ButtonAddToCart;
