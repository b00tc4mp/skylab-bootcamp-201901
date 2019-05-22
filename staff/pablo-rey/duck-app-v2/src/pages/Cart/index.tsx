import React, { useState, useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import logic from '../../logic';
import CartList from '../../components/Cart/CartList';

const Cart: React.FC = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    logic.retrieveCart().then(cart => setCart(cart));
  }, []);

  const handleMore = duck => {
    const newCart = cart.slice();
    const line = newCart.find(line => (line.duck.id === duck.id));
    line.quantity++;
    setCart(newCart);
    logic.saveCart(newCart);
  };

  const handleMinus = duck => {
    const newCart = cart.slice();
    const index = newCart.findIndex(line => (line.duck.id === duck.id));
    const line = newCart[index];
    line.quantity--;
    if (!line.quantity) newCart.splice(index,1)
    setCart(newCart);
    logic.saveCart(newCart);
  };

  const handleRemove = duck => {
    const newCart = cart.filter(line => line.duck.id !== duck.id);
    setCart(newCart)
    logic.saveCart(newCart);
  };

  return (
    <IonPage id="cart">
      <IonContent>
        {cart.length ? (
          <CartList cart={cart} onMore={handleMore} onMinus={handleMinus} onRemove={handleRemove} />
        ) : (
          <p>No items to display</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Cart;
