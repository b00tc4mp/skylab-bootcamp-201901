import React from 'react';
import { IonItem, IonImg, IonAvatar, IonLabel } from '@ionic/react';

export function UserBasic({ user }) {
  return(
    <IonItem>
      <IonAvatar slot="start">
      <IonImg src={user.portraitImageUrl}></IonImg>
      </IonAvatar>
      <IonLabel>{`${user.name} ${user.surname}`}</IonLabel>
    </IonItem>
  )
}
