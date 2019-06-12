import React, { useContext } from 'react';
import { IonItem, IonImg, IonAvatar, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { PENDING, ACTIVE } from '../../enums';
import { MainContext } from '../../logic/contexts/main-context';

export default function ProviderBasic({ provider: __provider }) {
  
  const ctx = useContext(MainContext)
  
  let provider;
  let request;
  if (__provider.request !== undefined) {
    provider = __provider.provider;
    request = __provider.request;
  } else {
    provider = __provider;
  }

  const handleRequest = async op => {
    let res;
    if (op === 'REQUEST') res = await ctx.logic.updateRequestCustomer(ctx.userId, provider.id, 'ACCEPT');
    else if (op === 'CANCEL') res = await ctx.logic.updateRequestCustomer(ctx.userId, provider.id, 'CANCEL');
    if (res) {
      ctx.refreshUserData();
    }
  };

  const statusInfo = () => {
    if (!request)
      return (
        <IonButton onClick={() => handleRequest('REQUEST')} slot="end">
          Say Hi!
        </IonButton>
      );
    if (request.status === PENDING)
      return (
        <IonButton onClick={() => handleRequest('CANCEL')} slot="end">
          Cancel request
        </IonButton>
      );
    if (request.status === ACTIVE) return <IonIcon name="checkmark-circle-outline" color="success" />;

    return null;
  };

  return (
    <IonItem>
      <IonAvatar slot="start">
        <IonImg src={provider.portraitImageUrl} />
      </IonAvatar>
      <IonLabel>{`${provider.name}`}</IonLabel>
      {statusInfo()}
    </IonItem>
  );
}
