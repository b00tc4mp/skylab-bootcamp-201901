import React from 'react';
import { IonChip, IonIcon, IonLabel } from '@ionic/react';

export function AttendanceStatus({ status, onClick = null}: {status: any, onClick?: any}) {

  const handleClick = () => {
    if (onClick) onClick();
  }

  switch (status) {
    case 'CONFIRMED':
      return (
        <IonChip onClick={handleClick} color="success">
          <IonIcon name="checkmark-circle-outline" />
          <IonLabel>Confirmed</IonLabel>
        </IonChip>
      );
    case 'OK':
      return (
        <IonChip onClick={handleClick} color="success">
          <IonIcon name="checkmark-circle-outline" />
          <IonLabel>Ok</IonLabel>
        </IonChip>
      );
    case 'CANCELLEDBYPROVIDER':
      return (
        <IonChip onClick={handleClick} color="red">
          <IonIcon name="close-circle-outline" />
          <IonLabel>Cancelado</IonLabel>
        </IonChip>
      );
    case 'CANCELLEDBYUSER':
      return (
        <IonChip onClick={handleClick} color="red">
          <IonIcon name="close-circle-outline" />
          <IonLabel>Anulado</IonLabel>
        </IonChip>
      );
    case 'NOSHOW':
      return (
        <IonChip onClick={handleClick} color="red">
          <IonIcon name="information-circle-outline" />
          <IonLabel>No show</IonLabel>
        </IonChip>
      );
    case 'ATTENDED':
      return (
        <IonChip onClick={handleClick} color="success">
          <IonIcon name="information-circle-outline" />
          <IonLabel>Attended</IonLabel>
        </IonChip>
      );
    case 'NOCOUNT':
      return (
        <IonChip onClick={handleClick} color="warning">
          <IonIcon name="information-circle-outline" />
          <IonLabel>No count</IonLabel>
        </IonChip>
      );
    case 'PENDINGAPPROVAL':
      return (
        <IonChip onClick={handleClick} color="info">
          <IonIcon name="help-circle-outline" />
          <IonLabel>Pending approval</IonLabel>
        </IonChip>
      );
    case 'PENDINGCANCELLATION':
      return (
        <IonChip onClick={handleClick}>
          <IonIcon name="help-circle-outline" color="info" />
          <IonLabel>Pending cancellation</IonLabel>
        </IonChip>
      );
  }
  return null;
}
