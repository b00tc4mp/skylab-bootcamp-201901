import React from 'react';
import { IonList } from '@ionic/react';
import { UserBasic } from './UserBasic';

export default function ListUsers({ users }) {
  if (!users) return null;
  return (
    <IonList>
      {users.map(user => (
        <UserBasic user={user} render/>
      ))}
    </IonList>
  );
}
