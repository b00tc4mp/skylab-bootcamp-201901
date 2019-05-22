import React from 'react';
import Favorite from '../../Favorite';
import {
  IonCard,
  IonImg,
  IonItem,
  IonCardContent,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
} from '@ionic/react';
import { IonCardHeader } from '@ionic/react';

function CardDuck({ item, onDetail, onToggleFavorite, onBuy }) {
  function onSelect(e) {
    e.preventDefault();
    onDetail(item);
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonImg src={item.imageUrl} onClick={onSelect} />
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel>{item.title}</IonLabel>
        </IonItem>
        <IonItem>
          <IonButtons slot="end">
            <Favorite item={item} isFavorite={item.isFavorite} onClickFavorite={onToggleFavorite} />
            <IonButton fill="outline" onClick={() => onBuy(item)}>Buy</IonButton>
          </IonButtons>
          <IonLabel>{item.price}</IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );

}

export default CardDuck;
