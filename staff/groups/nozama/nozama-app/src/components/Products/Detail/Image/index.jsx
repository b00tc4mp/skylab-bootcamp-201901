import React from 'react';

const Image = props => {
  return <img onClick={props.onClick} width="80%" src={props.image} />;
};

export default Image;
