import React from 'react';
import { IonItem, IonImg, IonAvatar, IonLabel, IonIcon } from '@ionic/react';
import { userInfo } from 'os';
import { ACCEPT, DENIEDBYPROVIDER, DENIEDBYUSER, PENDING } from '../../../enums';

export function CustomerBasic({ customerRequest }) {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <IonImg src={customerRequest.customer.portraitImageUrl} />
      </IonAvatar>
      <IonLabel>{`${customerRequest.customer.name} ${customerRequest.customer.surname}`}</IonLabel>
      {(() => {
        if (!customerRequest.request) return <IonIcon slot="end" name="help" />;
        switch (customerRequest.request.status) {
          case ACCEPT:
            return <IonIcon slot="end" color="success" name="checkmark-circle-outline" />;
          case PENDING:
            return <IonIcon slot="end" color="warning" name="mail-unread" />;
          case DENIEDBYUSER:
            return <IonIcon slot="end" color="danger" name="remove-circle-outline" />;
          case DENIEDBYPROVIDER:
            return <IonIcon slot="end" color="warning" name="remove-circle-outline" />;
        }
        return <></>;
      })()}
    </IonItem>
  );
}
