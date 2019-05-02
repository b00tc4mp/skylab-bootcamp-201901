import React from 'react';
import { Link } from 'react-router-dom';

const CardFeature = props => {
  const handleClickImage = product => {
    props.onDetail(product);
  };

  return (
    <div className="container">
      <div className="row">
        <h3>{props.title}</h3>
      </div>
      <div className="row">
        {props.products.slice(0, 4).map(product => {
          return (
            <Link
              className="col-xs-6 m-auto"
              key={product.productId}
              to={'/detailProduct/' + product.productId}
            >
              <img width="150px" height="150px" src={product.imageSmall} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CardFeature;
