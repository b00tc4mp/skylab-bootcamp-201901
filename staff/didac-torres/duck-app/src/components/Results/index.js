import React, { Component } from 'react';

var FontAwesome = require('react-fontawesome');
function Results({ items, onItem }) {
    return <ul>
        {items.map(({ id, title, image, price }) =>
            <li key={id} onClick={() => onItem(id)}>
                <h2>{title}</h2>
                <img src={image} />
                <div>
                <FontAwesomeIcon icon="coffee" />
  </div>
                <span>{price}</span>
            </li>)}
    </ul>
    
}

export default Results