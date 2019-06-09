import moment from 'moment';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';

const Temp = ({ history, location, client }) => {
  const day = moment();
  const [view, setView] = useState(day.format('YYYY-MM-DD'));
  const [sessions, setSessions] = useState([]);
  // const refreshToken =

  const updateSegment = e => {
    const _day = e.detail.value;
    setView(_day);
    logic.availableSessions('5cf3e7e70029b1470ca300c9', _day).then(data => {
      data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
      setSessions(data);
    });
  };

  moment.locale('es');

  return (
    <ion-page id="main">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-grid>
          <ion-row class="ion-justify-content-start">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-center">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-end">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-around">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-between">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-evenly">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-grid>
          <ion-row class="ion-align-items-start">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />#
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-end">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />#
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-center">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />#
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-baseline">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />#
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-stretch">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />#
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  );
};

export default withRouter(Temp);

{
  /* {providers.map(provider => {
    return <p>{provider.name}</p>;
  })} */
}
