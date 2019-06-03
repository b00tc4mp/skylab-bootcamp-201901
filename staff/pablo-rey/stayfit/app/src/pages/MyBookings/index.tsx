import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';

export default function MyBookings() {

  return (
    <IonPage id="bookings-user">
      <IonContent>
        <h1>My bookings</h1>
        <h2>Reservas para hoy</h2>
        <h2>resto Proveedor 1</h2>
      </IonContent>
    </IonPage>
  );
}
