import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  IonButton,
  IonInput,
  IonText,
  IonItem,
  IonLabel,
  IonGrid,
  IonToast,
  IonRow,
  IonCol,
} from '@ionic/react';

function Register({ history }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    // try {
    //   logic
    //     .registerUser(name, surname, email, password)
    //     .then(() => {
    //       return logic.loginUser(email, password);
    //     })
    //     .then(() => logic.isLogged && history.push('/'))
    //     .catch(err => setError(err.message));
    // } catch (err) {
    //   setError(err.message);
    // }
  };
  return (
    <IonGrid>
      <form onSubmit={handleLogin}>
        <IonRow>
          <IonCol size="10" push="1">
            <IonText>
              <h2>Register</h2>
            </IonText>
          </IonCol>
        </IonRow>
        <IonToast
          isOpen={!!error}
          onDidDismiss={() => setError('')}
          message={error}
          position="top"
          duration={3000}
          buttons={[
            {
              text: 'Close',
              role: 'cancel',
              handler: () => setError(''),
            },
          ]}
        />
        <IonRow>
          <IonCol size="10" push="1">
            <IonItem>
              <IonLabel position="stacked">name</IonLabel>
              <IonInput
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onIonChange={e => setName(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="10" push="1">
            <IonItem>
              <IonLabel position="stacked">surname</IonLabel>
              <IonInput
                type="text"
                name="surname"
                placeholder="surname"
                value={surname}
                onIonChange={e => setSurname(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="10" push="1">
            <IonItem>
              <IonLabel position="stacked">email</IonLabel>
              <IonInput
                type="text"
                name="email"
                placeholder="email"
                value={email}
                onIonChange={e => setEmail(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow margin-top>
          <IonCol size="10" push="1">
            <IonItem>
              <IonLabel position="floating">password</IonLabel>
              <IonInput
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onIonChange={e => setPassword(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="10" push="1">
            <IonButton margin-top color="primary" fill="solid" expand="block" onClick={handleLogin}>
              Register
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="10" push="1">
            <IonButton
              margin-top
              color="secondary"
              fill="solid"
              expand="block"
              onClick={() => history.push('/login')}
            >
              or login here
            </IonButton>
          </IonCol>
        </IonRow>
      </form>
    </IonGrid>
  );
}

export default withRouter(Register);
