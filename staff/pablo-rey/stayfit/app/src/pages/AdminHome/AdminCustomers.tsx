import React, { useState, useContext, useEffect } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  const ctx = useContext(MainContext);

  const handleAcceptRequest = async (userId: string) => {
    await logic.updateRequestCustomer(userId, ctx.provider.id, "ACCEPT")
    logic.listCustomers(ctx.provider.id).then(customers => setCustomers(customers));
  
  };

  const handleDenyRequest = async (userId: string) => {
    await logic.updateRequestCustomer(userId, ctx.provider.id, "DENIEDBYPROVIDER")
    logic.listCustomers(ctx.provider.id).then(customers => setCustomers(customers));

  };

  useEffect(() => {
    logic.listCustomers(ctx.provider.id).then(customers => setCustomers(customers));
  }, []);

  return (
    <IonPage id="admin_customers">
      <IonContent>
        <h1>Admin customers</h1>
        <p>{customers.length}</p>
        <h2>Customers pendientes</h2>
        {customers
          .filter(c => !!c.request && c.request.status === 'PENDING')
          .map(c => (
            <>
            <p>{c.customer.name}</p>
            <IonButton onClick={() => handleAcceptRequest(c.customer.id)}>Accept</IonButton>
            <IonButton onClick={() => handleDenyRequest(c.customer.id)}>Deny</IonButton>
            </>
          ))}
        <h2>Customers acceptados</h2>
        {customers
          .filter(c => !c.request || c.request.status !== 'PENDING')
          .map(c => (
            <p>{c.customer.name}</p>
          ))}
      </IonContent>
    </IonPage>
  );
}
