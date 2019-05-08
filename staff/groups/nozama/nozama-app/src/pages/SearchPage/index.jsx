import React, { useState, useEffect } from 'react';
import ProductHorSlim from '../../components/Products/product-hor-slim';
import { withRouter } from 'react-router-dom' 
import logic from '../../logic';

function SearchPage (props) {
  const [products, setProducts] = useState([]);
  const textSearch = props.match.params.text

  useEffect(() => {
    logic.searchProduct(textSearch)
      .then(_products => setProducts(_products))
  }, textSearch)

  return (
    <div>
      {products.map(product => (
        <ProductHorSlim key={product.productId} product={product}/>
      ))}
    </div>
  );
}

export default withRouter(SearchPage);
