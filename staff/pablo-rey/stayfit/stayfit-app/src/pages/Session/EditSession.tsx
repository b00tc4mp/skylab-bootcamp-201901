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
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ATTENDANCEDEFAULTS, SESSIONSTATUS, SESSIONVISIBILITY } from '../../enums';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

function EditSession({ history, match }) {
  const ctx = useContext(MainContext);

  const [session, setSession] = useState(null);
  const [title, setTitle] = useState(null);
  const [coaches, setCoaches] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [maxAttendants, setMaxAttendants] = useState(null);
  const [type, setType] = useState(null);
  const [attendanceDefaultStatus, setAttendanceDefaultStatus] = useState(null);
  const [attendances, setAttendances] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [status, setStatus] = useState(null);
  const [notes, setNotes] = useState(null);

  const { id: sessionId } = match.params;

  useEffect(() => {
    ctx.logic.retrieveSession(sessionId).then(session => {
      setTitle(session.title);
      setCoaches(session.coaches);
      setStartTime(moment(session.startTime).format('YYYY-MM-DD HH:mm'));
      setEndTime(moment(session.endTime).format('HH:mm'));
      setMaxAttendants(session.maxAttendants);
      setType(session.type);
      setAttendanceDefaultStatus(session.attendanceDefaultStatus);
      setAttendances(session.attendances);
      setVisibility(session.visibility);
      setStatus(session.status);
      setNotes(session.notes);

      setSession(session);
    });
  }, [sessionId]);

  const handleSave = async () => {
    const result = await logic.updateSession(sessionId, {
      title,
      provider: ctx.provider,
      coaches,
      startTime,
      endTime,
      maxAttendants,
      type,
      status,
      visibility,
      notes,
    });

    if (result) history.push('/admin');
  };

  const handleDelete = async () => {
    const result = await logic.deleteSession(sessionId);

    if (result) history.push('/admin');
  };

  return (
    <>
      {!session && (
        <IonPage>
          <IonSpinner align-self-center justify-self-center />
          <IonText>Loading...</IonText>
        </IonPage>
      )}
      {!!session && (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton goBack={() => {}} text="buttonText" icon="buttonIcon" />
                <IonTitle>Edit session</IonTitle>
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
                <IonCol col-xs="8">
                  <IonItem>
                    <IonLabel position="stacked">Start Time</IonLabel>
                    <IonDatetime
                      pickerFormat="DD-MM-YYYY HH:mm"
                      displayFormat="DD-MM-YYYY HH:mm"
                      minuteValues="0,15,30,45"
                      value={startTime}
                      onIonChange={(e: any) => setStartTime(e.target.value)}
                    />
                  </IonItem>
                </IonCol>
                <IonCol col-xs="4">
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
                    <IonSelect value={type.id} 
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
                <IonCol size="4">
                  <IonButton color="danger" expand="block" onClick={handleDelete}>
                    <IonIcon name="trash" />
                    Delete
                  </IonButton>
                </IonCol>
                <IonCol size="8">
                  <IonButton expand="block" onClick={handleSave}>
                    Save
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonLabel>
          </IonContent>
        </IonPage>
      )}
    </>
  );
}

export default withRouter(EditSession);
