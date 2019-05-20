import React from 'react';
import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonIcon,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
} from '@ionic/react';

export default function CartList({ cart }) {
  return (
    <>
      {cart.map(({ duck, quantity }) => {
        return (
          <IonItemSliding key={duck.id}>
            <IonItem>
              <IonThumbnail slot="start">
                <img src={duck.imageUrl} />
              </IonThumbnail>
              <IonGrid>
                <IonRow>
                  <IonCol size="9">
                    <IonLabel>{duck.title}</IonLabel>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="2">
                          <IonButton fill="clear">
                            <IonIcon name="remove-circle-outline" />
                          </IonButton>
                        </IonCol>
                        <IonCol size="2" align-self-center><IonText>{`x${quantity}`}</IonText></IonCol>
                        <IonCol size="2">
                          <IonButton fill="clear">
                            <IonIcon name="add-circle-outline" />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCol>
                  <IonCol>
                    <IonText>{duck.price}</IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger">
                <IonIcon slot="start" name="trash" />
                Remove
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        );
      })}
    </>
  );
}
