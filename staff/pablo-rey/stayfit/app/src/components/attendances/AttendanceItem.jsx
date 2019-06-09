import { IonAvatar, IonBadge, IonCol, IonGrid, IonImg, IonItem, IonItemSliding, IonLabel, IonNote, IonRow, IonText } from '@ionic/react';
import moment from 'moment';
import React, { useContext } from 'react';
import { MainContext } from '../../logic/contexts/main-context';
import AttendanceCustomerSlidingButtons from './AttendanceCustomerSlidingButtons';
import { AttendanceStatus } from './AttendanceStatus';

export default function AttendanceItem({ session, onChange, isAdmin=false }) {
  const ctx = useContext(MainContext);

  const isUser = !isAdmin;

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

  return (
    <IonItemSliding>
      <IonItem>
        <IonAvatar slot="start">
          <IonImg src={provider.portraitImageUrl} />
          <IonBadge margin-top color="dark">
            {type.type}
          </IonBadge>
        </IonAvatar>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <IonRow>
                <IonCol>
                  <IonLabel>
                    {moment(startTime).format('hh:mm')}-{moment(endTime).format('hh:mm')}
                  </IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonNote>coaches: {coaches.map(coach => coach.name).join('-')}</IonNote>
                </IonCol>
              </IonRow>
              {!!title && (
                <IonRow>
                  <IonCol>
                    <IonLabel>{title}</IonLabel>
                  </IonCol>
                </IonRow>
              )}
              {!!attendances && isAdmin && (
                <IonRow>
                  <IonCol>
                    <IonNote>
                      Asistentes:{' '}
                      {attendances.length ? attendances.map(att => att.user.name).join(', ') : 'No hay reservas'}
                    </IonNote>
                  </IonCol>
                </IonRow>
              )}
            </IonCol>
            <IonCol class="ion-align-items-center ion-justify-content-center" size="4">
              <IonText>
                {!!myAttendance && <AttendanceStatus status={myAttendance.status} />}
                {countAttendances}/{maxAttendants}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      {isUser && <AttendanceCustomerSlidingButtons attendance={myAttendance} session={session} onChange={onChange} />}
    </IonItemSliding>
  );
}
