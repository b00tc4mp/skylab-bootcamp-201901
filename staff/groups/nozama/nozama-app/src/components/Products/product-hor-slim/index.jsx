import React from 'react';
import Title from '../Detail/Title';
import Subtitle from '../Detail/Subtitle';
import Image from '../Detail/Image';
import Price from '../Detail/Price';
import Currency from '../Detail/Currency';
import ButtonAddToCart from '../../Buttons/AddToCart';
import { Link, withRouter } from 'react-router-dom';

function ProductHorizontalSlim(props) {
  const { product, onRemove, onOneMore, onOneMinus } = props;

  const handleMinus = e => {
    onOneMinus(product);
  };
  
  const handlePlus = e => {
    onOneMore(product);
  };

  const handleRemove = e => {
    onRemove(product);
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
          <div className="col-7 col-sm-8 p-0">
            <Title title={productName} />
            <Subtitle subtitle={subtitle} />
            <div className="row font-italic">
              <Price price={originalPrice} />
              <Currency currency={displayCurrency} />
            </div>
            <div className="row">
              {props.line && (
                <>
                  <i onClick={handleMinus} className="fas fa-minus fa-lg mx-2"></i>
                  <h4 className="p-2">
                    {props.line.quantity}
                  </h4>
                  <i onClick={handlePlus} className="fas fa-plus fa-lg"></i>
                  <i onClick={handleRemove} className="text-danger fas fa-trash-alt fa-lg mx-2"></i>
              </> )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ProductHorizontalSlim);
