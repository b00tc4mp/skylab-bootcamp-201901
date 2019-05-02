import React from 'react';

const CardFeature = (props) => {

    const handleClickImage = (product) => {
        onDetail(product);
      }

  return (
    <div className="container">
        <div className="row">
            <h3>{props.title}</h3>
        </div>
        <div className="row">
            {props.products.slice(0,4).map(product => {
                return (
                    <div className="col-xs-6" key={product.productId}>
                        <img onClick={(e) => {handleClickImage(product)} } 
                            width="100%" 
                            src={product.imageSmall} />
                    </div>);
            })}
        </div>

    </div>
  );
};

export default CardFeature
