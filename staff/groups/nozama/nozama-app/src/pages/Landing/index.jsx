import React, { useState } from 'react';
import Search from '../../components/Search';
import ProductHorSlim from '../../components/Products/product-hor-slim';

import logic from '../../logic';
import { CART_ADD_PRODUCT, CART_CHECKOUT, FAVORITES_TOGGLE_PRODUCT } from '../../logic/actions';

function Landing(props) {
  const [products, setProducts] = useState([]);

  const handleSearch = text => {
    logic.searchProduct(text).then(resProducts => setProducts(resProducts));
  };

  const handleDetail = product => {
    console.log(product);
    props.dispatch({action: FAVORITES_TOGGLE_PRODUCT, product});
  }

  const handleAddToCart = product => {
    console.log(product)
    props.dispatch({action: CART_ADD_PRODUCT, product, quantity: 1})
   
  }

  return (
    <div>
      <h1>Landing</h1>
      <Search onSearch={handleSearch} />
      {products.map(product => (
        <ProductHorSlim key={product.productId} product={product} onDetail={handleDetail} onAddToCart={handleAddToCart}/>
      ))}
    </div>
  );
}

export default Landing;
