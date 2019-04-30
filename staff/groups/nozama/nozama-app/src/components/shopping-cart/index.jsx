import React from 'react'

import {Row, Container, Col, Button} from 'reactstrap'

function ShoppingCart(props) {


  return (
    <Container>
    <Row>
        <Col></Col>
        <Col xs="3">

            <Button color="secondary"><img width="100%" src="https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843__340.png" /></Button>
            
        </Col>
    </Row>
      </Container>

  )
}

export default ShoppingCart