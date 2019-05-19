import React from 'react';
import {
  IonIcon,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonMenuToggle,
} from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Menu: React.SFC<RouteComponentProps<{}>> = (props) => {

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          <IonListHeader>Navigate</IonListHeader>
          <IonMenuToggle key="Calendar" auto-hide="false">
            <IonItem button onClick={() => {}}>
              <IonIcon slot="start" name="calendar" />
              <IonLabel>Calendar</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList>
          <IonListHeader>Account</IonListHeader>
          <IonMenuToggle key="login" auto-hide="false">
            <IonItem button onClick={() => {}}>
              <IonIcon slot="start" name="person" />
              <IonLabel>Login</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key="logout" auto-hide="false">
            <IonItem button onClick={() => {props.history.push('/logout')}}>
              <IonIcon slot="start" name="log-out" />
              <IonLabel>LogOut</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList>
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" name="hammer" />
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
