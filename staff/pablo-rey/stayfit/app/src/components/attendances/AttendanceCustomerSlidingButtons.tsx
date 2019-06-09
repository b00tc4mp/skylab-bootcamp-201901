import React, { useContext } from 'react'
import { MainContext } from '../../logic/contexts/main-context';
import { IonItemOptions, IonItemOption } from '@ionic/react';

export default function AttendanceCustomerSlidingButtons ({session, attendance, onChange}) {

  const ctx = useContext(MainContext)

  const attStatus = attendance ? attendance.status : null;

  const handleAttendSession = (event, session) => {
    event.target.parentElement.parentElement.closeOpened();
    ctx.logic
      .attendSession(ctx.userId, session.id, 'POSTPAID')
      .then(() => onChange())
      .catch(error => ctx.setErrorMessage(error.message));
  };

  const handleUnattendSession = (event, attendance) => {
    event.target.parentElement.parentElement.closeOpened();
    ctx.logic
      .updateAttendance(attendance.id, 'CANCELLEDBYUSER')
      .then(() => onChange())
      .catch(error => ctx.setErrorMessage(error.message));
  };
    const bookButton = (
      <IonItemOptions side="end">
        <IonItemOption onClick={e => handleAttendSession(e, session)}>book</IonItemOption>
      </IonItemOptions>
    );
    const cancelButton = (
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={e => handleUnattendSession(e, attendance)}>
          cancel
        </IonItemOption>
      </IonItemOptions>
    );
    if (!attStatus) return bookButton;
    switch (attStatus) {
      case 'CONFIRMED':
      case 'OK':
        return cancelButton;
      case 'CANCELLEDBYPROVIDER':
        return null;
      case 'CANCELLEDBYUSER':
        return bookButton;
      case 'NOSHOW':
      case 'ATTENDED':
      case 'NOCOUNT':
        return null;
      case 'PENDINGAPPROVAL':
        return cancelButton;
      case 'PENDINGCANCELLATION':
        return bookButton;
    }
    return null;

}