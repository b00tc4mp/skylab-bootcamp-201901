import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import React, { useContext } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { MainContext } from '../../logic/contexts/main-context';
import MainUser from './MainUser';
import MyBookings from './MyBookings';
import MyProviders from './MyProviders';
import MySettingsUser from './MySettingsUser';

const Home: React.FC<any> = ({ history, location }) => {
  const ctx = useContext(MainContext);

  if (!ctx.user) {
    return <p>No user loaded</p>;
  }

  return (
    <IonPage id="main">
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home/:tab(bookings)" component={MyBookings} />
          <Route path="/home/:tab(providers)" component={MyProviders} />
          <Route path="/home/:tab(settings)" component={MySettingsUser} />
          <Route path="/home/" component={MainUser} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="today" href="/home">
            <IonIcon name="today" />
            <IonLabel>Today</IonLabel>
          </IonTabButton>
          <IonTabButton tab="bookings" href="/home/bookings" disabled={!ctx.user.customerOf.length}>
            <IonIcon name="calendar" />
            <IonLabel>My bookings</IonLabel>
          </IonTabButton>
          <IonTabButton tab="providers" href="/home/providers" disabled={!ctx.user.customerOf.length}>
            <IonIcon name="paper" />
            <IonLabel>My providers</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/home/settings">
            <IonIcon name="settings" />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default withRouter(Home);
