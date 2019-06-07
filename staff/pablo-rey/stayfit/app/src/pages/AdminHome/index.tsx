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
import { withRouter, Route, Switch } from 'react-router-dom';
import { MainContext } from '../../logic/contexts/main-context';
import MainAdmin from '../MainAdmin';
import MyBookings from '../MyBookings';
// import MyProviders from '../MyProviders';
import MySettingsAdmin from '../MySettingsAdmin';
import AdminSessions from '../AdminSessions';
import AdminCustomers from '../AdminCustomers';
import logic from '../../logic';
import { PENDING } from '../../enums';
let count = 0;

const AdminHome: React.FC<any> = ({ history, location }) => {
  const ctx = useContext(MainContext);

  useEffect(() => {
    (async () => {
      if (!ctx.provider) return;
      const crs = await logic.listCustomers(ctx.provider.id)
      ctx.setCustomers(crs);
    })()
  }, [ctx.provider]);

  if (!ctx.user) {
    return <p>No user loaded</p>;
  }

  function ReRoute ({component, path, exact, ...otherProps}) {
    return <Route path={path} exact={exact} render={() => React.createElement(component, otherProps)} />
  }

  const pendingNum = ctx.customers ? ctx.customers.reduce((acc,cr) => acc + (cr.request && cr.request.status === PENDING ? 1 : 0),0) : 0

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
          <Route path="/admin/" component={MainAdmin} exact={true} />
          {/* <ReRoute path="/admin/" exact={true} pendingRequests={pendingRequests} count={++count} component={MainAdmin} /> */}
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
            {!!pendingNum && <IonBadge>{pendingNum}</IonBadge>}
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
