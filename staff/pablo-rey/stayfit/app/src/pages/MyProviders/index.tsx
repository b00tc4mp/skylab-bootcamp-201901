import React, { useState, useContext } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonLoading,
  IonBadge,
  IonModal,
} from '@ionic/react';
import { IonIcon, IonButton } from '@ionic/react';
import Menu from '../../components/Menu/';
import { withRouter } from 'react-router-dom';
import { MainContext } from '../../logic/contexts/main-context';
import SessionsAvailable from '../SessionsAvailable';

const Home: React.FC<any> = ({ history, location }) => {
  const ctx = useContext(MainContext);

  const { customerOf } = ctx.user;

  const [view, setView] = useState(customerOf[0].id);

  const updateSegment = (e: CustomEvent) => {
    const _view = e.detail.value;
    setView(_view);
  };

  return (
    <IonPage id="providers-user">
      <IonHeader>
        <IonToolbar color="primary">
          <IonSegment onIonChange={updateSegment}>
            {customerOf.map(provider => {
              const { id, name } = provider;
              return (
                <IonSegmentButton key={id} value={id} checked={view === id}>
                  {name} <IonIcon name="fitness" />
                </IonSegmentButton>
              );
            })}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SessionsAvailable providerId={view} /> 
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);
