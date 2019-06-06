import React, { useState, useContext, useEffect } from 'react';
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
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from '@ionic/react';
import { IonIcon, IonButton } from '@ionic/react';
import Menu from '../../components/Menu';
import { withRouter, Route } from 'react-router-dom';
import { MainContext } from '../../logic/contexts/main-context';
import MainAdmin from '../MainAdmin';
import MyBookings from '../MyBookings';
// import MyProviders from '../MyProviders';
import MySettingsAdmin from '../MySettingsAdmin';
import AdminSessions from '../AdminSessions';
import AdminCustomers from '../AdminCustomers';
import logic from '../../logic';

const AdminHome: React.FC<any> = ({ history, location }) => {
  const ctx = useContext(MainContext);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    ctx.provider && logic.retrievePendingRequest(ctx.provider.id).then(pending => setPendingRequests(pending || []));
  }, [ctx.provider]);

  if (!ctx.user) {
    return <p>No user loaded</p>;
  }

  return (
    <IonPage id="admin_home">
      <IonTabs>
        <IonRouterOutlet>
          {/* <Route path="/:tab(schedule)" component={SchedulePage} exact={true} />
            <Route path="/:tab(speakers)/speaker/:id" component={SpeakerDetail} />
            <Route path="/:tab(speakers)" component={SpeakerList} exact={true} />
            <Route path="/:tab(schedule|speakers)/sessions/:id" component={SessionDetail} />
          <Route path="/:tab(map)" component={MapView} /> */}
          <Route path="/admin/:tab(sessions)" component={AdminSessions} />
          <Route path="/admin/:tab(customers)" component={AdminCustomers} />
          <Route path="/admin/:tab(settings)" component={MySettingsAdmin} />
          <Route path="/admin/" render={() => <MainAdmin pendingRequest={pendingRequests}/>} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="today" href="/admin">
            <IonIcon name="today" />
            <IonLabel>Today</IonLabel>
          </IonTabButton>
          <IonTabButton tab="sessions" href="/admin/sessions">
            <IonIcon name="calendar" />
            <IonLabel>My sessions</IonLabel>
          </IonTabButton>
          <IonTabButton tab="customers" href="/admin/customers">
            <IonIcon name="paper" />
            <IonLabel>My customers</IonLabel>
            {!!pendingRequests.length && <IonBadge>{pendingRequests.length}</IonBadge>}
          </IonTabButton>
          <IonTabButton tab="settings" href="/admin/settings">
            <IonIcon name="settings" />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default withRouter(AdminHome);
