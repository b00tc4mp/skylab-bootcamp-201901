import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonRow } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { ATTENDANCEPAYMENTTYPES, ATTENDANCESTATUSES } from '../../enums';
import { MainContext } from '../../logic/contexts/main-context';
import { AttendancePaymentType } from '../attendances/AttendancePaymentType';
import { AttendanceStatus } from '../attendances/AttendanceStatus';
import ListUserAllAttendances from './ListUserAllAttendances';

export default function ViewUserDetail({ user, isAdmin = false }) {
  const ctx = useContext(MainContext);

  const [sessions, setSessions] = useState([]);
  const [changeStatus, setChangeStatus] = useState(null);
  const [changePayment, setChangePayment] = useState(null);

  const refresh = async () => {
    debugger;
    if (!user) return;
    const providerId = ctx.provider ? ctx.provider.id : null;
    const sessions = await ctx.logic.listAttendances(user.id, providerId);
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
    if (!isAdmin) return;
    setChangePayment(attendance);
  };

  const handleClickStatus = attendance => {
    if (!isAdmin) return;
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

        <h3>Bookings</h3>
        {!!sessions && (
          <>
            {isAdmin && (
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
                        <AttendancePaymentType
                          paymentType={paymentType}
                          onClick={() => handleChangePayment(paymentType)}
                        />
                      </IonItem>
                    ))}
                    <IonButton expand="block" onClick={() => setChangePayment(null)}>
                      No change
                    </IonButton>
                  </IonList>
                </IonPopover>
              </>
            )}
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
