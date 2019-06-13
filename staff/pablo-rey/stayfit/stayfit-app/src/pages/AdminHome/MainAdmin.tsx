import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonToolbar,
  IonHeader,
  IonItem,
  IonThumbnail,
  IonImg,
  IonTitle,
} from '@ionic/react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import ListSessionsAdmin from '../../components/sessions/ListSessionsAdmin';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

export default function MainAdmin() {
  const [sessions, setSessions] = useState([]);
  const ctx = useContext(MainContext);

  const refresh = async (event?) => {
    if (ctx.provider) {
      const sessions = await logic.listSessions(ctx.provider.id, moment())
      setSessions(sessions);
    }
     await ctx.refreshUserData({ refreshCustomers: true });
    if (event && event.target && event.target.complete) event.target.complete();
  };

  useEffect(() => {
    refresh();
  }, [ctx.provider]);

  if (!ctx.provider) return null;

  return (
    <IonPage id="main-admin">
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg src={ctx.provider.portraitImageUrl} />
            </IonThumbnail>
            <IonTitle>{ctx.provider.name}</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        {!!sessions && <ListSessionsAdmin sessions={sessions} onChange={refresh} />}
      </IonContent>
    </IonPage>
  );
}
