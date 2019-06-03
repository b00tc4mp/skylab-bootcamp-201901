import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {

  return (
    <IonPage id="landing">
      <IonContent>
        <h1>Landing</h1>
        <p><Link to="/register">Register</Link> or <Link to="/login">login</Link></p>
      </IonContent>
    </IonPage>
  );
}
