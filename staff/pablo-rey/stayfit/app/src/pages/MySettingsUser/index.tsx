import React, { useContext } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import { MainContext } from '../../logic/contexts/main-context';

export default function MyBookings() {
  const ctx = useContext(MainContext);
  const { user } = ctx;

  return (
    <IonPage id="settings-user">
      <IonContent>
        <IonButton onClick={ctx.logout}>Logout</IonButton>
        <h1>My providers</h1>
        <ul>
        {user.customerOf.map(provider => {
          return (  
            <li key={provider.id}>{provider.name}</li>
            )
        })}
        </ul>

      </IonContent>
    </IonPage>
  );
}
