import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';

export default function Landing() {

  return (
    <IonPage id="main-user">
      <IonContent>
        <h1>User Main</h1>
        <h2>Proveedores activos/pendientes</h2>
        <h2>Reservas para hoy</h2>
      </IonContent>
    </IonPage>
  );
}
