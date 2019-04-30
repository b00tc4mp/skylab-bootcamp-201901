import React from 'react'

import {Row, Container, Col, Button} from 'reactstrap'

function Search(props) {


  return (
    <Container>
      <Row>
          <Col><Input placeholder="Search" /></Col>
          <Col xs="3"><Button color="success"><img width="100%" src="https://cdn.pixabay.com/photo/2017/01/13/01/22/magnifying-glass-1976105_960_720.png" /></Button></Col>
        </Row>
      </Container>

  )
}

export default Search