import React, { useState, useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import logic from '../../logic';
import CartList from '../../components/Cart/CartList';

const Cart: React.FC = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    logic.retrieveCart().then(cart => setCart(cart));
  }, []);

  const handleMore = async duck => {
    const savedCart = await logic.addToCart(duck);
    setCart(savedCart);
  };

  const handleMinus = async duck => {
    const savedCart = await logic.subtractFromCart(duck);
    setCart(savedCart);
  };

  const handleRemove = async duck => {
    const savedCart = await logic.removeFromCart(duck);
    setCart(savedCart);
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
