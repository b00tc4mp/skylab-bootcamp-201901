import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import moment from 'moment';
import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import logic from '../../logic';

const Temp: React.FC<any> = ({ history, location, client }) => {
  const day = moment();
  const [view, setView] = useState(day.format('YYYY-MM-DD'));
  const [sessions, setSessions] = useState([]);
  // const refreshToken =

  const updateSegment = e => {
    const _day = e.detail.value;
    setView(_day);
    logic.availableSessions('5cf3e7e70029b1470ca300c9', _day).then(data => {
      data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
      setSessions(data);
    });
  };

  moment.locale('es');

  return (
    <>
      <IonPage id="main">
        <IonTabs>
          <IonRouterOutlet>
            {/* <Route path="/:tab(schedule)" component={SchedulePage} exact={true} />
            <Route path="/:tab(speakers)" component={SpeakerList} exact={true} />
            <Route path="/:tab(speakers)/speaker/:id" component={SpeakerDetail} />
            <Route path="/:tab(schedule|speakers)/sessions/:id" component={SessionDetail} />
            <Route path="/:tab(map)" component={MapView} /> */}
            <Route path="/temp/:tab(about)" render={() => <p>about</p>} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="schedule" href="/schedule">
              <IonIcon name="calendar" />
              <IonLabel>Schedule</IonLabel>
            </IonTabButton>
            <IonTabButton tab="speakers" href="/speakers">
              <IonIcon name="contacts" />
              <IonLabel>Speakers</IonLabel>
            </IonTabButton>
            <IonTabButton tab="map" href="/map">
              <IonIcon name="map" />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
            <IonTabButton tab="about" href="/home/about">
              <IonIcon name="information-circle" />
              <IonLabel>About</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonPage>
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
