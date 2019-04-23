function DuckDetail({ onBack, onBuy, duck }) {
  const { title, imageUrl, price, description } = duck;

  return (
    <section className="duck-detail">
      <h3 className="duck-detail__title">{title}</h3>
      <img className="duck-detail__image" src={imageUrl} />
      <span className="duck-detail__price">{price}</span>
      <p className="duck-detail__description">{description}</p>
      <a className="duck-detail__back" onClick={onBack}>
        Back
      </a>
      <button className="duck-detail__buy" onClick={onBuy}>
        Buy
      </button>
    </section>
  );
}
