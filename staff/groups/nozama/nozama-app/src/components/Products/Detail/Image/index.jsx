import React from 'react';

const Image = props => {
  return <img onClick={props.onClick} width="1rem" src={props.image} />;
};

export default Image;
