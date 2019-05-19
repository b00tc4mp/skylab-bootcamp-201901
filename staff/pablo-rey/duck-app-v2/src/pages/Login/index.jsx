import React from 'react';
import Feedback from '../../components/Feedback';
import {
  IonButton,
  IonInput,
  IonText,
  IonItem,
  IonLabel,
  IonGrid,
  IonButtons,
  IonRow,
  IonCol,
} from '@ionic/react';

function LogIn({ errorMessage, onLogin }) {
  const handleLogin = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    onLogin(email, password);
  };

  return (
    <IonGrid>
      <form onSubmit={handleLogin}>
        <IonRow>
          <IonCol size="10" push="1">
            <IonText>
              <h2>Login</h2>
            </IonText>
          </IonCol>
        </IonRow>

        {!!errorMessage && (
          <IonRow>
            <Feedback cssClass="register" errorMessage={errorMessage} />
          </IonRow>
        )}
        <IonRow>
          <IonCol size="10" push="1">
            <IonItem>
              <IonLabel position="stacked">email</IonLabel>
              <IonInput type="text" name="email" placeholder="email" />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow margin-top>
          <IonCol size="10" push="1">
            <IonItem>
              <IonLabel position="floating">password</IonLabel>
              <IonInput type="password" name="password" placeholder="password" />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="10" push="1">
            <IonButton margin-top color="primary" fill="solid" expand="block">
              Login
            </IonButton>
          </IonCol>
        </IonRow>
      </form>
    </IonGrid>
  );
}

export default LogIn;
