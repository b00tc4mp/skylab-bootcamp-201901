import {
  IonPage,
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
} from '@ionic/react';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';

const Temp = ({ history, location, client }) => {
  const day = moment();
  const [view, setView] = useState(day.format('YYYY-MM-DD'));
  const [sessions, setSessions] = useState([]);
  // const refreshToken =

  const updateSegment = e => {
    const _day = e.detail.value;
    setView(_day);
    logic.availableSessions('5cf3e7e70029b1470ca300c9', _day)
    .then (data => {
      data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
      setSessions(data);
    });
  };

  moment.locale('es');

  return (
    <>
  <ion-page id="main">
    <ion-tabs>
      <ion-tab tab="home">
        <p>Home</p>
      </ion-tab>
      <ion-tab tab="bookings">My bookings</ion-tab>
      <ion-tab tab="settings">Settings Content</ion-tab>
  
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-label>Home</ion-label>
          <ion-icon name="home" />
          <ion-badge>6</ion-badge>
        </ion-tab-button>
  
        <ion-tab-button tab="bookings">
          <ion-label>My bookings</ion-label>
          <ion-icon name="fitness" />
        </ion-tab-button>
        <ion-tab-button tab="settings">
          <ion-label>Settings</ion-label>
          <ion-icon name="settings" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
    </>
  );
};

export default withRouter(Temp);

{
  /* {providers.map(provider => {
  return <p>{provider.name}</p>;
})} */
}

