import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import moment from 'moment';
import React from 'react';
import ListUsersAttendance from '../users/ListUsersAttendance';

export default function ViewSession({ session, onChangeAttendance }) {
  if (!session) return null;

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">title</IonLabel>
            <IonText>{session.title}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Coaches</IonLabel>
            <IonText>{session.coaches.map(coach => coach.name).join(' - ')}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Start Time</IonLabel>
            <IonText>{moment(session.startTime).format('dddd DD/MM/YYYY HH:mm')}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol col-xs="4">
          <IonItem>
            <IonLabel position="stacked">End Time</IonLabel>
            <IonText>{moment(session.endTime).format('HH:mm')}</IonText>
          </IonItem>
        </IonCol>
        <IonCol col-xs="4">
          <IonItem>
            <IonLabel position="stacked">Max attendants</IonLabel>
            <IonText>{session.maxAttendants}</IonText>
          </IonItem>
        </IonCol>
        <IonCol col-xs="4">
          <IonItem>
            <IonLabel position="stacked">default enroll</IonLabel>
            <IonText>{session.attendanceDefaultStatus}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol col-xs="6">
          <IonItem>
            <IonLabel position="stacked">Visibility</IonLabel>
            <IonText>{session.visibility}</IonText>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Status</IonLabel>
            <IonText>{session.status}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Session type</IonLabel>
            <IonText>{session.type.title}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Notes</IonLabel>
            <IonText>{session.notes}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <ListUsersAttendance attendances={session.attendances} onChange={onChangeAttendance} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
