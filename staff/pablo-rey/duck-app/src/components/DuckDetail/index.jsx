import React from 'react'
import Favorite from '../Favorite'

function DuckDetail({ onBack, onBuy, duck, onToggleFavorite }) {
  const { title, imageUrl, price, description } = duck;

  return (
    <section className="duck-detail">
      <div className="duck-detail__title-container">
        <i className="fas fa-arrow-left duck-detail__back" onClick={onBack}></i>
        <h3 className="duck-detail__title">{title}</h3>
        <Favorite className="favorite--detail" item={duck} isFavorite={duck.isFavorite} onClickFavorite={onToggleFavorite}/>
      </div>
      <img className="duck-detail__image" src={imageUrl} />
      <div>
        <span className="duck-detail__price">{price}</span>
        <button className="btn--small duck-detail__buy" onClick={onBuy}>
          Buy
        </button>
      </div>
      <p className="duck-detail__description">{description}</p>
    </section>
  );
}

export default DuckDetail;