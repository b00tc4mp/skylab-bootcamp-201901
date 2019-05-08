import React from 'react';
import ProductHorSlim from '../Products/product-hor-slim';

function FavoriteList(props) {
  const { products, onDetail, onToggle } = props;

  const handleToggle = product => {
    onToggle(product);
  };

  return (
    <div>
      {products.map(product => (
        <div>
          <ProductHorSlim key={product.productId} product={product} onDetail={onDetail} />
          <div onClick={e => handleToggle(product)}>
            <span
              className="badge badge-primary"
              style="position:absolute; right:10; top:-10; zIndex:1"
            >
              Fav
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteList;
