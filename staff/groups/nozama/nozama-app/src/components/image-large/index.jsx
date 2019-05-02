import React from 'react';

function FullScreenImage(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <img width="100%" src={props.image} />
        </div>
      </div>
    </div>
  );
}

export default FullScreenImage;
