import React, { useContext, useState } from 'react';
import {
  IonList,
  IonSelect,
  IonSelectOption,
  IonPopover,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
} from '@ionic/react';
import { UserBasic } from './UserBasic';
import { AttendanceStatus } from '../attendances/AttendanceStatus';
import { MainContext } from '../../logic/contexts/main-context';
import { AttendanceStatusesInfo, ATTENDANCESTATUSES } from '../../enums';

export default function ListUsersAttendances({ attendances, onChange }) {
  const ctx = useContext(MainContext);

  const [change, setChange] = useState(null);
  let att = null;

  if (!attendances) return null;

  // FIXME: Don't work

  const handleChange = async newStatus => {
    debugger
    const result = await ctx.logic.updateAttendance(att.id, 'OK'); //TODO: POC
    if (result) {
      att.status = 'OK';
      onChange(att);
    } else {
      //TODO: toast
    }
  };
  
  const handleClick = attendance => {
    att = attendance;
    setChange(true);
  };

  return (
    <>
      <IonPopover isOpen={change} onDidDismiss={() => setChange(null)}>
        <IonList>
          {ATTENDANCESTATUSES.map(status => (
            <IonItem>
              <AttendanceStatus key={status} status={status} onClick={handleChange.bind(status)} />
            </IonItem>
          ))}
          <IonButton expand="block" onClick={() => setChange(null)}>
            No change
          </IonButton>
        </IonList>
      </IonPopover>
      <IonList>
        {attendances.map(att => (
          <UserBasic
            key={att.id}
            user={att.user}
            render={<AttendanceStatus status={att.status} onClick={() => handleClick(att)} />}
          />
        ))}
      </IonList>
    </>
  );
}
