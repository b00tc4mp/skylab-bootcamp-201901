import React, { useContext } from 'react';
import { CustomerBasic } from './CustomerBasic';
import {
  IonList,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonIcon,
} from '@ionic/react';
import { PENDING, ACCEPT, DENIEDBYPROVIDER } from '../../enums';
import { MainContext } from '../../logic/contexts/main-context';
import logic from '../../logic';

export default function ListCustomers({
  customersAndRequests: crs,
  showPending = true,
  showActive = true,
  showOthers = false,
}) {

  const ctx = useContext(MainContext)

  const handleResponse = async (customerAndRequest, status) => {
    const userId = customerAndRequest.customer.id
    const providerId = ctx.provider.id
    await ctx.logic.updateRequestCustomer(userId, providerId, status);
    if (status === ACCEPT) {
      await ctx.logic.addCustomer(userId,providerId)
    } 
    await ctx.refreshUserData({refreshCustomers: true})
  };

  const pending = crs.filter(cr => cr.request && cr.request.status === PENDING);
  const accepted = crs.filter(cr => cr.request && cr.request.status === ACCEPT);
  const others = crs.filter(cr => !cr.request || ![PENDING, ACCEPT].includes(cr.request.status));

  let itemsToShow = showPending ? pending.length : 0;
  itemsToShow += showActive ? accepted.length : 0;
  itemsToShow += showOthers ? others.length : 0;

  if (!itemsToShow) return null;

  const sortFn = (a, b) => (a.customer.name < b.customer.name ? -1 : 1);

  pending.sort(sortFn);
  accepted.sort(sortFn);
  others.sort(sortFn);

  return (
    <IonList>
      {showPending && (
        <>
          <IonItemDivider>
            <IonLabel>Pending</IonLabel>
          </IonItemDivider>
          {!!pending ? (
            pending.map(cr => (
              <IonItemSliding>
                <IonItemOptions side="start">
                  <IonItemOption color="warning" onClick={() => handleResponse(cr, DENIEDBYPROVIDER)}>
                    DENY
                  </IonItemOption>
                </IonItemOptions>
                <CustomerBasic key={cr.customer.id} customerRequest={cr} />

                <IonItemOptions side="end">
                  <IonItemOption onClick={() => handleResponse(cr, ACCEPT)}>
                    <IonIcon name="thumbs-up" />
                    <IonLabel>Accept</IonLabel>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))
          ) : (
            <IonItem>
              <IonLabel>No customers with pending requests</IonLabel>
            </IonItem>
          )}
        </>
      )}

      {showActive && (
        <>
          <IonItemDivider>
            <IonLabel>Accepted</IonLabel>
          </IonItemDivider>
          {accepted && accepted.map(cr => <CustomerBasic key={cr.customer.id} customerRequest={cr} />)}
        </>
      )}
      {showOthers && (
        <>
          <IonItemDivider>
            <IonLabel>Other</IonLabel>
          </IonItemDivider>
          {others && others.map(cr => <CustomerBasic key={cr.customer.id} customerRequest={cr} />)}
        </>
      )}
    </IonList>
  );
}
