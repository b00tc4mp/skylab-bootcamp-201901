import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonText,
  IonHeader,
  IonRefresherContent,
  IonRefresher,
} from '@ionic/react';
import gql from 'graphql-tag';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';
import { MainContext } from '../../logic/contexts/main-context';
import AttendanceItem from '../../components/AttendanceItem';

const SessionsAvailable: React.FC<any> = ({ history, location, client, providerId }) => {
  const day = moment();
  const [view, setView] = useState(day.format('YYYY-MM-DD'));
  const [sessions, setSessions] = useState([]);

  const ctx = useContext(MainContext);

  function refresh(event?: any) {
    logic.availableSessions(providerId, view).then(data => {
      data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
      setSessions(data);
      if (event) event.target.complete();
    });
  }

  useEffect(() => {
    refresh();
  }, [view]);

  const updateSegment = e => {
    const _day = e.detail.value;
    setView(_day);
  };

  const attendSession = (event, sessionId) => {
    event.target.parentElement.parentElement.closeOpened();
    logic.attendSession(ctx.userId, sessionId, 'POSTPAID').then(() => refresh());
  };

  const unattendSession = (event, attendanceId) => {
    event.target.parentElement.parentElement.closeOpened();
    logic.unattendSession(attendanceId, 'CANCELLEDBYUSER').then(() => refresh());
  };

  day.subtract(1, 'day');
  return (
    <React.Fragment>
      <IonHeader>
        <IonSegment onIonChange={updateSegment} scrollable>
          {new Array(15).fill(undefined).map((_, i) => {
            day.add(1, 'day');
            return (
              <IonSegmentButton
                key={day.format('YYYY-MM-DD')}
                value={day.format('YYYY-MM-DD')}
                checked={view === day.format('YYYY-MM-DD')}
              >
                <IonLabel>{day.format('D')}</IonLabel>
                <IonText>{day.format('ddd')}</IonText>
              </IonSegmentButton>
            );
          })}
        </IonSegment>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonRefresher slot="fixed" onIonRefresh={refresh}>
              <IonRefresherContent />
            </IonRefresher>
            <IonCol>
              <IonList>
                {sessions.map(sessionAttendance => (
                  <AttendanceItem
                    sessionAttendance={sessionAttendance}
                    onAttendSession={attendSession}
                    onUnattendSession={unattendSession}
                  />
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </React.Fragment>
  );
};

export default withRouter(SessionsAvailable);
