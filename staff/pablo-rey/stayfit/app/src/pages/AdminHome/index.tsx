import {
  IonBadge,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { PENDING } from '../../enums';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';
import AdminCustomers from './AdminCustomers';
import AdminSessions from './AdminSessions';
import CreateSession from '../Session/CreateSession';
import MainAdmin from './MainAdmin';
import MySettingsAdmin from './MySettingsAdmin';
import EditSession from '../Session/EditSession';

const AdminHome: React.FC<any> = ({ history, location }) => {
  const ctx = useContext(MainContext);

  // useEffect(() => {
  //   (async () => {
  //     if (!ctx.provider) return;
  //     const crs = await logic.listCustomers(ctx.provider.id);
  //     ctx.setCustomers(crs);
  //   })();
  // }, [ctx.provider]);

  if (!ctx.user) {
    return <p>No user loaded</p>;
  }

  const pendingNum = ctx.customers
    ? ctx.customers.reduce((acc, cr) => acc + (cr.request && cr.request.status === PENDING ? 1 : 0), 0)
    : 0;

  return (
    <IonPage id="admin_home">
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/admin/:tab(sessions)" component={AdminSessions} />
          <Route path="/admin/:tab(customers)" component={AdminCustomers} />
          <Route path="/admin/:tab(settings)" component={MySettingsAdmin} />
          <Route path="/admin/createSession" render={() => <CreateSession />} />
          <Route path="/admin/editSession/:id" render={() => <EditSession />} />
          <Route path="/admin/" component={MainAdmin} exact={true} />
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
