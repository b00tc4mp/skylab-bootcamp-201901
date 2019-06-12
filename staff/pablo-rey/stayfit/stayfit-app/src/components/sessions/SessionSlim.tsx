import React from 'react';
import { AttendancePaymentType } from '../attendances/AttendancePaymentType';
import { IonItem, IonLabel, IonGrid, IonRow, IonCol, IonPopover, IonList, IonButton } from '@ionic/react';
import { AttendanceStatus } from '../attendances/AttendanceStatus';
import moment from 'moment';
import { ATTENDANCESTATUSES, ATTENDANCEPAYMENTTYPES } from '../../enums';

export default function SessionSlim({ session, attendance,  onClickStatus, onClickPayment }) {
  return (
    <>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>{`${moment(session.startTime).format('dddd DD/MM/YYYY HH:MM')}-${moment(session.endTime).format(
                'HH:MM'
              )}`}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>{session.title}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <AttendancePaymentType
                paymentType={attendance.paymentType}
                onClick={() =>onClickPayment(attendance)}
              />
            </IonCol>
            <IonCol>
              <AttendanceStatus
                status={attendance.status}
                onClick={() => onClickStatus(attendance)}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </>
  );
}
