import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { Link } from 'react-router-dom';
import logic from '../../logic';

export default function Landing() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    (async () => {
      setProviders(await logic.listMyProviders());
    })();
  }, []);

  return (
    <IonPage id="main-user">
      <IonContent>
        <h1>User Main</h1>
        <h2>Proveedores activos</h2>
        <ul>
          {providers
            .filter(({ request }) => request && request.status === 'ACCEPT')
            .map(({ id, name, bannerImageUrl, portraitImageUrl }) => {
              return (
                <li key={id}>
                  <IonImg src={portraitImageUrl} />
                  <p>{name}</p>
                </li>
              );
            })}
        </ul>

        <h2>Proveedores pendientes de confirmación</h2>
        <ul>
          {providers
            .filter(({ request }) => request && request.status === 'PENDING')
            .map(({ id, name, bannerImageUrl, portraitImageUrl }) => {
              return (
                <li key={id}>
                  <IonImg src={portraitImageUrl} />
                  <p>{name}</p>
                </li>
              );
            })}
        </ul>
        <h2>Reservas para hoy</h2>
      </IonContent>
    </IonPage>
  );
}
