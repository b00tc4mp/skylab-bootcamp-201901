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
} from '@ionic/react';
import logic from '../../logic';
import { IonIcon, IonButton } from '@ionic/react';
import Menu from '../../components/Menu';
import DuckList from '../../components/DuckList';

const Home: React.FC = () => {
  const [items, setItems] = useState([]);
  const [favs, setFavs] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingFavs, setIsLoadingFavs] = useState(false);
  const [detailDuck, setDetailDuck] = useState(null);

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

  // const handleDetail = duck => {
  //   return logic.retrieveDuck(duck.id)
  //   .then(duckDetail => setDetailDuck(duckDetail))
  // };

  const handleToggleFavorite = (toggleDuck) => {
    return logic.toggleFavorite(toggleDuck)
      .then(() => logic.retrieveFavDucks())
      .then(favDucks => {
        const it =items.map(duck => ({ ...duck,  isFavorite: favDucks.some(favDuck => favDuck.id === duck.id) }));
        setItems(it);
      })
      // .then(() => detailDuck && detailDuck.id === toggleDuck.id && setDetailDuck({...detailDuck, isFavorite: !detailDuck.isFavorite}))
  }

  const [view, setView] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [] = useState<Array<string>>(['Favorito1', 'Favorito B']);

  const updateSegment = (e: CustomEvent) => {
    const _view = e.detail.value;
    setView(_view);
    if (_view === 'favorites') {
      setIsLoadingFavs(true);
      logic.retrieveFavDucks().then(ducks => {
        setFavs(ducks.map(duck => ({ ...duck, isFavorite: true })));
        setIsLoadingFavs(false)
      })
    }
  };

  return (
    <>
      <IonLoading
        isOpen={isLoadingFavs || isLoadingSearch}
        onDidDismiss={() => {}}
        message={'Loading...'}
      />
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
        </IonHeader>
        <IonContent>
          {view === 'all' ? (
            <DuckList items={items} onDetail={() => {}} onToggleFavorite={handleToggleFavorite} />
          ) : (
            <DuckList items={favs} onDetail={() => {}} onToggleFavorite={handleToggleFavorite} />
          )}
          <IonButton onClick={simulateLogin} color="primary">
            Primary
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
