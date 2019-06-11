import { IonContent, IonPage, IonButton } from '@ionic/react';
import React, { useContext } from 'react';
import { MainContext } from '../../logic/contexts/main-context';

export default function Superadmin() {
  
  const ctx = useContext(MainContext)

  return (
    <IonPage id="admin-settings">
      <IonContent>
        <IonButton expand="block" onClick={ctx.logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
}
