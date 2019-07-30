import React, { useState } from 'react';
import Image from '../../components/Products/Detail/Image';
import Title from '../../components/Products/Detail/Title';
import Subtitle from '../../components/Products/Detail/Subtitle';
import Price from '../../components/Products/Detail/Price';
import Currency from '../../components/Products/Detail/Currency';
import ButtonAddToCart from '../../components/Buttons/AddToCart';
import Cart from '../Cart';
import logic from '../../logic/';
import { CART_ADD_PRODUCT } from '../../logic/actions';

function DetailScreen(props) {
  const [product, setProduct] = useState(null);

  logic.detailProduct(props.match.params.productId).then(detail => {
    setProduct(detail);
  });

  if (!product) return <div className="spinner-border text-success " role="status" />;

  const handleAddToCart = () => {
    props.dispatch({ action: CART_ADD_PRODUCT, product, quantity: 1 });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-1" />
        <div className="col-">
          <Title title={product.productName} />
        </div>
      </div>

      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {product.imagesSmall.map(image => (
            <div key={image} className={`carousel-item ${image === product.imageSmall ? 'active' : ''}`}>
              <img src={image} className="d-block w-100" alt={product.productName} />
            </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      {product.isNew && <span className="badge badge-pill badge-primary">New!</span>}
      {product.isSale && <span className="badge badge-pill badge-info">Sale!!</span>}
      <div className="row">
        <div className="col">
          <div className="row d-flex justify-content-end mb-2">
            <Price price={product.originalPrice} />
            <Currency currency={product.displayCurrency} />
            <ButtonAddToCart 
              onClick={handleAddToCart} 
              isSoldOut={product.isSoldOut}
              />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-1" />
        <div className="col">
          <h3>{product.subtitle}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-1" />
        <div className="col">
          <Subtitle subtitle={product.descriptionHeadline} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-1" />
        <div className="col">
          <p>{product.shortDescription}</p>
        </div>
      </div>
      <div className="row">
            {product.descriptionBullets.map(bullet => (
              <span key={Math.random()} className="badge badge-secondary m-1">{bullet}</span>
            ))}
      </div>
    </div>
  );
}

export default DetailScreen;
