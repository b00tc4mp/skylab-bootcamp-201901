import React from 'react'
import CardDuck from '../CardDuck'

function DuckList({ items, onDetail, onToggleFavorite }) {
  if (items.length === 0) return <></>;
  return (
    <ul className="duck-list">
      {items.map(item => (
        <CardDuck onToggleFavorite={onToggleFavorite} key={item.id} item={item} onDetail={onDetail} />
      ))}
    </ul>
  );
}

export default DuckList