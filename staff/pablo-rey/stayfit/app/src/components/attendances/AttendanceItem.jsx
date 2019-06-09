import React, { useContext } from 'react';
import moment from 'moment';
import {
  IonItemSliding,
  IonItem,
  IonIcon,
  IonLabel,
  IonText,
  IonItemOptions,
  IonItemOption,
  IonButton,
} from '@ionic/react';
import { AttendanceStatus } from './AttendanceStatus';
import { MainContext } from '../../logic/contexts/main-context';

export default function AttendanceItem({ session, onChange }) {
  const ctx = useContext(MainContext);

  if (!session) return null;

  const {
    id,
    title,
    provider,
    coaches,
    startTime,
    endTime,
    countAttendances,
    maxAttendants,
    type,
    status,
    attendances,
    myAttendance,
  } = session;

  const handleAttendSession = (event, sessionId) => {
    event.target.parentElement.parentElement.closeOpened();
    ctx.logic
      .attendSession(ctx.userId, sessionId, 'POSTPAID')
      .then(() => onChange())
      .catch(error => ctx.setErrorMessage(error.message));
  };

  const handleUnattendSession = (event, attendanceId) => {
    event.target.parentElement.parentElement.closeOpened();
    ctx.logic
      .unattendSession(attendanceId, 'CANCELLEDBYUSER')
      .then(() => onChange())
      .catch(error => ctx.setErrorMessage(error.message));
  };

  const attStatus = myAttendance ? myAttendance.status : null;

  return (
    <ion-item-sliding>
      <ion-item>
        <ion-avatar slot="start">
          <ion-img src={provider.portraitImageUrl} />
          <ion-badge margin-top color="dark">
            {type.title}
          </ion-badge>
        </ion-avatar>
        <ion-grid>
          <ion-row>
            <ion-col size="8">
              <ion-row>
                <ion-col>
                  <ion-label>
                    {moment(startTime).format('hh:mm')}-{moment(endTime).format('hh:mm')}
                  </ion-label>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-note>coaches: {coaches.map(coach => coach.name).join('-')}</ion-note>
                </ion-col>
              </ion-row>
              {!!title && (
                <ion-row>
                  <ion-col>
                    <ion-label>{title}</ion-label>
                  </ion-col>
                </ion-row>
              )}
              {!!attendances && (
                <ion-row>
                  <ion-col>
                    <ion-note>
                      Asistentes:{' '}
                      {attendances.length ? attendances.map(att => att.user.name).join(', ') : 'No hay reservas'}
                    </ion-note>
                  </ion-col>
                </ion-row>
              )}
            </ion-col>
            <ion-col class="ion-align-items-center ion-justify-content-center" size="4">
              <ion-text>
                <AttendanceStatus status={attStatus} />
                {countAttendances}/{maxAttendants}
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      {(() => {
        const bookButton = (
          <IonItemOptions side="end">
            <IonItemOption onClick={e => handleAttendSession(e, id)}>book</IonItemOption>
          </IonItemOptions>
        );
        const cancelButton = (
          <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={e => handleUnattendSession(e, myAttendance.id)}>
              cancel
            </IonItemOption>
          </IonItemOptions>
        );
        if (!attStatus) return bookButton;
        switch (attStatus) {
          case 'CONFIRMED':
          case 'OK':
            return cancelButton;
          case 'CANCELLEDBYPROVIDER':
            return null;
          case 'CANCELLEDBYUSER':
            return bookButton;
          case 'NOSHOW':
          case 'ATTENDED':
          case 'NOCOUNT':
            return null;
          case 'PENDINGAPPROVAL':
            return cancelButton;
          case 'PENDINGCANCELLATION':
            return bookButton;
        }
        return null;
      })()}
    </ion-item-sliding>
  );
}
