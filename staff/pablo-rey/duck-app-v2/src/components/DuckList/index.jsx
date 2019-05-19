import React from 'react'
import CardDuck from '../CardDuck'
import { IonGrid, IonRow, IonCol } from '@ionic/react'

function DuckList({ items, onDetail, onToggleFavorite }) {
  if (items.length === 0) return <></>;
  return (
    <IonGrid>
      <IonCol align-self-center>
         {items.map(item => (
        <CardDuck onToggleFavorite={onToggleFavorite} key={item.id} item={item} onDetail={onDetail} />
      ))}
      </IonCol>
    </IonGrid>

  );
}

export default DuckList