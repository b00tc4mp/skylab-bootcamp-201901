import React from 'react';
import { IonItem, IonImg, IonAvatar, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';

export function UserBasic({ user, render }: { user: any; render?: any }) {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <IonImg src={user.portraitImageUrl} />
      </IonAvatar>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>{`${user.name} ${user.surname}`}</IonLabel>
          </IonCol>
        </IonRow>
        {!!render && (
          <IonRow>
            <IonCol>{render}</IonCol>
          </IonRow>
        )}
      </IonGrid>
    </IonItem>
  );
}
