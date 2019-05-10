import React from 'react'
import logic from '../../logic'
import Favorite from '../Favorite'

function CardDuck({ item, onDetail, onToggleFavorite }) {
  function onSelect(e) {
    e.preventDefault();
    onDetail(item);
  }

  return (
    <li className="duck-item" >
      <img src={item.imageUrl} className="duck-item__image" onClick={onSelect} />
      <h3 className="duck-item__title">{item.title}</h3>
      <span className="duck-item__price">{item.price}</span>
      <Favorite item={item} isFavorite={item.isFavorite} onClickFavorite={onToggleFavorite}/>
    </li>
  );
}

export default CardDuck