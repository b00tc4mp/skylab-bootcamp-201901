import React, { useState, useContext, useEffect } from 'react';
import { IonList, IonItemDivider, IonLabel } from '@ionic/react';
import { MainContext } from '../../logic/contexts/main-context';
import SessionSlim from '../sessions/SessionSlim';
import moment from 'moment';

export default function ListUserAllAttendances({ sessions, onClickStatus, onClickPayment }) {
  if (!sessions || !sessions.length) return null;
  debugger;
  let month = '';
  return (
    <IonList>
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
    </IonList>
  );
}
