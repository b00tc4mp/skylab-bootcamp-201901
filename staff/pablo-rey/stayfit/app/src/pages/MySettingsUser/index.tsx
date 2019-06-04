import React, { useContext, useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import { MainContext } from '../../logic/contexts/main-context';
import logic from '../../logic';

export default function() {
  const ctx = useContext(MainContext);
  const [providersInfo, setProvidersInfo] = useState([]);
  const { user, userId } = ctx;

  const handleRequest = async (providerId, op) => {
    let res: boolean;
    if (op === 'REQUEST') res = await logic.updateRequestCustomer(ctx.userId, providerId, 'ACCEPT');
    else if (op === 'CANCEL') res = await logic.updateRequestCustomer(ctx.userId, providerId, 'CANCEL');
    if (res) {
      const newInfo = await logic.listMyProviders();
      setProvidersInfo(newInfo);
    }
  };

  useEffect(() => {
    logic.listMyProviders().then(res => setProvidersInfo(res));
  }, []);

  return (
    <IonPage id="settings-user">
      <IonContent>
        <IonButton onClick={ctx.logout}>Logout</IonButton>
        <h1>My providers</h1>
        <ul>
          {providersInfo
            .filter(info => info.customerOf)
            .map(({ provider }) => {
              return <li key={provider.id}>{provider.name}</li>;
            })}
        </ul>

        <h1>Other providers</h1>
        <ul>
          {providersInfo
            .filter(info => !info.customerOf)
            .map(({ provider, request }) => {
              return (
                <li key={provider.id}>
                  {provider.name}
                  {!request ? 
                    <IonButton onClick={() => handleRequest(provider.id, 'REQUEST')}>Solicitar</IonButton>
                    :
                    request.status === 'PENDING' ? 
                      <IonButton onClick={() => handleRequest(provider.id, 'CANCEL')}>Cancelar</IonButton>
                      :
                      <p>!!</p>
                  }
                </li>
              );
            })}
        </ul>
      </IonContent>
    </IonPage>
  );
}
