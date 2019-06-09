import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useContext } from 'react';
import ListProviders from '../../components/providers/ListProviders';
import { MainContext } from '../../logic/contexts/main-context';

export default function MySettingsUser() {
  const ctx = useContext(MainContext);

  return (
    <IonPage id="settings-user">
      <IonContent>
        <IonButton expand="block" onClick={ctx.logout} >Logout</IonButton>
        <h1>My providers</h1>
        <ListProviders providers={ctx.myProviders} />
      </IonContent>
    </IonPage>
  );
}
