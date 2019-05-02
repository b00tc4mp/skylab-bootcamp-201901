import React, { useState } from 'react';
import Nav from '../../components/Nav';
import Search from '../../components/Search';
import ProductHorSlim from '../../components/Products/product-hor-slim';

import logic from '../../logic';
import { Button } from 'reactstrap';
import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT, CART_CHECKOUT } from '../../logic/actions';
import productApi from '../../data/product-api';
import { FAVORITES_TOGGLE_PRODUCT } from '../../logic/actions'

function Landing(props) {
  const [products, setProducts] = useState([]);

  const handleSearch = text => {
    logic.searchProduct(text).then(resProducts => setProducts(resProducts));
  };

  const handleDetail = product => {
    console.log(product);
    props.dispatch({action: FAVORITES_TOGGLE_PRODUCT, product});
  }

  return (
    <div>
      <Nav />
      <h1>Landing</h1>
      <Search onSearch={handleSearch} />
      {products.map(product => (
        <ProductHorSlim key={product.productId} product={product} onDetail={handleDetail} />
      ))}
    </div>
  );
}

export default Landing;
