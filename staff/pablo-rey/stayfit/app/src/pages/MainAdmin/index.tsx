import React, { useEffect, useState, useContext } from 'react';
import { IonContent, IonPage, IonImg, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';
import moment from 'moment';

export default function MainAdmin({ pendingRequest }) {
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

  useEffect(() => {
    ctx.provider && logic.listSessions(ctx.provider.id, moment()).then(sessions => setSessions(sessions));
  }, [ctx.provider]);

  return (
    <IonPage id="main-admin">
      <IonContent>
        <h1>Admin Main</h1>

        <h2>Clientes pendientes de confirmación</h2>
        {pendingRequest.length}
        <ul>
          {pendingRequest.map(c => (
            <li key={c.id}>
              <p>{c.user.name}</p>
              <IonButton onClick={() => handleAcceptRequest(c.user.id)}>Accept</IonButton>
              <IonButton onClick={() => handleDenyRequest(c.user.id)}>Deny</IonButton>
            </li>
          ))}
        </ul>
        <h2>Reservas para hoy</h2>
        <ul>
          {!!sessions &&
            sessions.map(s => {
              return (
                <li key={s.id}>
                  <p>{s.title}</p>
                  <p>{s.startTime}</p>
                  <p>{s.attendances.length}</p>
                </li>
              );
            })}
        </ul>
      </IonContent>
    </IonPage>
  );
}
