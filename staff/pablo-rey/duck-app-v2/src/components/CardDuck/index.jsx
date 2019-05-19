import React from 'react';
import Favorite from '../Favorite';
import {
  IonCard,
  IonImg,
  IonItem,
  IonCardContent,
  IonLabel,
  IonIcon,
  IonButton,
} from '@ionic/react';

function CardDuck({ item, onDetail, onToggleFavorite }) {
  function onSelect(e) {
    e.preventDefault();
    onDetail(item);
  }

  return (
    <IonCard>
      <IonCardContent>
        <Favorite item={item} isFavorite={item.isFavorite} onClickFavorite={onToggleFavorite} />
        <IonImg src={item.imageUrl} onClick={onSelect} />
      </IonCardContent>
      <IonItem>
        <IonLabel>{item.title}</IonLabel>
      </IonItem>
      <IonItem>
        <IonButton slot="end" fill="outline">Buy</IonButton>
        <IonLabel>{item.price}</IonLabel>
      </IonItem>
    </IonCard>
  );

  return (
    <li className="duck-item">
      <img src={item.imageUrl} className="duck-item__image" onClick={onSelect} />
      <h3 className="duck-item__title">{item.title}</h3>
      <span className="duck-item__price">{item.price}</span>
      <Favorite item={item} isFavorite={item.isFavorite} onClickFavorite={onToggleFavorite} />
    </li>
  );
}

export default CardDuck;
