import React from 'react'
import moment from 'moment';
import { IonItemSliding, IonItem, IonIcon, IonLabel, IonText, IonItemOptions, IonItemOption } from '@ionic/react';

export default function ({sessionAttendance, onAttendSession, onUnattendSession})  {
  const {
    id,
    title,
    coaches,
    startTime,
    endTime,
    maxAttendants,
    type: { title: typeTitle },
    status,
    myAttendance,
  } = sessionAttendance
  const start = moment(startTime).format('HH:mm');
  const end = moment(endTime).format('HH:mm');
  const attStatus = myAttendance ? myAttendance.status : null;
  return (
    <IonItemSliding>
      <IonItem>
        {(() => {
          switch (attStatus) {
            case 'CONFIRMED':
            case 'OK':
              return <IonIcon name="checkmark-circle-outline" color="success" />;
            case 'CANCELLEDBYPROVIDER':
              return <IonIcon name="close-circle-outline" color="red" />;
            case 'CANCELLEDBYUSER':
              return null;
            case 'NOSHOW':
            case 'ATTENDED':
            case 'NOCOUNT':
              return <IonIcon name="information-circle-outline" color="red" />;
            case 'PENDINGAPPROVAL':
            case 'PENDINGCANCELLATION':
              return <IonIcon name="help-circle-outline" color="info" />;
          }
          return null;
        })()}
        <IonLabel>{`${typeTitle} - ${title}`}</IonLabel>
        <IonText>{`${start}-${end}`}</IonText>
      </IonItem>
      {!myAttendance || ['CANCELLEDBYUSER'].includes(attStatus) ? (
        <IonItemOptions side="end">
          <IonItemOption onClick={(e: any) => onAttendSession(e, id)}>book</IonItemOption>
        </IonItemOptions>
      ) : (
        ['CONFIRMED', 'OK', 'PENDINGAPPROVAL'].includes(attStatus) && (
          <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={e => onUnattendSession(e, myAttendance.id)}>
              cancel
            </IonItemOption>
          </IonItemOptions>
        )
      )}
    </IonItemSliding>
  );
} 