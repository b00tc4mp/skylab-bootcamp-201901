import React, { useState } from 'react';
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

const Home: React.FC<any> = ({ history, location }) => {
  const [view, setView] = useState('all');

  const updateSegment = (e: CustomEvent) => {
    const _view = e.detail.value;
    setView(_view);
  };

  return (
    <>
      <Menu />
      <IonPage id="home">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>

            <IonSegment onIonChange={updateSegment}>
              <IonSegmentButton value="all" checked={view === 'all'}>
                All <IonIcon name="search" />
              </IonSegmentButton>
              <IonSegmentButton value="favorites" checked={view === 'favorites'}>
                Favorites <IonIcon name="heart" />
              </IonSegmentButton>
              <IonSegmentButton value="cart" checked={view === 'cart'}>
                Cart <IonIcon name="cart" />{' '}
                <IonBadge color="secondary" slot="end">
                  2
                </IonBadge>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        home
        </IonContent>
      </IonPage>
    </>
  );
};

export default withRouter(Home);
