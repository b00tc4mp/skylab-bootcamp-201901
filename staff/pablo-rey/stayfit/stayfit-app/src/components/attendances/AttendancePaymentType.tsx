import React from 'react';
import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import { PAIDINADVANCE, TOPAYINSESSION, POSTPAID, FREE, INCLUDED } from '../../enums';

export function AttendancePaymentType({ paymentType, onClick = null}: {paymentType: any, onClick?: any}) {

  const handleClick = () => {
    if (onClick) onClick();
  }

  switch (paymentType) {
    case PAIDINADVANCE:
      return (
        <IonChip onClick={handleClick} color="success">
          <IonIcon name="card"/><IonIcon name="done-all"/>
          <IonLabel>Paid</IonLabel>
        </IonChip>
      );
    case TOPAYINSESSION:
      return (
        <IonChip onClick={handleClick} color="warning">
          <IonIcon name="cash" />
          <IonLabel>Cash pending</IonLabel>
        </IonChip>
      );
    case POSTPAID:
      return (
        <IonChip onClick={handleClick} color="info">
          <IonIcon name="card" />
          <IonLabel>Postpayment</IonLabel>
        </IonChip>
      );
    case FREE:
      return (
        <IonChip onClick={handleClick} color="info">
          <IonIcon name="ice-cream" />
          <IonLabel>Free</IonLabel>
        </IonChip>
      );
    case INCLUDED:
      return (
        <IonChip onClick={handleClick} color="success">
          <IonIcon name="clipboard" />
          <IonLabel>Included</IonLabel>
        </IonChip>
      );
  }
  return null;
}
