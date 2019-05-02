import React from 'react';

function ButtonAddToCart(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-3">
          <button type="btn btn-primary" onClick={props.onClick} color="secondary">
            <img width="0.8rem" src="https://image.flaticon.com/icons/svg/44/44092.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonAddToCart;
