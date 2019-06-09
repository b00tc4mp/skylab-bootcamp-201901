import React from 'react';
import moment from 'moment';

export default function SessionBasic({ session }) {
  return (
    <ion-item>
      <ion-avatar slot="start">
        <ion-img src={session.provider.portraitImageUrl} />
        <ion-badge margin-top color="dark">
          {session.type.title}
        </ion-badge>
      </ion-avatar>
      <ion-grid>
        <ion-row>
          <ion-col size="8">
            <ion-row>
              <ion-col>
                <ion-label>
                  {moment(session.startTime).format('hh:mm')}-{moment(session.endTime).format('hh:mm')}
                </ion-label>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-note>coaches: {session.coaches.map(coach => coach.name).join('-')}</ion-note>
              </ion-col>
            </ion-row>
            {!!session.title && (
              <ion-row>
                <ion-col>
                  <ion-label>{session.title}</ion-label>
                </ion-col>
              </ion-row>
            )}
            {!!session.attendances && (
              <ion-row>
                <ion-col>
                  <ion-note>
                    Asistentes:{' '}
                    {session.attendances.length
                      ? session.attendances.map(att => att.user.name).join(', ')
                      : 'No hay reservas'}
                  </ion-note>
                </ion-col>
              </ion-row>
            )}
          </ion-col>
          <ion-col class="ion-align-items-center ion-justify-content-center" size="4">
            <ion-button>Reservar</ion-button>
            <ion-text>
              {session.countAttendances}/{session.maxAttendants}
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
  );
}
