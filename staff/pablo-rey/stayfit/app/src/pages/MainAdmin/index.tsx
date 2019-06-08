import { IonContent, IonPage } from '@ionic/react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import ListSessionsCustomer from '../../components/sessions/ListSessionsCustomer';
import ListCustomers from '../../components/users/ListCustomers';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

export default function MainAdmin() {
  const [sessions, setSessions] = useState([]);
  const ctx = useContext(MainContext);

  const handleAcceptRequest = async (userId: string) => {
    await logic.updateRequestCustomer(userId, ctx.provider.id, 'ACCEPT');
    // logic.listCustomers(ctx.provider.id).then(customers => setCustomers(customers));
    // disparar una actualización
  };

  const handleDenyRequest = async (userId: string) => {
    await logic.updateRequestCustomer(userId, ctx.provider.id, 'DENIEDBYPROVIDER');
    // logic.listCustomers(ctx.provider.id).then(customers => setCustomers(customers));
    // disparar una actualización
  };

  const refresh = () => {
    ctx.provider && logic.listSessions(ctx.provider.id, moment()).then(sessions => setSessions(sessions));
  }

  useEffect(() => {
    refresh()
  }, [ctx.provider]);

  return (
    <IonPage id="main-admin">
      <IonContent>
        <h1>Admin Main</h1>
        {ctx.customers && <ListCustomers customersAndRequests={ctx.customers} showActive={false}/>}
        <h2>Sesiones para hoy</h2>
          {!!sessions && <ListSessionsCustomer sessions={sessions} onChange={refresh}/>}
      </IonContent>
    </IonPage>
  );
}
