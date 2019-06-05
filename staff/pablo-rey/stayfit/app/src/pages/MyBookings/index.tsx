import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonList, IonRefresher, IonRefresherContent } from '@ionic/react';
import { Link } from 'react-router-dom';
import AttendanceItem from '../../components/AttendanceItem';
import logic from '../../logic';
import moment from 'moment';

export default function MyBookings() {
  const [sessions, setSessions] = useState([]);

  function refresh(event?: any) {
    logic.listMyNextAttendances().then(data => {
      data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
      setSessions(data);
      if (event) event.target.complete();
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <IonPage id="bookings-user">
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        <h1>My bookings</h1>
        <h2>Reservas para hoy</h2>
        <IonList>
          {sessions.length !== 0 &&
            sessions.map(
              sa =>
                moment(sa.startTime).isSameOrBefore(moment().endOf('day')) && (
                  <AttendanceItem sessionAttendance={sa} onAttendSession={() => {}} onUnattendSession={() => {}} />
                )
            )}
        </IonList>
        <h2>resto reservas</h2>
        <IonList>
          {sessions.length !== 0 &&
            sessions.map(
              sa =>
                moment(sa.startTime).isAfter(moment().endOf('day')) && (
                  <AttendanceItem sessionAttendance={sa} onAttendSession={() => {}} onUnattendSession={() => {}} />
                )
            )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
