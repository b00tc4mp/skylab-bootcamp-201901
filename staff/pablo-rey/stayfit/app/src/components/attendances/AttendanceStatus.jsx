import React from 'react';

export function AttendanceStatus({ status }) {
  switch (status) {
    case 'CONFIRMED':
      return (
        <ion-chip color="success">
          <ion-icon name="checkmark-circle-outline" />
          <ion-label>Confirmed</ion-label>
        </ion-chip>
      );
    case 'OK':
      return (
        <ion-chip color="success">
          <ion-icon name="checkmark-circle-outline" />
          <ion-label>Ok</ion-label>
        </ion-chip>
      );
    case 'CANCELLEDBYPROVIDER':
      return (
        <ion-chip color="red">
          <ion-icon name="close-circle-outline" />
          <ion-label>Cancelado</ion-label>
        </ion-chip>
      );
    case 'CANCELLEDBYUSER':
      return (
        <ion-chip color="red">
          <ion-icon name="close-circle-outline" />
          <ion-label>Anulado</ion-label>
        </ion-chip>
      );
    case 'NOSHOW':
      return (
        <ion-chip color="red">
          <ion-icon name="information-circle-outline" />
          <ion-label>No show</ion-label>
        </ion-chip>
      );
    case 'ATTENDED':
      return (
        <ion-chip color="success">
          <ion-icon name="information-circle-outline" />
          <ion-label>Attended</ion-label>
        </ion-chip>
      );
    case 'NOCOUNT':
      return (
        <ion-chip color="warning">
          <ion-icon name="information-circle-outline" />
          <ion-label>No count</ion-label>
        </ion-chip>
      );
    case 'PENDINGAPPROVAL':
      return (
        <ion-chip color="info">
          <ion-icon name="help-circle-outline" />
          <ion-label>Pending approval</ion-label>
        </ion-chip>
      );
    case 'PENDINGCANCELLATION':
      return (
        <ion-chip>
          <ion-icon name="help-circle-outline" color="info" />
          <ion-label>Pending cancellation</ion-label>
        </ion-chip>
      );
  }
  return null;
}
