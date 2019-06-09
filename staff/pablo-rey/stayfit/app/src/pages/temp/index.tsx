import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ListCustomers from '../../components/users/ListCustomers';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

const Temp: React.FC<any> = ({ history, location, client }) => {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([]);

  const ctx = useContext(MainContext);
  useEffect(() => {
    logic.listCustomers('5cfad518677c8826b46fe1d3').then(customers => setCustomers(customers));
  }, []);

  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton goBack={() => {}} text="buttonText" icon="buttonIcon" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <CreateSession/> */}
        {customers && <ListCustomers customersAndRequests={customers} />}
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Temp);

{
  /* {providers.map(provider => {
  return <p>{provider.name}</p>;
})} */
}

// <Menu />
// <IonPage id="main">
//   <ion-tabs>
//     <ion-tab tab="home">
//       <Home />
//     </ion-tab>
//     <ion-tab tab="bookings">My bookings</ion-tab>
//     <ion-tab tab="settings">Settings Content</ion-tab>

//     <ion-tab-bar slot="bottom">
//       <ion-tab-button tab="home">
//         <ion-label>Home</ion-label>
//         <ion-icon name="home" />
//         <ion-badge>6</ion-badge>
//       </ion-tab-button>

//       <ion-tab-button tab="bookings">
//         <ion-label>My bookings</ion-label>
//         <ion-icon name="fitness" />
//       </ion-tab-button>
//       <ion-tab-button tab="settings">
//         <ion-label>Settings</ion-label>
//         <ion-icon name="settings" />
//       </ion-tab-button>
//     </ion-tab-bar>
//   </ion-tabs>
// </IonPage>
