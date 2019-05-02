import React from 'react';
import Title from '../Detail/Title';
import Subtitle from '../Detail/Subtitle';
import Image from '../Detail/Image';
import Price from '../Detail/Price';
import Currency from '../Detail/Currency';
import ButtonAddToCart from '../../Buttons/AddToCart';
import { Link, withRouter } from 'react-router-dom';

function ProductHorizontalSlim(props) {
  const { product, onDetail, onAddToCart } = props;

  const handleClickImage = e => {
    onDetail(product);
  };

  const handleClickButton = e => {
    onAddToCart(product);
  };

  const { imageSmall, productName, subtitle, originalPrice, displayCurrency, productId } = product;
  return (
    <div style={{ marginTop: '0.2rem' }}>
      <div className="container">
        <div className="row">
          <div className="col-5 col-sm-4">
            <Link to={`/detailProduct/${productId}`}>
              <img src={imageSmall} width="100%" />
            </Link>
          </div>
          <div className="col-7 col-sm-8">
            <Title title={productName} />
            <Subtitle subtitle={subtitle} />
            <div style={{ display: 'flex' }}>
              <Price price={originalPrice} />
              <Currency currency={displayCurrency} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ProductHorizontalSlim);
