import { IonContent, IonPage, IonRow, IonGrid, IonCol, IonText } from '@ionic/react';
import React, { useState } from 'react';
import moment from 'moment';
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
