import React from 'react';

function ButtonAddToCart(props) {
  return (
    <button 
      type="button" 
      className={`btn mx-3 ${props.isSoldOut ? 'btn-secondary' : 'btn-success'}`} 
      onClick={props.onClick}>
      <i className="fas fa-cart-arrow-down"></i>
    </button>
  );
}

export default ButtonAddToCart;
