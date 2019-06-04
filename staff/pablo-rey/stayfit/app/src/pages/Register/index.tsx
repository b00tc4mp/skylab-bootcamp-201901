import React, { useState, useEffect } from 'react';
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
  IonImg,
} from '@ionic/react';
import logic from '../../logic';
import { async } from 'q';

function Register({ history }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [provider, setProvider] = useState(null)

  const handleLogin = e => {
    e.preventDefault();
    //TODO: REGISTER USER 

  };

  const url = window.location.toString();
  useEffect(() => {
    (async () => {
      const providers = await logic.listProviders();
      const defaultProvider = providers.find(provider => !!provider.registrationUrl && url.includes(provider.registrationUrl))
      setProvider(defaultProvider);
    })()
  }, [url])

  return (
    <IonGrid>
      <form onSubmit={handleLogin}>
        <IonRow>
          <IonCol size="10" push="1">
            <IonText>
              <h2>Register {provider && 'in ' + provider.name}</h2>
            </IonText>
            {
              provider && (
                <IonImg src={provider.bannerImageUrl} alt="logo"/>
              )
            }
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
              <IonLabel position="stacked">Name</IonLabel>
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
              <IonLabel position="stacked">Surname</IonLabel>
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
              <IonLabel position="stacked">Phone</IonLabel>
              <IonInput
                type="text"
                name="phone"
                placeholder="Phone"
                value={phone}
                onIonChange={e => setPhone(e.detail.value)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="10" push="1">
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
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
              <IonLabel position="floating">Password</IonLabel>
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
