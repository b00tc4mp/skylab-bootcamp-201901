import { IonContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import ListSessionsAdmin from '../../components/sessions/ListSessionsAdmin';
import ListCustomers from '../../components/users/ListCustomers';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

export default function MainAdmin() {
  const [sessions, setSessions] = useState([]);
  const ctx = useContext(MainContext);

  const refresh = async (event?) => {
    ctx.provider && (await logic.listSessions(ctx.provider.id, moment()).then(sessions => setSessions(sessions)));
    await ctx.refreshUserData({ refreshCustomers: true });
    if (event && event.target && event.target.complete) event.target.complete();
  };

  useEffect(() => {
    refresh();
  }, [ctx.provider]);

  return (
    <IonPage id="main-admin">
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        <h1>Admin Main</h1>
        {ctx.customers && <ListCustomers customersAndRequests={ctx.customers} showActive={false} />}
        <h2>Today sessions</h2>
        {!!sessions && <ListSessionsAdmin sessions={sessions} onChange={refresh} />}
      </IonContent>
    </IonPage>
  );
}
