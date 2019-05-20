import React from 'react';
import { IonButton } from '@ionic/react';

const Favorite = (props) => {
  const { item, isFavorite, onClickFavorite, className='' } = props;
  const icon = item.isFavorite ? (
    <i className="fas fa-heart favorite--on"></i>
  ) : (
    <i className="far fa-heart favorite--off"></i>
  );
  return <IonButton fill="clear" onClick={() => onClickFavorite(item)}>{icon}</IonButton>;
}

export default Favorite;
