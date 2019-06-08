import React, { useState, useContext } from 'react';
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
  IonPage,
} from '@ionic/react';
import { MainContext } from '../../logic/contexts/main-context';

function LogIn({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ctx = useContext(MainContext);

  const handleLogin = async e => {
    e.preventDefault();
    if (await ctx.login(email, password)) {
      history.push('/');
    }
  };
  return (
    <IonPage id="login">
      <form onSubmit={handleLogin}>
        <IonGrid>
          <IonRow>
            <IonCol size="10" push="1">
              <IonText>
                <h2>Login</h2>
              </IonText>
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
                Login
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
                onClick={() => history.push('/register')}
              >
                or register here
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </IonPage>
  );
}

export default withRouter(LogIn);
