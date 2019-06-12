import { IonItemOption, IonItemOptions } from '@ionic/react';
import React from 'react';
import { withRouter } from 'react-router';

function AttendanceAdminSlidingButtons(props) {
  const { history, session } = props;

  return (
    <IonItemOptions side="end">
      <IonItemOption onClick={e => history.push(`/admin/editSession/${session.id}`)}>Edit</IonItemOption>
    </IonItemOptions>
  );
}

export default withRouter(AttendanceAdminSlidingButtons);
