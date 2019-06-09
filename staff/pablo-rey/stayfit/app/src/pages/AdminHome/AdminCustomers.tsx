import React, { useState, useContext, useEffect } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';
import ListCustomers from '../../components/users/ListCustomers';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  const ctx = useContext(MainContext);

  const handleAcceptRequest = async (userId: string) => {
    await logic.updateRequestCustomer(userId, ctx.provider.id, 'ACCEPT');
    logic.listCustomers(ctx.provider.id).then(customers => setCustomers(customers));
  };

  const handleDenyRequest = async (userId: string) => {
    await logic.updateRequestCustomer(userId, ctx.provider.id, 'DENIEDBYPROVIDER');
    logic.listCustomers(ctx.provider.id).then(customers => setCustomers(customers));
  };

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
