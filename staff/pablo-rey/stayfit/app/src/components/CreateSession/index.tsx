import { IonCol, IonDatetime, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import moment from 'moment';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CalendarWeek } from '../../components/CalendarWeek';
import { ATTENDANCEDEFAULTS, SESSIONSTATUS, SESSIONVISIBILITY } from '../../enums';

const CreateSession: React.FC<any> = ({ history, location, client }) => {
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState(null);
  const [coaches, setCoaches] = useState(['Dani', 'Manuel']);
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState(moment().format('hh:mm'));
  const [endTime, setEndTime] = useState(
    moment()
      .add(1, 'hour')
      .format('hh:mm')
  );
  const [maxAttendants, setMaxAttendants] = useState(10);
  const [type, setType] = useState(null);
  const [attendanceDefaultStatus, setAttendanceDefaultStatus] = useState('OK');
  const [attendances, setAttendances] = useState([]);
  const [visibility, setVisibility] = useState(null);
  const [status, setStatus] = useState(null);

  return (
    <>
      <h1>Create a session</h1>
      <IonGrid>
        <IonRow>
          <IonCol>
            <CalendarWeek numWeeks={4} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">title</IonLabel>
              <IonInput
                type="text"
                name="title"
                placeholder="title"
                value={title}
                onIonChange={e => setTitle(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonItem>
          <IonLabel position="stacked">Coaches</IonLabel>
          <IonSelect multiple={true}>
            {coaches.map(coach => (
              <IonSelectOption key={coach} value={coach}>
                {coach}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonRow>
          <IonCol col-xs="6">
            <IonItem>
              <IonLabel position="stacked">Start Time</IonLabel>
              <IonDatetime pickerFormat="HH:mm" displayFormat="HH:mm" minuteValues="0,15,30,45" value={startTime} />
            </IonItem>
          </IonCol>
          <IonCol col-xs="6">
            <IonItem>
              <IonLabel position="stacked">End Time</IonLabel>
              <IonDatetime pickerFormat="HH:mm" displayFormat="HH:mm" minuteValues="0,15,30,45" value={endTime} />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol col-xs="6">
            <IonItem>
              <IonLabel position="stacked">Max attendants</IonLabel>
              <IonInput
                type="number"
                name="maxAttendants"
                placeholder="Max attendants"
                value={maxAttendants.toString()}
                onIonChange={e => setMaxAttendants(parseInt(e.detail.value))}
              />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">default enroll</IonLabel>
              <IonSelect>
                {ATTENDANCEDEFAULTS.map(status => (
                  <IonSelectOption key={status} value={attendanceDefaultStatus}>
                    {status}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol col-xs="6">
            <IonItem>
              <IonLabel position="stacked">Visibility</IonLabel>
              <IonSelect>
                {SESSIONVISIBILITY.map(vis => (
                  <IonSelectOption key={vis} value={visibility}>
                    {vis}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Status</IonLabel>
              <IonSelect>
                {SESSIONSTATUS.map(s => (
                  <IonSelectOption key={s} value={status}>
                    {s}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonImg src="" />
          </IonCol>
          <IonCol />
        </IonRow>
      </IonGrid>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon name="add" />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default withRouter(CreateSession);
