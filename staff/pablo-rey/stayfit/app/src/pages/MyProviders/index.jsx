import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../logic/contexts/main-context';
import moment from 'moment';
import logic from '../../logic';
import AttendanceItem from '../../components/AttendanceItem';
import { IonPage, IonSegmentButton, IonSegment, IonRefresher, IonRefresherContent } from '@ionic/react';

export default function MyProviders({ history, location }) {
  const ctx = useContext(MainContext);

  const { customerOf } = ctx.user;

  const [providerNum, setProviderNum] = useState(0);
  const day = moment();
  const [view, setView] = useState(day.format('YYYY-MM-DD'));
  const [sessions, setSessions] = useState([]);

  function refresh(event) {
    logic.availableSessions(customerOf[0].id, view).then(data => {
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

  return (
    <IonPage id="providers-user">
      <ion-header>
        <ion-toolbar>
          <ion-title>{customerOf[0].name}</ion-title>
        </ion-toolbar>
        <IonSegment onIonChange={updateSegment} scrollable>
          {new Array(15).fill(undefined).map((_, i) => {
            day.add(1, 'day');
            return (
              <IonSegmentButton
                key={day.format('YYYY-MM-DD')}
                value={day.format('YYYY-MM-DD')}
                checked={view === day.format('YYYY-MM-DD')}
              >
                <ion-label>{day.format('D')}</ion-label>
                <ion-text>{day.format('ddd')}</ion-text>
              </IonSegmentButton>
            );
          })}
        </IonSegment>
      </ion-header>
      <ion-content>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        <ion-list>
          {sessions.map(sessionAttendance => (
            <AttendanceItem
              key={sessionAttendance.id}
              session={sessionAttendance}
              onChange={refresh}
            />
          ))}
        </ion-list>
      </ion-content>
    </IonPage>
  );
}
