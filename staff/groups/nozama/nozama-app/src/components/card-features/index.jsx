import React from 'react';
import { Link } from 'react-router-dom';

const CardFeature = props => {
  return (
    <div className="container mt-4">
      <div className="row">
        <h3 className="display-5">{props.title}</h3>
      </div>
      <div className="row">
        {props.products.slice(0, 4).map(product => {
          return (
            <Link
              className="col-xs-6 m-auto"
              key={product.productId}
              to={'/detailProduct/' + product.productId}
            >
              <img className="mb-3" width="150px" height="150px" src={product.imageSmall} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CardFeature;
