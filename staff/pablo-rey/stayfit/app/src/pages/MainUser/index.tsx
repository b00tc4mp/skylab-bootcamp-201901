import React, { useEffect, useState, useContext } from 'react';
import { IonContent, IonPage, IonImg, IonList } from '@ionic/react';
import { Link } from 'react-router-dom';
import logic from '../../logic';
import ListSessionsCustomer from '../../components/sessions/ListSessionsCustomer';
import { MainContext } from '../../logic/contexts/main-context';
import ListProviders from '../../components/providers/ListProviders';

export default function MainUser() {
  const [providers, setProviders] = useState([]);

  const ctx = useContext(MainContext);

  const refresh = () => {
    logic.listMyProviders().then(providers => setProviders(providers));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <IonPage id="main-user">
      <IonContent>
        <h2>Proveedores pendientes de confirmación</h2>
        <ListProviders providers={ctx.myProviders} onlyPending /> 
        <h2>Reservas para hoy</h2>
        <ListSessionsCustomer
          sessions={ctx.nextAttendances}
          showToday
          onChange={() => {
            ctx.refreshUserData();
          }}
        />
      </IonContent>
    </IonPage>
  );
}
