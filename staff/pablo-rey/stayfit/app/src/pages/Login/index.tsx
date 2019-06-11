import React, { useState, useContext, useEffect } from 'react';
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
  IonImg,
  IonContent,
} from '@ionic/react';
import { MainContext } from '../../logic/contexts/main-context';

function LogIn({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [provider, setProvider] = useState(null);

  const ctx = useContext(MainContext);

  const handleLogin = async e => {
    e.preventDefault();
    if (await ctx.login(email, password)) {
      history.push('/');
    }
  };

  const url = window.location.toString();
  useEffect(() => {
    (async () => {
      const providers = await ctx.logic.listProviders();
      const defaultProvider = providers.find(
        provider => !!provider.registrationUrl && url.includes(provider.registrationUrl)
      );
      setProvider(defaultProvider);
    })();
  }, [url]);

  return (
    <IonPage id="login">
      <IonContent>
        <form onSubmit={handleLogin}>
          <IonGrid>
            {provider && (
              <IonRow>
                <IonCol size="10" push="1">
                  <IonImg src={provider.bannerImageUrl} alt="logo" />
                </IonCol>
              </IonRow>
            )}
            <IonRow>
              <IonCol size="6" offset="3">
                <IonImg src="/logo-with-text.png" />
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
      </IonContent>
    </IonPage>
  );
}

export default withRouter(LogIn);
