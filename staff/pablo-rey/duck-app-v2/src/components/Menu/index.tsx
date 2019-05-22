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

const Menu: React.SFC<RouteComponentProps<{}>> = ({ history }) => {
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
          <IonMenuToggle key="Home" auto-hide="false">
            <IonItem
              button
              onClick={() => {
                history.push('/home');
              }}
            >
              <IonIcon slot="start" name="home" />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key="Favorites" auto-hide="false">
            <IonItem
              button
              onClick={() => {
                history.push('/home/favorites');
              }}
            >
              <IonIcon slot="start" name="heart" />
              <IonLabel>Favorites</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key="Cart" auto-hide="false">
            <IonItem
              button
              onClick={() => {
                history.push('/home/cart');
              }}
            >
              <IonIcon slot="start" name="cart" />
              <IonLabel>Cart</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList>
          <IonListHeader>Account</IonListHeader>
          <IonMenuToggle key="userprofile" auto-hide="false">
            <IonItem button onClick={() => {}}>
              <IonIcon slot="start" name="person" />
              <IonLabel>My profile</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle key="logout" auto-hide="false">
            <IonItem
              button
              onClick={() => {
                history.push('/logout');
              }}
            >
              <IonIcon slot="start" name="log-out" />
              <IonLabel>LogOut</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
