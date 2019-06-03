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
} from '@ionic/react';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';

const Temp: React.FC<any> = ({ history, location, client }) => {
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
      <IonGrid>
        <IonRow>
          <IonSegment onIonChange={updateSegment} scrollable>
            {new Array(15).fill(undefined).map((_, i) => {
              day.add(1, 'day');
              return (
                <IonSegmentButton key={day.format('YYYY-MM-DD')} value={day.format('YYYY-MM-DD')} checked={view === day.format('YYYY-MM-DD')}>
                  <IonLabel>{day.format('D')}</IonLabel>
                  <IonText>{day.format('ddd')}</IonText>
                </IonSegmentButton>
              );
            })}
          </IonSegment>
        </IonRow>
        <IonRow>
          <button onClick={() => logic.login('user0@stay.fit', '123')}>Login</button>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
              {sessions.map(
                ({ id, title, coaches, startTime, endTime, maxAttendants, type: { title: typeTitle }, status }) => {
                  const start = moment(startTime).format('HH:mm');
                  const end = moment(endTime).format('HH:mm');
                  return (
                    <IonItemSliding key={id}>
                      <IonItem>
                        <IonLabel>{`${typeTitle} - ${title}`}</IonLabel>
                        <IonText>{`${start}-${end}`}</IonText>
                      </IonItem>
                      <IonItemOptions side="end">
                        <IonItemOption onClick={() => {}}>Unread</IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  );
                }
              )}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default withRouter(Temp);

{
  /* {providers.map(provider => {
  return <p>{provider.name}</p>;
})} */
}

// <Menu />
// <IonPage id="main">
//   <ion-tabs>
//     <ion-tab tab="home">
//       <Home />
//     </ion-tab>
//     <ion-tab tab="bookings">My bookings</ion-tab>
//     <ion-tab tab="settings">Settings Content</ion-tab>

//     <ion-tab-bar slot="bottom">
//       <ion-tab-button tab="home">
//         <ion-label>Home</ion-label>
//         <ion-icon name="home" />
//         <ion-badge>6</ion-badge>
//       </ion-tab-button>

//       <ion-tab-button tab="bookings">
//         <ion-label>My bookings</ion-label>
//         <ion-icon name="fitness" />
//       </ion-tab-button>
//       <ion-tab-button tab="settings">
//         <ion-label>Settings</ion-label>
//         <ion-icon name="settings" />
//       </ion-tab-button>
//     </ion-tab-bar>
//   </ion-tabs>
// </IonPage>
