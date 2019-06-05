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
  IonRefresherContent,
  IonRefresher,
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

  const ctx = useContext(MainContext);

  function refresh(event?: any) {
    logic.availableSessions(providerId, view).then(data => {
      data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
      setSessions(data);
      if (event) event.target.complete();
    });
  }

  useEffect(() => {
    refresh();
  }, [view]);

  const updateSegment = e => {
    const _day = e.detail.value;
    setView(_day);
  };

  const attendSession = (event, sessionId) => {
    event.target.parentElement.parentElement.closeOpened();
    logic.attendSession(ctx.userId, sessionId, 'POSTPAID').then(() => refresh());
  };

  const unattendSession = (event, attendanceId) => {
    event.target.parentElement.parentElement.closeOpened();
    logic.unattendSession(attendanceId, 'CANCELLEDBYUSER').then(() => refresh());
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
            <IonRefresher slot="fixed" onIonRefresh={refresh}>
              <IonRefresherContent />
            </IonRefresher>
            <IonCol>
              <IonList>
                {sessions.map(
                  ({
                    id,
                    title,
                    coaches,
                    startTime,
                    endTime,
                    maxAttendants,
                    type: { title: typeTitle },
                    status,
                    myAttendance,
                  }) => {
                    const start = moment(startTime).format('HH:mm');
                    const end = moment(endTime).format('HH:mm');
                    const attStatus = myAttendance ? myAttendance.status : null;
                    return (
                      <IonItemSliding key={id}>
                        <IonItem>
                          {(() => {
                            switch (attStatus) {
                              case 'CONFIRMED':
                              case 'OK':
                                return <IonIcon name="checkmark-circle-outline" color="success" />;
                              case 'CANCELLEDBYPROVIDER':
                                return <IonIcon name="close-circle-outline" color="red" />;
                              case 'CANCELLEDBYUSER':
                                return null;
                              case 'NOSHOW':
                              case 'ATTENDED':
                              case 'NOCOUNT':
                                return <IonIcon name="information-circle-outline" color="red" />;
                              case 'PENDINGAPPROVAL':
                              case 'PENDINGCANCELLATION':
                                return <IonIcon name="help-circle-outline" color="info" />;
                            }
                            return null;
                          })()}
                          <IonLabel>{`${typeTitle} - ${title}`}</IonLabel>
                          <IonText>{`${start}-${end}`}</IonText>
                        </IonItem>
                        {!myAttendance || ['CANCELLEDBYUSER'].includes(attStatus) ? (
                          <IonItemOptions side="end">
                            <IonItemOption onClick={(e: any) => attendSession(e, id)}>book</IonItemOption>
                          </IonItemOptions>
                        ) : (
                          ['CONFIRMED', 'OK', 'PENDINGAPPROVAL'].includes(attStatus) && (
                            <IonItemOptions side="end">
                              <IonItemOption color="danger" onClick={e => unattendSession(e, myAttendance.id)}>
                                cancel
                              </IonItemOption>
                            </IonItemOptions>
                          )
                        )}
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
