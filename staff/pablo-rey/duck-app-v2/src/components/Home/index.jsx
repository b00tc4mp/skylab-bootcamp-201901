import React, { useState } from 'react'
import logic from '../../logic'
import Search from '../Search'
import DuckDetail from '../DuckDetail'
import DuckList from '../DuckList'

function Home(props) {
  
  const [items, setItems] = useState([]);
  const [detailDuck, setDetailDuck] = useState(null);

  const handleSearch = searchText => {
    setDetailDuck(null);
    return Promise.all([logic.searchDucks(searchText), logic.retrieveFavDucks()])
      .then(([ducks, favDucks]) => {
        return setItems(ducks.map(duck => ({...duck, isFavorite: favDucks.some((favDuck) => favDuck.id === duck.id)})));
      });
    };

  const handleDetail = duck => {
    return logic.retrieveDuck(duck.id)
    .then(duckDetail => setDetailDuck(duckDetail))
  };
  
  const handleToggleFavorite = (toggleDuck) => {
    return logic.toggleFavorite(toggleDuck)
      .then(() => setItems(items.map(duck => ({ ...duck,  isFavorite: duck.id !== toggleDuck.id ? duck.isFavorite : !duck.isFavorite }))));
  }

  return (
    <div className="home">
      <h2>Hello, {props.name}!</h2>
      <Search
        cssClass="home__search"
        selectedLanguage={props.selectedLanguage}
        literals={props.literals}
        onSearch={handleSearch}
      />
      {!detailDuck ? (
        <DuckList 
          items={items} 
          onDetail={handleDetail} 
          onToggleFavorite={handleToggleFavorite}/>
      ) : (
        <DuckDetail
          duck={detailDuck}
          onToggleFavorite={handleToggleFavorite}
          onBack={() => setDetailDuck(null)}
          onBuy={() => {}}
        />
      )}
    </div>
  );
}

export default Home