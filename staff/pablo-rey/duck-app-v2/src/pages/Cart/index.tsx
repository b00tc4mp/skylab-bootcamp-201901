import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonButton,
  IonIcon,
  IonBadge,
  IonSearchbar,
} from '@ionic/react';
import logic from '../../logic';
import CartList from '../../components/Cart/CartList';

const Cart: React.FC = () => {
  const [cart, setCart] = useState([]);
  logic.retrieveCart().then(cart => setCart(cart));
  return (
    <IonPage id="cart">
      <IonContent>{cart.length ? <CartList cart={cart} /> : <p>No items to display</p>}</IonContent>
    </IonPage>
  );
};

export default Cart;
