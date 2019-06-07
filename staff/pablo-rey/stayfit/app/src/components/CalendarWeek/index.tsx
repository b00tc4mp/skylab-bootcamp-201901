import React, { useState } from 'react';
import { IonGrid, IonCol, IonRow, IonText } from '@ionic/react';
import moment from 'moment';

export function CalendarWeek({
  startDate = new Date(),
  numWeeks = 3,
  beforeDisabled = true,
  initialSelection = [],
  onChange,
}: {
  startDate?: Date | string;
  numWeeks?: number;
  beforeDisabled?: boolean;
  initialSelection?: string[];
  onChange?: (result: string[], changed?: string[]) => void;
}) {
  const [selected, setSelected] = useState(initialSelection);

  const start = moment(startDate).startOf('day');
  const d = start.clone().startOf('week').add(1, 'day');
  const days = new Array(numWeeks).fill('').map(() => []);
  days[0].push(d.clone());
  for (let ii = 1, ll = numWeeks * 7; ii < ll; ii++) {
    days[Math.floor(ii / 7)].push(d.add(1, 'day').clone());
  }

  const handleSelect = _day => {
    let days = [];
    if (_day.includes('header')) {
      const ini = moment(_day.split('/')[0]);
      days.push(ini.format('YYYY-MM-DD'));
      for (let ii = 1; ii < numWeeks; ii++) {
        days.push(ini.add(1, 'week').format('YYYY-MM-DD'));
      }
    } else days.push(_day);
    let res = [...selected];
    for (let day of days) {
      if (!beforeDisabled || moment(day).isSameOrAfter(start)) {
        if (selected.includes(day)) res = res.filter(v => v !== day);
        else res.push(day);
      }
    }
    setSelected(res);
    if (onChange) onChange(res, days);
  };

  const sel = (d: moment.Moment) => selected.includes(d.format('YYYY-MM-DD'));

  return (
    <IonGrid>
      <IonRow>
        {days[0].map((day,i) => (
          <IonCol
            size={i < 5 ? '2' : '1'}
            key={day.format('YYYY-MM-DD') + '/header'}
            onClick={() => handleSelect(day.format('YYYY-MM-DD') + '/header')}
          >
            <IonText>{day.format('dd')}</IonText>
          </IonCol>
        ))}
      </IonRow>
      {days.map(week => (
        <IonRow key={week[0].format('WWYYYY')} align-items-center justify-content-center>
          {week.map((day,i) => (
            <IonCol size={i < 5 ? '2' : '1'} key={day.format('YYYY-MM-DD')} onClick={() => handleSelect(day.format('YYYY-MM-DD'))}>
              <div className={sel(day) ? 'selected' : ''}>
                <IonText color={day.isBefore(start) ? 'gray' : ''}>{day.format('D')}</IonText>
              </div>
            </IonCol>
          ))}
        </IonRow>
      ))}
    </IonGrid>
  );
}
