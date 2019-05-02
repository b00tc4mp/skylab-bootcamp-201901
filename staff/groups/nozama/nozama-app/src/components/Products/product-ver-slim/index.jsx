import React from 'react';
import Title from '../Detail/Title';
import Subtitle from '../Detail/Subtitle';
import Price from '../Detail/Price';
import Image from '../Detail/Image';

function ProductVerticalSlim(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <Image image={detail._links.image_small.href} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <Title title={detail.title} />
          <Subtitle title={detail.subtitle} />
          <Price price={detail.price} />
        </div>
      </div>
    </div>
  );
}

export default ProductVerticalSlim;
