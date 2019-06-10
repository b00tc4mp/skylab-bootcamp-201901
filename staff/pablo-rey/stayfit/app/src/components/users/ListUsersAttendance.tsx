import { IonButton, IonItem, IonList, IonPopover } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { ATTENDANCESTATUSES, ATTENDANCEPAYMENTTYPES } from '../../enums';
import { MainContext } from '../../logic/contexts/main-context';
import { AttendanceStatus } from '../attendances/AttendanceStatus';
import { UserBasic } from './UserBasic';
import { AttendancePaymentType } from '../attendances/AttendancePaymentType';

export default function ListUsersAttendances({ attendances, onChange }) {
  const ctx = useContext(MainContext);

  const [changeStatus, setChangeStatus] = useState(null);
  const [changePayment, setChangePayment] = useState(null);

  if (!attendances) return null;

  const handleChangeStatus = async newStatus => {
    const result = await ctx.logic.updateAttendance(changeStatus.id, newStatus);
    if (result) {
      changeStatus.status = newStatus;
      onChange(changeStatus);
      setChangeStatus(null);
    } else {
      ctx.setErrorMessage('Unable to change status');
    }
  };

  const handleChangePayment = async newPayment => {
    const result = await ctx.logic.updatePaymentAttendance(changePayment.id, newPayment);
    if (result) {
      changePayment.paymentType = newPayment;
      onChange(changePayment);
      setChangePayment(null);
    } else {
      ctx.setErrorMessage('Unable to change payment');
    }
  };

  return (
    <>
      <IonPopover isOpen={!!changeStatus} onDidDismiss={() => setChangeStatus(null)}>
        <IonList>
          {ATTENDANCESTATUSES.map(status => (
            <IonItem key={status}>
              <AttendanceStatus  status={status} onClick={() => handleChangeStatus(status)} />
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
      <IonList>
        {attendances.map(att => (
          <UserBasic
            key={att.id}
            user={att.user}
            render={
              <div key={att.id}>
                <AttendancePaymentType paymentType={att.paymentType} onClick={() => setChangePayment(att)} />
                <AttendanceStatus status={att.status} onClick={() => setChangeStatus(att)} />
              </div>
            }
          />
        ))}
      </IonList>
    </>
  );
}
