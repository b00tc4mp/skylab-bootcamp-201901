import React from 'react';

function ShoppingCart(props) {
  return (
    <div>
      <i className="fas fa-shopping-cart" />

      <small>
        <span
          style={{
            position: 'relative',
            top: '-12px',
          }}
          class="badge badge-dark"
        >
          {props.cartQuantity}
        </span>
      </small>
    </div>
  );
}

export default ShoppingCart;
