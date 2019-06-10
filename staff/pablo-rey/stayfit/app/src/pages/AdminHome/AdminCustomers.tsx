import React, { useState, useContext, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import { Link } from 'react-router-dom';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';
import ListCustomers from '../../components/users/ListCustomers';
import ViewSession from '../../components/sessions/ViewSession';
import ListUserAttendances from '../../components/users/ListUserAllAttendances';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  const ctx = useContext(MainContext);

  useEffect(() => {
    logic.listCustomers(ctx.provider.id).then(customers => setCustomers(customers));
  }, []);

  return (
    <IonPage id="admin_customers">
      <IonContent>
        {ctx.customers && <ListCustomers customersAndRequests={ctx.customers} showActive showPending showOthers />}
      </IonContent>
    </IonPage>
  );
}
