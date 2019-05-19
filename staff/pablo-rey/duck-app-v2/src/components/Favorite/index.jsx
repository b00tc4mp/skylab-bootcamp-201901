import React from 'react';
import { IonIcon } from '@ionic/react';

const Favorite = (props) => {
  const { item, isFavorite, onClickFavorite, className='' } = props;
  const icon = isFavorite ? (
    <IonIcon className={`favorite favorite--on ${className}`} onClick={() => onClickFavorite(item)} name="heart"/>
  ) : (
    <IonIcon className={`favorite favorite--off ${className}`} onClick={() => onClickFavorite(item)} name="heart-empty" />
  );
  return icon;
}

export default Favorite;
