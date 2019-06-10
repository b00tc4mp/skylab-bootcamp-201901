import React, { useState, useContext, useEffect } from 'react';
import {
  IonLabel,
  IonPage,
  IonContent,
  IonPopover,
  IonList,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
  IonInput,
  IonAvatar,
} from '@ionic/react';
import ListUserAllAttendances from './ListUserAllAttendances';
import { MainContext } from '../../logic/contexts/main-context';
import { ATTENDANCESTATUSES, ATTENDANCEPAYMENTTYPES } from '../../enums';
import { AttendanceStatus } from '../attendances/AttendanceStatus';
import { AttendancePaymentType } from '../attendances/AttendancePaymentType';

export default function ViewUserDetail({ user }) {
  const ctx = useContext(MainContext);

  const [sessions, setSessions] = useState([]);
  const [changeStatus, setChangeStatus] = useState(null);
  const [changePayment, setChangePayment] = useState(null);

  const refresh = async () => {
    debugger;
    if (!user) return;
    const sessions = await ctx.logic.listAttendances(user.id, ctx.provider.id);
    setSessions(sessions);
  };

  useEffect(() => {
    refresh();
  }, [user]);
  if (!user) return null;

  const handleChangeStatus = async newStatus => {
    const result = await ctx.logic.updateAttendance(changeStatus.id, newStatus);
    if (result) {
      changeStatus.status = newStatus;
      await refresh();
      setChangeStatus(null);
    } else {
      ctx.setErrorMessage('Unable to change status');
    }
  };

  const handleChangePayment = async newPayment => {
    const result = await ctx.logic.updatePaymentAttendance(changePayment.id, newPayment);
    if (result) {
      changePayment.paymentType = newPayment;
      await refresh();
      setChangePayment(null);
    } else {
      ctx.setErrorMessage('Unable to change payment');
    }
  };

  const handleClickPayment = attendance => {
    setChangePayment(attendance);
  };

  const handleClickStatus = attendance => {
    setChangeStatus(attendance);
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="3">
              <IonAvatar>
                <IonImg src={user.portraitImageUrl} />
              </IonAvatar>
            </IonCol>
            <IonCol size="9">
              <IonLabel position="stacked">Full name</IonLabel>
              <IonInput disabled type="text" name="name" placeholder="name" value={user.name + ' ' + user.surname} />
            </IonCol>
          </IonRow>
        </IonGrid>

        <p>Bookings</p>
        {!!sessions && (
          <>
            <IonPopover isOpen={!!changeStatus} onDidDismiss={() => setChangeStatus(null)}>
              <IonList>
                {ATTENDANCESTATUSES.map(status => (
                  <IonItem key={status}>
                    <AttendanceStatus status={status} onClick={() => handleChangeStatus(status)} />
                  </IonItem>
                ))}
                <IonButton expand="block" onClick={() => setChangeStatus(null)}>
                  No change
                </IonButton>
              </IonList>
            </IonPopover>
            <IonPopover isOpen={!!changePayment} onDidDismiss={() => setChangePayment(null)}>
              <IonList>
                {ATTENDANCEPAYMENTTYPES.map(paymentType => (
                  <IonItem key={paymentType}>
                    <AttendancePaymentType paymentType={paymentType} onClick={() => handleChangePayment(paymentType)} />
                  </IonItem>
                ))}
                <IonButton expand="block" onClick={() => setChangePayment(null)}>
                  No change
                </IonButton>
              </IonList>
            </IonPopover>

            <ListUserAllAttendances
              sessions={sessions}
              onClickPayment={handleClickPayment}
              onClickStatus={handleClickStatus}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
