import React, { useContext } from 'react';
import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';

import { MainContext } from '../../logic/contexts/main-context';
import ListSessionsCustomer from '../../components/sessions/ListSessionsCustomer';

export default function MyBookings() {
  const ctx = useContext(MainContext);
  const { refreshUserData, nextAttendances } = ctx;

  function refresh(event) {
    refreshUserData().then(() => {
      if (event && event.target && event.target.complete) event.target.complete();
    });
  }

  return (
    <IonPage id="bookings-user">
      <ion-header>
        <ion-toolbar>
          <ion-title>My next bookings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        <ListSessionsCustomer sessions={nextAttendances} onChange={refresh} />
      </ion-content>
    </IonPage>
  );
}
