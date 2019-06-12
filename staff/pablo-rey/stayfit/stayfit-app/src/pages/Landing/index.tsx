import { IonContent, IonPage, IonImg, IonButton } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Landing() {
  return (
    <IonPage>
      <IonContent>
        <div className="back-image">
          <div className="container">
            <img src="/logo-with-text.png" className="logo__img" />
            <div className="landing__buttons-container">
              <Link className="landing__button" to="/register">
                <IonButton size="large" expand="block">Register</IonButton>
              </Link>
              <Link className="landing__button" to="/login">
                <IonButton size="large" expand="block">Login</IonButton>
              </Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
