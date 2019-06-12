import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CalendarWeek } from '../../components/CalendarWeek';
import { ATTENDANCEDEFAULTS, SESSIONSTATUS, SESSIONVISIBILITY } from '../../enums';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

function CreateSession({ history }) {
  const ctx = useContext(MainContext);

  const [title, setTitle] = useState('');
  const [coaches, setCoaches] = useState([]);
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState(moment().format('hh:mm'));
  const [endTime, setEndTime] = useState(
    moment()
      .add(1, 'hour')
      .format('hh:mm')
  );
  const [maxAttendants, setMaxAttendants] = useState(10);
  const [type, setType] = useState(ctx.provider.sessionTypes[0]);
  const [attendanceDefaultStatus, setAttendanceDefaultStatus] = useState('OK');
  const [attendances, setAttendances] = useState([]);
  const [visibility, setVisibility] = useState(SESSIONVISIBILITY[0]);
  const [status, setStatus] = useState(SESSIONSTATUS[0]);
  const [notes, setNotes] = useState('');
  const repeatState = useState([]);
  const [repeat, setRepeat] = repeatState;

  const handleSave = async () => {
    const session = await ctx.logic.createSessions({
      title,
      provider: ctx.provider,
      coaches,
      startTime,
      endTime,
      repeat,
      maxAttendants,
      type,
      status,
      visibility,
      notes,
    });
    if (session) history.push('/admin');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton goBack={() => {}} text="buttonText" icon="buttonIcon" />
            <IonTitle>Create a session</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLabel>
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
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Coaches</IonLabel>
                <IonSelect
                  multiple={true}
                  onIonChange={(e: any) =>
                    setCoaches(e.target.value.map(id => ctx.provider.coaches.find(coach => coach.id === id)))
                  }
                >
                  {ctx.provider.coaches.map(coach => (
                    <IonSelectOption
                      key={coach.id}
                      value={coach.id}
                      selected={coaches.map(({ id }) => id).includes(coach.id)}
                    >
                      {coach.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol col-xs="6">
              <IonItem>
                <IonLabel position="stacked">Start Time</IonLabel>
                <IonDatetime
                  pickerFormat="HH:mm"
                  displayFormat="HH:mm"
                  minuteValues="0,15,30,45"
                  value={startTime}
                  onIonChange={(e: any) => setStartTime(e.target.value)}
                />
              </IonItem>
            </IonCol>
            <IonCol col-xs="6">
              <IonItem>
                <IonLabel position="stacked">End Time</IonLabel>
                <IonDatetime
                  pickerFormat="HH:mm"
                  displayFormat="HH:mm"
                  minuteValues="0,15,30,45"
                  value={endTime}
                  onIonChange={(e: any) => setEndTime(e.target.value)}
                />
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
                <IonSelect
                  value={attendanceDefaultStatus}
                  onIonChange={(e: any) => setAttendanceDefaultStatus(e.target.value)}
                >
                  {ATTENDANCEDEFAULTS.map(status => (
                    <IonSelectOption key={status} value={status}>
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
                <IonSelect value={visibility} onIonChange={(e: any) => setVisibility(e.target.value)}>
                  {SESSIONVISIBILITY.map(vis => (
                    <IonSelectOption key={vis} value={vis}>
                      {vis}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Status</IonLabel>
                <IonSelect value={status} onIonChange={(e: any) => setStatus(e.target.value)}>
                  {SESSIONSTATUS.map(status => (
                    <IonSelectOption key={status} value={status}>
                      {status}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Session type</IonLabel>
                <IonSelect
                  value={type.id}
                  onIonChange={(e: any) => setType(ctx.provider.sessionTypes.find(st => st.id === e.target.value))}
                >
                  {ctx.provider.sessionTypes.map(sessionType => (
                    <IonSelectOption key={sessionType.id} value={sessionType.id}>
                      {sessionType.type}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Notes</IonLabel>
                <IonTextarea value={notes} onIonChange={(e: any) => setNotes(e.target.value)} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CalendarWeek numWeeks={4} selectedState={repeatState} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleSave}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
}

export default withRouter(CreateSession);
