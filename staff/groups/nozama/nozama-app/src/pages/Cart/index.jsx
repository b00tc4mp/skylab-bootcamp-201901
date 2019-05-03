import React, { useState } from 'react';
import App from '../../components/App';
import { Link } from 'react-router-dom';
import ProductHorSlim from '../../components/Products/product-hor-slim';
import logic from '../../logic';
import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT, FAVORITES_TOGGLE_PRODUCT } from '../../logic/actions';
import { Button } from 'reactstrap';

function Cart(props) {
  const handleRemoveProduct = product => {
    props.dispatch({ action: CART_REMOVE_PRODUCT, product });
  };

  const handleOneMore = product => {
    props.dispatch({ action: CART_ADD_PRODUCT, product, quantity: 1 })
  };

  const handleOneMinus = product => {
    props.dispatch({ action: CART_ADD_PRODUCT, product, quantity: -1 })
  };


  return (
    <div className="mt-3">
      {props.cart.length ? (
        <>
          <strong>
            Added items: {props.cartQuantity} {}
          </strong>
          {props.cart.map(line => {
            const { product } = line;
            return (
              <ProductHorSlim
                key={product.productId}
                product={product}
                onRemove={handleRemoveProduct}
                onOneMinus={handleOneMinus}
                onOneMore={handleOneMore}
                line={line}
              />
            );
          })}
          <h3>
            Total{' '}
            {props.cart.reduce((acc, line) => {
              return acc + line.quantity * line.product.originalPrice;
            }, 0)}{' '}
            $
          </h3>
          <Link className="btn btn-large btn-success btn-block my-3" to="/checkout">
            Checkout
          </Link>
        </>
      ) : (
        <h4 className="text-center strong p-4">No cart to display</h4>
      )}
      <div className="text-center">
        <Link to="/">
          <h4>Home</h4>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
