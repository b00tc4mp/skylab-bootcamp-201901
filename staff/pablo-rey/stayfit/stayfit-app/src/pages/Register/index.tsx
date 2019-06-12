import { IonButton, IonCol, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonRow } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import { MainContext } from '../../logic/contexts/main-context';

function Register({ history }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [provider, setProvider] = useState(null);

  const ctx = useContext(MainContext);

  const handleLogin = async e => {
    e.preventDefault();
    let id;
    if (provider) {
      id = await logic.registerUser({
        name,
        surname,
        email,
        password,
        phone,
        role: 'USER_ROLE',
        providerId: provider.id,
      });
    } else {
      id = await logic.registerUser({
        name,
        surname,
        email,
        password,
        phone,
        role: 'GUEST_ROLE',
      });
    }
    await ctx.login(email, password);
    history.push('/');
  };

  const url = window.location.toString();
  useEffect(() => {
    (async () => {
      const providers = await logic.listProviders();
      const defaultProvider = providers.find(
        provider => !!provider.registrationUrl && url.includes(provider.registrationUrl)
      );
      setProvider(defaultProvider);
    })();
  }, [url]);

  return (
    <IonGrid>
      <form onSubmit={handleLogin}>
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
            <IonButton margin-top color="secondary" fill="solid" expand="block" onClick={() => history.push('/login')}>
              or login here
            </IonButton>
          </IonCol>
        </IonRow>
      </form>
    </IonGrid>
  );
}

export default withRouter(Register);
