import React from 'react'

function Favorite ({ item, isFavorite, onClickFavorite, className }) {
  return <i className={`${className} ${isFavorite ? 'fas fa-heart favorite favorite--on' : 'far fa-heart favorite favorite--off'}`} onClick={() => onClickFavorite(item)}></i>
}

export default Favorite