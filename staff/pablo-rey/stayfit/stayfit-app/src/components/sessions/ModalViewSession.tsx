import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ViewSession from './ViewSession';

export default function ModalViewSession({ showDetail, onDidDismiss }) {
  return (
    <IonModal isOpen={!!showDetail} onDidDismiss={onDidDismiss} animated>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onDidDismiss}>Close</IonButton>
            </IonButtons>
            <IonTitle>Session details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <ViewSession session={showDetail} onChangeAttendance={() => {}} />
        </IonContent>
      </IonPage>
    </IonModal>
  );
}
