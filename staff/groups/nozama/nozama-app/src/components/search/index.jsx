import React from 'react'

import {Row, Container, Col, Button, Input} from 'reactstrap'

function Search(props) {


  return (
    <Container>
      <Row >
        <Col >
          <Input placeholder="Search" />
        </Col>
        <Col sm="2" xs="3">
          <Button color="success">
            <img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1024px-Magnifying_glass_icon.svg.png" />
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Search