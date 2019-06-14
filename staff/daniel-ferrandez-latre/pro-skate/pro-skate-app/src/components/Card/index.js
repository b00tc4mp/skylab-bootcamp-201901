import React, {useState} from "react";
import {withRouter} from 'react-router-dom'
import './index.sass'

function Card({history,  product, handleProductDetail }) {
  // const [productId, setProductId] = suseState('')


  return (
    <div class='card' onClick={() => handleProductDetail(product._id) }>
      <div class='card-image'>
        <figure class='image is-4by3'>
          <img class="card_image"
            src={product.imageUrlMain}
            alt='Placeholder image'
          />
        </figure>
      </div>
      <div class='card-content'>
        <div class='content'>{product.name}</div>
      </div>
    </div>
  );
}

export default withRouter(Card) ;
