import React from 'react';
import { Container, Row, Col, Card, Button, CardImg, CardTitle, CardText, CardGroup,
 CardSubtitle, CardBody } from 'reactstrap';

const CardFeature = (props) => {

    const handleClickImage = (product) => {
        onDetail(product);
      }

  return (
    <Container>
        <br/>
        <Row>
            <h3>
                {props.title}
            </h3>
        </Row>
        <Row>
            {props.products.slice(0,4).map(product => {
                return (
                    <Col key={product.productId} xs="6">
                        <img onClick={(e) => {handleClickImage(product)} } 
                            width="100%" 
                            src={product.imageSmall} />
                    </Col>);
            })}
        </Row>

    </Container>
  );
};

export default CardFeature
