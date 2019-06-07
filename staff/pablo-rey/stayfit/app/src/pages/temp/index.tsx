import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonCheckbox,
  IonListHeader,
  IonList,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  IonImg,
} from '@ionic/react';
import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import logic from '../../logic';
import { CalendarWeek } from '../../components/CalendarWeek';
import { ATTENDANCEDEFAULTS, SESSIONVISIBILITY, SESSIONSTATUS } from '../../enums';
import CreateSession from '../../components/CreateSession';
import { MainContext } from '../../logic/contexts/main-context';
import { UserBasic } from '../../components/users/UserBasic';
import { CustomerBasic } from '../../components/users/CustomerBasic';
import ListCustomers from '../../components/users/ListCustomers';

const Temp: React.FC<any> = ({ history, location, client }) => {
  // const [title, setTitle] = useState('');
  // const [provider, setProvider] = useState(null);
  // const [coaches, setCoaches] = useState(['Dani', 'Manuel']);
  // const [days, setDays] = useState([]);
  // const [startTime, setStartTime] = useState(moment().format('hh:mm'));
  // const [endTime, setEndTime] = useState(
  //   moment()
  //     .add(1, 'hour')
  //     .format('hh:mm')
  // );
  // const [maxAttendants, setMaxAttendants] = useState(10);
  // const [type, setType] = useState(null);
  // const [attendanceDefaultStatus, setAttendanceDefaultStatus] = useState('OK');
  // const [attendances, setAttendances] = useState([]);
  // const [visibility, setVisibility] = useState(null);
  // const [status, setStatus] = useState(null);

  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([])

  const ctx = useContext(MainContext);
  useEffect(() => {
    logic.listCustomers("5cfad518677c8826b46fe1d3")
      .then(customers => setCustomers(customers));
  }, [])


  return (
    <IonPage id="main">
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
