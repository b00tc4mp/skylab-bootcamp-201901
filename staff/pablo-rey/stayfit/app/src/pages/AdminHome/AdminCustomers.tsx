import React, { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import { Link } from 'react-router-dom';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';
import ListCustomers from '../../components/users/ListCustomers';
import ViewSession from '../../components/sessions/ViewSession';
import ListUserAttendances from '../../components/users/ListUserAllAttendances';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  const ctx = useContext(MainContext);

  const refresh = async () => {
    const customers = await logic.listCustomers(ctx.provider.id);
    setCustomers(customers);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <IonPage id="admin_customers">
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        {ctx.customers && <ListCustomers customersAndRequests={ctx.customers} showActive showPending showOthers />}
      </IonContent>
    </IonPage>
  );
}
