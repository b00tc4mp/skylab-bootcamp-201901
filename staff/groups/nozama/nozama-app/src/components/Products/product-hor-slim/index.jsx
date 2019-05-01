import React from 'react'
import Title from '../Detail/Title'
import Subtitle from '../Detail/Subtitle'
import Image from '../Detail/Image'
import {Row, Container, Col} from 'reactstrap'
import Price from '../Detail/Price';
import Currency from '../Detail/Currency'

function ProductHorizontalSlim(props) {


  const detail = {
    "_id": "5cc7662e9437a23d6c998d03",
    "_links": {
        "image_small": {
            "href": "https://www.adidas.com/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/default/dw1c569268/zoom/EF7387_00_plp_standard.jpg"
        },
        "images_small": [
            {
                "href": "https://www.adidas.com/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/default/dw1c569268/zoom/EF7387_00_plp_standard.jpg"
            }
        ],
        "image_large": {
            "href": "https://www.adidas.com/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/default/dw1c569268/zoom/EF7387_00_plp_standard.jpg"
        },
        "images_large": [
            {
                "href": "https://www.adidas.com/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/default/dw1c569268/zoom/EF7387_00_plp_standard.jpg"
            }
        ]
    },
    "product_Id": "EF7387",
    "product_id": "EF7387",
    "model_number": "GKN62",
    "display_product_id": "EF7387",
    "product_name": "BBC Hu NMD Shoes",
    "subtitle": " Originals ",
    "original_price": 250,
    "display_currency": "USD",
    "is_new": true,
    "is_sale": false,
    "is_sold_out": false,
    "is_exclusive": false,
    "is_app_exclusive": false,
    "is_early_access": false,
    "orderable": false,
    "badge_text": "COMING SOON",
    "badge_color": "#A7C1B9",
    "badge_type": "preview",
    "purchase_limit": 10,
    "is_preorderable": false,
    "coming_soon_date": "2019-05-03T14:00:00.000Z",
    "push_tag": "EF7387-PLC-en-US"
}

  return (
    <div style={{marginTop:"0.2rem", }}>
      <Container fluid>
        <Row >
          <Col xs="5" sm="4" >
            <Image image={detail._links.image_small.href}/>
          </Col>
          <Col xs="7" sm="4">
            <Title title={detail.product_name}  />
            <Subtitle subtitle={detail.subtitle}/>
              <div style={{display:"flex" }}>
                  <Price price={detail.original_price}/>
                  <Currency currency={detail.display_currency}/>
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductHorizontalSlim