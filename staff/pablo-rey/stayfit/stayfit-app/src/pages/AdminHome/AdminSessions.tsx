import {
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import { MainContext } from '../../logic/contexts/main-context';
import ListSessionsAdmin from '../../components/sessions/ListSessionsAdmin';

function AdminSessions({ history }) {
  const ctx = useContext(MainContext);

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [sessions, setSessions] = useState([]);

  const refresh = async (event?) => {
    const sessions = await ctx.logic.listSessions(ctx.provider.id, moment(date, 'YYYY-MM-DD'));
    setSessions(sessions);
    if (event && event.target && event.target.complete) event.target.complete();
  };

  useEffect(() => {
    refresh();
  }, [date]);

  return (
    <IonPage id="admin_sessions">
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonDatetime
            pickerFormat="DD-MM-YYYY"
            displayFormat="DDD DD/MM"
            value={moment(date).format('YYYY-MM-DD')}
            onIonChange={(e: any) => setDate(moment(e.target.value).format('YYYY-MM-DD'))}
          />
        </IonItem>
        {!!sessions && <ListSessionsAdmin sessions={sessions} onChange={() => {}} />}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/admin/createSession')}>
            <IonIcon name="add" />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

export default withRouter(AdminSessions);
