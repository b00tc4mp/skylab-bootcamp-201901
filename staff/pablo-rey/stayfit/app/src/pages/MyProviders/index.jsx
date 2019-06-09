import React, { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../logic/contexts/main-context';
import moment from 'moment';
import logic from '../../logic';
import AttendanceItem from '../../components/AttendanceItem';
import {
  IonPage,
  IonButton,
  IonButtons,
  IonIcon,
  IonSegmentButton,
  IonSegment,
  IonRefresher,
  IonRefresherContent,
  IonImg,
  IonAvatar,
  IonThumbnail,
  IonItem,
} from '@ionic/react';

export default function MyProviders({ history, location }) {
  const ctx = useContext(MainContext);

  const { customerOf } = ctx.user;

  const [providerNum, setProviderNum] = useState(0);
  const [provider, setProvider] = useState(customerOf[0]);
  const [view, setView] = useState(moment().format('YYYY-MM-DD'));
  const [sessions, setSessions] = useState([]);

  function refresh(event) {
    logic.availableSessions(provider.id, view).then(data => {
      data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
      setSessions(data);
      if (event) event.target.complete();
    });
  }

  const handleProviderPlus = () => {
    if (providerNum < customerOf.length - 1) {
      setProvider(customerOf[providerNum + 1]);
      setProviderNum(providerNum + 1);
    }
  };
  const handleProviderMinus = () => {
    if (providerNum > 0) {
      setProvider(customerOf[providerNum - 1]);
      setProviderNum(providerNum - 1);
    }
  };

  useEffect(() => {
    refresh();
  }, [view, provider]);

  const updateSegment = e => {
    const _day = e.detail.value;
    setView(_day);
  };

  return (
    <IonPage id="providers-user">
      <ion-header>
        <ion-toolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleProviderMinus} disabled={providerNum <= 0}>
              <IonIcon name="arrow-dropleft" />
            </IonButton>
          </IonButtons>
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg src={provider.portraitImageUrl} />
            </IonThumbnail>
            <ion-title>{provider.name}</ion-title>
          </IonItem>
          <IonButtons slot="end">
            <IonButton onClick={handleProviderPlus} disabled={providerNum >= customerOf.length -1}>
              <IonIcon name="arrow-dropright" />
            </IonButton>
          </IonButtons>
        </ion-toolbar>
        <IonSegment onIonChange={updateSegment} scrollable>
          {new Array(15).fill(undefined).map((_, i) => {
            const day = moment();
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
            <AttendanceItem key={sessionAttendance.id} session={sessionAttendance} onChange={refresh} />
          ))}
        </ion-list>
      </ion-content>
    </IonPage>
  );
}
