import { IonContent, IonPage } from '@ionic/react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import ListSessionsAdmin from '../../components/sessions/ListSessionsAdmin';
import ListCustomers from '../../components/users/ListCustomers';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

export default function MainAdmin() {
  const [sessions, setSessions] = useState([]);
  const ctx = useContext(MainContext);

  const refresh = () => {
    ctx.provider && logic.listSessions(ctx.provider.id, moment()).then(sessions => setSessions(sessions));
  };

  useEffect(() => {
    refresh();
  }, [ctx.provider]);

  return (
    <IonPage id="main-admin">
      <IonContent>
        <h1>Admin Main</h1>
        {ctx.customers && <ListCustomers customersAndRequests={ctx.customers} showActive={false} />}
        <h2>Sesiones para hoy</h2>
        {!!sessions && <ListSessionsAdmin sessions={sessions} onChange={refresh} />}
      </IonContent>
    </IonPage>
  );
}
