import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import { IonPage, IonContent } from '@ionic/react';

export default function Landing({ client }) {
  const [isLoaded, setLoaded] = useState(false);
  const [providerList, setProviderList] = useState([]);

  const fetchUsers = async () => {
    const query = gql`
      query {
        listProvidersPublicInfo {
          id
          name
          portraitImageUrl
        }
      }
    `;

    const { data } = await client.query({
      query,
      // headers: {
      //   Authorization: "Bearer " + token,
      // },
    });
    setLoaded(true);
    setProviderList([...data.listProvidersPublicInfo]);
    return data.listProvidersPublicInfo;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // useEffect(async () => {
  //   await fetchUsers()
  // }, []);

  return (
    <IonPage id="main">
      <IonContent>
        <h1>Landing</h1>

        <ul>
          {providerList.map(({ name, portraitImageUrl }) => (
            <li>
              <img src={portraitImageUrl} alt="portrait image" />
              <h3>{name}</h3>
            </li>
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
}
