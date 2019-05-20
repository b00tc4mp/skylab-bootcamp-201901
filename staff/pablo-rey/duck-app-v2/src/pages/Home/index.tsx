import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonLoading,
  IonBadge,
  IonModal,
  IonBackButton,
} from '@ionic/react';
import logic from '../../logic';
import { IonIcon, IonButton } from '@ionic/react';
import Menu from '../../components/Menu';
import DuckList from '../../components/DuckList';
import DuckDetail from '../../components/DuckDetail';

const Home: React.FC = () => {
  const [items, setItems] = useState([]);
  const [favs, setFavs] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingFavs, setIsLoadingFavs] = useState(false);
  const [detailDuck, setDetailDuck] = useState(null);
  const [view, setView] = useState('all');
  const [searchText, setSearchText] = useState('');

  const simulateLogin = () => {
    logic.loginUser('a@gmail.com', '123');
  };

  const handleSearch = () => {
    setIsLoadingSearch(true);
    setDetailDuck(null);

    Promise.all([logic.searchDucks(searchText), logic.retrieveFavDucks()]).then(
      ([ducks, favDucks]) => {
        if (ducks.length) {
          setItems(
            ducks.map((duck: any) => ({
              ...duck,
              isFavorite: favDucks.some((favDuck: any) => favDuck.id === duck.id),
            }))
          );
        } else setItems(ducks);
        setIsLoadingSearch(false);
      }
    );
  };

  const handleDetail = duck => {
    return logic
      .retrieveDuck(duck.id)
      .then(duckDetail =>
        logic
          .retrieveFavDucks()
          .then(favDucks =>
            setDetailDuck({
              ...duckDetail,
              isFavorite: favDucks.some(favDuck => (favDuck.id = duckDetail.id)),
            })
          )
      );
  };

  const handleToggleFavorite = toggleDuck => {
    return logic
      .toggleFavorite(toggleDuck)
      .then(() => logic.retrieveFavDucks())
      .then(favDucks => {
        const it = items.map(duck => ({
          ...duck,
          isFavorite: favDucks.some(favDuck => favDuck.id === duck.id),
        }));
        setItems(it);
      });
    // .then(() => detailDuck && detailDuck.id === toggleDuck.id && setDetailDuck({...detailDuck, isFavorite: !detailDuck.isFavorite}))
  };

  const updateSegment = (e: CustomEvent) => {
    const _view = e.detail.value;
    setView(_view);
    if (_view === 'favorites') {
      setIsLoadingFavs(true);
      logic.retrieveFavDucks().then(ducks => {
        setFavs(ducks.map(duck => ({ ...duck, isFavorite: true })));
        setIsLoadingFavs(false);
      });
    }
  };

  return (
    <>
      <IonLoading
        isOpen={isLoadingFavs || isLoadingSearch}
        onDidDismiss={() => {}}
        message={'Loading...'}
      />
      <IonModal isOpen={!!detailDuck} onDidDismiss={() => setDetailDuck(null)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setDetailDuck(null)}>Back</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {!!detailDuck && (
            <DuckDetail
              duck={detailDuck}
              onToggleFavorite={handleToggleFavorite}
              onBuy={() => {}}
            />
          )}
        </IonContent>
      </IonModal>
      <Menu />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>

            <IonSegment onIonChange={updateSegment}>
              <IonSegmentButton value="all" checked={view === 'all'}>
                All
              </IonSegmentButton>
              <IonSegmentButton value="favorites" checked={view === 'favorites'}>
                Favorites
              </IonSegmentButton>
            </IonSegment>

            <IonButtons slot="end">
              <IonButton onClick={() => {}}>
                <IonIcon name="cart" slot="icon-only" />
                <IonBadge color="secondary" slot="end">
                  2
                </IonBadge>
              </IonButton>
            </IonButtons>
          </IonToolbar>

          {view === 'all' && (
            <IonToolbar color="primary">
              <IonSearchbar
                placeholder="Search"
                onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
                value={searchText}
              />
              <IonButton slot="end" onClick={handleSearch}>
                <IonIcon name="search" slot="icon-only" />
              </IonButton>
            </IonToolbar>
          )}
        </IonHeader>{' '}
        <IonContent>
          {view === 'all' ? (
            <DuckList
              items={items}
              onDetail={handleDetail}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : (
            <DuckList
              items={favs}
              onDetail={handleDetail}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
