import React from 'react'

import {Row, Container, Col, Button, Badge} from 'reactstrap'

function ShoppingCart(props) {

  const handleClick = (e) => {
    e.preventDefault();
    props.onGoToCart();
  }
   return (

  <>
      <i className="fas fa-shopping-cart"></i>
      <small><Badge 
        style={{
          position: "absolute",
          left: "3rem",
          top: "0"
        }} 
        color="secondary" pill>{props.cartQuantity}</Badge>
        </small>
    </>
  )
}

export default ShoppingCart