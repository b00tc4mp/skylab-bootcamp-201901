import { IonItemDivider, IonLabel, IonList } from '@ionic/react';
import moment from 'moment';
import React from 'react';
import SessionSlim from '../sessions/SessionSlim';

export default function ListUserAllAttendances({ sessions, onClickStatus, onClickPayment }) {
  if (!sessions || !sessions.length) return null;
  let month = '';
  return (
    <IonList>
      {sessions.map(sa => (
        <>
          {month !== moment(sa.startTime).format('MM/YYYY') && (
            <IonItemDivider>
              <IonLabel>{(month = moment(sa.startTime).format('MM/YYYY'))}</IonLabel>
            </IonItemDivider>
          )}
          <SessionSlim
            key={sa.id}
            session={sa}
            attendance={sa.attendance}
            onClickStatus={onClickStatus}
            onClickPayment={onClickPayment}
          />
        </>
      ))}
    </IonList>
  );
}
