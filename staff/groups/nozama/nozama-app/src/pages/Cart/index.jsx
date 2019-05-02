import React ,{ useState } from 'react'
import App from '../../components/App'
import ProductHorSlim from '../../components/Products/product-hor-slim';
import logic from '../../logic';
import { CART_ADD_PRODUCT, CART_CHECKOUT, FAVORITES_TOGGLE_PRODUCT } from '../../logic/actions';
import { Button } from 'reactstrap'

function Cart(props) {
 

  const handleDetail = product => {
    console.log(product);
    props.dispatch({action: FAVORITES_TOGGLE_PRODUCT, product});
  }

  const handleAddToCart = product => {
    console.log(product)
    props.dispatch({action: CART_ADD_PRODUCT, product, quantity: 1})
  }

  const handleCheckout = (e) => {
    e.preventDefault();
    props.onCheckout();
  }

  return (
    <div>
      <strong>Subtotal de {props.cartQuantity} {}</strong>
      {props.cart.map(line => { 
        const {product} = line
        return ( 
        <ProductHorSlim key={product.productId} product={product} onDetail={handleDetail} onAddToCart={handleAddToCart}/>
      )}
      )}
      <h3>Total {props.cart.reduce((acc, line) => {
        return acc + line.quantity * line.product.originalPrice;
      }, 0)}</h3>
      <Button onClick={handleCheckout} >Checkout</Button>
    </div>
  );
}

export default Cart;
