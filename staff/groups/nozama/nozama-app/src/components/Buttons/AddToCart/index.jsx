import React from 'react'

import {Row, Container, Col, Button, Badge} from 'reactstrap'

function ButtonAddToCart(props) {


  return (
    <Container>
    <Row>

<Col xs="3">

    <Button onClick={props.onClick} color="secondary">
      <img width="0.8rem" src="https://image.flaticon.com/icons/svg/44/44092.svg"/>
    </Button>
    
</Col>
</Row>
      </Container>

  )
}

export default ButtonAddToCart