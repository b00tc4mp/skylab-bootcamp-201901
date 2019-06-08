import React from 'react';
import { IonList } from '@ionic/react';
import ProviderBasic from '../ProviderBasic';
import { PENDING, ACTIVE } from '../../../enums';

export default function ListProviders({ providers: __providers, onlyPending = false, onlyActive = false }) {
  if (!__providers) return null;
  let providers;

  if (!onlyPending && !onlyActive) {
    providers = __providers;
  } else {
    if (onlyPending) providers = __providers.filter(({ request }) => request && request.status === PENDING);
    if (onlyActive) providers = __providers.filter(({ request }) => request && request.status === ACTIVE);
  }

  return (
    <IonList>
      {providers
        .map(provider => (
          <ProviderBasic key={provider.id} provider={provider} />
        ))}
    </IonList>
  );
}
