import React from 'react'

import {Row, Container, Col, Button, Badge} from 'reactstrap'

function ShoppingCart(props) {


  return (
    <Container>
    <Row>

<Col xs="3">

    <Button color="secondary">
      <img width="100%" src="https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843__340.png" />
      <Badge 
        style={{
          position: "absolute",
          right: "-10",
          top: "-10"
        }} 
        color="primary">4</Badge>
    </Button>
    
</Col>
</Row>
      </Container>

  )
}

export default ShoppingCart