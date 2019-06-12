import { IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useContext } from 'react';
import ListProviders from '../../components/providers/ListProviders';
import { MainContext } from '../../logic/contexts/main-context';
import ViewUserDetail from '../../components/users/ViewUserDetail';

export default function MySettingsUser() {
  const ctx = useContext(MainContext);

  return (
    <IonPage id="settings-user">
      <IonContent>
        <IonButton expand="block" onClick={ctx.logout} >Logout</IonButton>
        <h2>My providers</h2>
        <ListProviders providers={ctx.myProviders} />
        <ViewUserDetail user={ctx.user} isAdmin={false} />
      </IonContent>
    </IonPage>
  );
}
