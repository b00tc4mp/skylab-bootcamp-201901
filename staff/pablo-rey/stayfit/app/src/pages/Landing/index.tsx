import { IonContent, IonPage, IonImg, IonButton } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Landing() {
  return (
    <div className="back-image">
      <div className="logo">
        <img className="logo__img" src="/logo.png" />
        <img className="logo__text" src="/text-logo.png" />
        <div>
          <Link className="landing__button" to="/register">
            <IonButton expand="block">Register</IonButton>
          </Link>
          <Link to="/login">
            <IonButton expand="block">Login</IonButton>
          </Link>
        </div>{' '}
      </div>
    </div>
  );
}
