import {
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonPage,
  IonHeader,
} from '@ionic/react';
import moment from 'moment';
import React, { useState } from 'react';
import AttendanceItem from '../attendances/AttendanceItem';
import ViewSession from './ViewSession';

export default function ListSessionsCustomer({
  sessions,
  showToday = false,
  showWeek = false,
  showOthers = false,
  onChange,
}) {
  const [showDetail, setShowDetail] = useState(null);

  const handleDetail = session => {
    setShowDetail(session);
  };

  if (!sessions || sessions.length === 0) return null;
  if (!showToday && !showWeek && !showOthers) {
    showToday = showWeek = showOthers = true;
  }

  const groups = { today: [], thisWeek: [], others: [] };
  const today = moment().endOf('day');
  const endWeek = moment()
    .endOf('week')
    .add(1, 'day');
  for (let session of sessions) {
    const time = moment(session.startTime);
    if (time.isSameOrBefore(today)) groups.today.push(session);
    else if (time.isSameOrBefore(endWeek)) groups.thisWeek.push(session);
    else groups.others.push(session);
  }

  return (
    <>
      <IonModal isOpen={!!showDetail} onDidDismiss={() => setShowDetail(null)} animated>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowDetail(null)}>Close</IonButton>
              </IonButtons>
              <IonTitle>Session details</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <ViewSession session={showDetail} />
          </IonContent>
        </IonPage>
      </IonModal>
      <IonList>
        {!!groups.today.length && showToday && (
          <>
            <IonItemDivider>
              <IonLabel>Today</IonLabel>
            </IonItemDivider>
            {groups.today.map(session => {
              return <AttendanceItem key={session.id} session={session} onChange={onChange} onDetail={handleDetail} />;
            })}
          </>
        )}
        {!!groups.thisWeek.length && showWeek && (
          <>
            <IonItemDivider>
              <IonLabel>This week</IonLabel>
            </IonItemDivider>
            {groups.thisWeek.map(session => {
              return <AttendanceItem key={session.id} session={session} onChange={onChange} onDetail={handleDetail} />;
            })}
          </>
        )}
        {!!groups.others.length && showOthers && (
          <>
            <IonItemDivider>
              <IonLabel>Later</IonLabel>
            </IonItemDivider>
            {groups.others.map(session => {
              return <AttendanceItem key={session.id} session={session} onChange={onChange} onDetail={handleDetail} />;
            })}
          </>
        )}
      </IonList>
    </>
  );
}
