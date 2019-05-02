import React from 'react'
import Image from '../../components/Products/Detail/Image'
import Title from '../../components/Products/Detail/Title'
import Subtitle from '../../components/Products/Detail/Subtitle'
import Price from '../../components/Products/Detail/Price'
import Currency from '../../components/Products/Detail/Currency'
import {Container, Col, Row} from 'reactstrap'

function DetailScreen(props){
  const [product, setProducts] = useState([]);

  const handleSearch = text => {
    logic.detailProduct('5cc7662e9437a23d6c998d03').then(resProduct => setProducts(resProducts));
  };


  const {imageSmall} = product

  return(
    <Container>
      <Col>
        <Col sm="5" xm="5">
          <Row>
            <Image image={imageSmall}></Image>
          </Row>
        </Col>
        <Col>

        </Col>
        <Col>
        
        </Col>
      
      </Col>
    </Container>
  )

}

export default DetailScreen