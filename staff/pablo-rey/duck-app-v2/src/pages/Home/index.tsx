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
} from '@ionic/react';
import logic from '../../logic';
import { IonIcon, IonButton } from '@ionic/react';
import Menu from '../../components/Menu/';
import DuckList from '../../components/Ducks/DuckList';
import DuckDetail from '../../components/Ducks/DuckDetail';
import Cart from '../Cart';
import { withRouter } from 'react-router-dom';

const Home: React.FC<any> = ({ history, location }) => {
  const [items, setItems] = useState([]);
  const [favs, setFavs] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingFavs, setIsLoadingFavs] = useState(false);
  const [detailDuck, setDetailDuck] = useState(null);
  const [view, setView] = useState('all');
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    setIsLoadingSearch(true);
    setDetailDuck(null);

    Promise.all([logic.searchDucks(searchText), logic.retrieveFavDucks()]).then(
      ([ducks, favDucks]) => {
        if (ducks && ducks.length) {
          setItems(
            ducks.map((duck: any) => ({
              ...duck,
              isFavorite: favDucks.some((favDuck: any) => favDuck.id === duck.id),
            }))
          );
        } else setItems([]);
        setIsLoadingSearch(false);
      }
    );
  };

  const handleBuy = async duck => {
    await logic.addToCart(duck);
    setView('cart');
  };

  const handleDetail = duck => {
    return logic.retrieveDuck(duck.id).then(duckDetail =>
      logic.retrieveFavDucks().then(favDucks =>
        setDetailDuck({
          ...duckDetail,
          isFavorite: favDucks.some(favDuck => favDuck.id === duckDetail.id),
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
        setFavs(favDucks.map(fav => ({ ...fav, isFavorite: true })));
        if (detailDuck && detailDuck.id === toggleDuck.id)
          setDetailDuck({
            ...detailDuck,
            isFavorite: favDucks.some(favDuck => favDuck.id === detailDuck.id),
          });
      });
  };

  const updateSegment = (e: CustomEvent) => {
    const _view = e.detail.value;
    setView(_view);
    if (_view === 'favorites') {
      // setIsLoadingFavs(true);
      logic.retrieveFavDucks().then(ducks => {
        if (ducks) setFavs(ducks.map(duck => ({ ...duck, isFavorite: true })));
        else setFavs([]);
        // setIsLoadingFavs(false);
      });
    }
  };

  if (location.pathname.endsWith('cart') && view !== 'cart') {
    history.replace('/home');
    setView('cart');
  } else if (location.pathname.endsWith('favorites') && view !== 'favorites') {
    history.replace('/home');
    setView('favorites');
  }

  return (
    <>
      <IonLoading
        isOpen={isLoadingSearch || isLoadingFavs}
        onDidDismiss={() => {
          setIsLoadingFavs(false);
          setIsLoadingSearch(false);
        }}
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
              onBuy={handleBuy}
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
                All <IonIcon name="search" />
              </IonSegmentButton>
              <IonSegmentButton value="favorites" checked={view === 'favorites'}>
                Favorites <IonIcon name="heart" />
              </IonSegmentButton>
              <IonSegmentButton value="cart" checked={view === 'cart'}>
                Cart <IonIcon name="cart" />{' '}
                <IonBadge color="secondary" slot="end">
                  2
                </IonBadge>
              </IonSegmentButton>
            </IonSegment>
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
        </IonHeader>
        <IonContent>
          {view === 'cart' ? (
            <Cart />
          ) : (
            <DuckList
              items={view === 'all' ? items : favs}
              onDetail={handleDetail}
              onToggleFavorite={handleToggleFavorite}
              onBuy={handleBuy}
            />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default withRouter(Home);
