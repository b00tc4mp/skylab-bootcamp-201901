import React from 'react';
import Nav from '../../components/Nav';

import logic from '../../logic';
import { Button } from 'reactstrap'
import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT, CART_CHECKOUT } from '../../logic/actions';

function Landing(props) {
  const products = logic.allProducts();
  return (
    <div>
      <ProductHorizontalSlim/>
      <Nav />
      <h1>Landing</h1>

      <ul>
      {props.cart.map(item => (<li>{item.product.productName}: {item.quantity}</li>))} 
      </ul>
      <span>Total quantity: {props.cartQuantity}</span>
      <Button onClick={
        () => {
          debugger;
          products
            .then(items => items[Math.floor(Math.random() * 3)])
            .then(product => props.dispatch({action: CART_ADD_PRODUCT, product, quantity: 1 }))
        }
      }>Add</Button>
      <Button onClick={
        () => {
          products
            .then(items => items[Math.floor(Math.random() * 3)])
            .then(product => props.dispatch({action: CART_REMOVE_PRODUCT, product }))
        }
      }>Remove</Button>
    </div>
  );
}

export default Landing;
