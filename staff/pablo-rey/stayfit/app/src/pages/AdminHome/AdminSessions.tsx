import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { CalendarWeek } from '../../components/CalendarWeek';

export default function() {


  return (
    <IonPage id="admin_sessions">
      <IonContent>
        <h1>Create a session</h1>
        <CalendarWeek numWeeks={4}/>

      </IonContent>
    </IonPage>
  );
}
