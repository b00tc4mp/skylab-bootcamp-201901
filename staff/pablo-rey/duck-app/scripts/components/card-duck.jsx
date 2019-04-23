function CardDuck({ item, onDetail }) {
  function onSelect(e) {
    e.preventDefault();
    onDetail(item);
  }

  return (
    <li className="duck-item" onClick={onSelect}>
      <img src={item.imageUrl} className="duck-item__image" />
      <h3 className="duck-item__title">{item.title}</h3>
      <span className="duck-item__price">{item.price}</span>
    </li>
  );
}
