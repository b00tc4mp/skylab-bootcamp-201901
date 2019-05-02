import React from 'react'
import Title from '../Detail/Title'
import Subtitle from '../Detail/Subtitle'
import Image from '../Detail/Image'
import Price from '../Detail/Price';
import Currency from '../Detail/Currency'
import ButtonAddToCart from '../../Buttons/AddToCart'
import {Link, withRouter} from 'react-router-dom'


function ProductHorizontalSlim(props) {
  const { product, onDetail, onAddToCart } = props

  const handleClickImage = e => {
    onDetail(product);
  }

  const handleClickButton = e => {
   onAddToCart(product)
  }
  
  const { imageSmall, productName, subtitle, originalPrice, displayCurrency, productId } = product;
  return (
    <div style={{marginTop:"0.2rem", }}>
      <div className="container-fluid">
        <div className="row">
          <Link to={`/detailProduct/${productId}`}>
            <div className="col-xs-5 col-sm-4" >
              <img src={imageSmall}/>
            </div>
          </Link>

          <div className="col-xs-7 col-sm-4">
            <Title title={productName}/>
            <Subtitle subtitle={subtitle}/>
              <div style={{ display:"flex" }}>
                  <Price price={originalPrice}/>
                  <Currency currency={displayCurrency}/>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ProductHorizontalSlim)