import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonText,
  IonHeader,
} from '@ionic/react';
import gql from 'graphql-tag';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';
import { MainContext } from '../../logic/contexts/main-context';


const SessionsAvailable: React.FC<any> = ({ history, location, client, providerId }) => {
  const day = moment();
  const [view, setView] = useState(day.format('YYYY-MM-DD'));
  const [sessions, setSessions] = useState([]);

  const ctx = useContext(MainContext)

  useEffect(() => {
    logic.availableSessions(providerId, view).then(data => {
      data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
      setSessions(data);
    });
  }, [view]);

  const updateSegment = e => {
    const _day = e.detail.value;
    setView(_day);
  };

  const attendSession = async sessionId => {
    await logic.attendSession(ctx.userId,sessionId,'POSTPAID', 'CONFIRMED' )
  };

  day.subtract(1, 'day');
  return (
    <React.Fragment>
      <IonHeader>
        <IonSegment onIonChange={updateSegment} scrollable>
          {new Array(15).fill(undefined).map((_, i) => {
            day.add(1, 'day');
            return (
              <IonSegmentButton
                key={day.format('YYYY-MM-DD')}
                value={day.format('YYYY-MM-DD')}
                checked={view === day.format('YYYY-MM-DD')}
              >
                <IonLabel>{day.format('D')}</IonLabel>
                <IonText>{day.format('ddd')}</IonText>
              </IonSegmentButton>
            );
          })}
        </IonSegment>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList>
                {sessions.map(
                  ({ id, title, coaches, startTime, endTime, maxAttendants, type: { title: typeTitle }, status }) => {
                    const start = moment(startTime).format('HH:mm');
                    const end = moment(endTime).format('HH:mm');
                    return (
                      <IonItemSliding key={id}>
                        <IonItem>
                          <IonLabel>{`${typeTitle} - ${title}`}</IonLabel>
                          <IonText>{`${start}-${end}`}</IonText>
                        </IonItem>
                        <IonItemOptions side="end">
                          <IonItemOption onClick={() => attendSession(id)}>book</IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                    );
                  }
                )}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </React.Fragment>
  );
};

export default withRouter(SessionsAvailable);
